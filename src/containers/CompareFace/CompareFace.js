import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Link, useHistory } from 'react-router-dom'

import { compressImage } from "../../utils/imageUpload"
import { sdkVNPTService, authService } from '../../services';
import { ToastSuccess, ToastError } from '../../utils/ToastUtil'
import { loginAuthentication, alertType } from '../../redux/actions/authAction'


import "./CompareFace.scss"
import ModalLogin from '../Modal/ModalLogin';
const STATUS_FACE = {
  MATCH: "MATCH",
  NOMATCH: "NOMATCH"
}

const CompareFace = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { auth } = useSelector((state) => state);
  console.log("binh---auth1", auth)

  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false)
  const addLibToDom = () => {
    let pathname = window.location.pathname
    pathname = pathname.split('/')
    const script1 = document.createElement("script");
    script1.id = "sdk-ekyc"
    // script1.src = pathname && pathname.length >= 3 ? `/${pathname[1]}/sdk.js` : "/sdk.js";
    script1.src = process.env.PUBLIC_URL + "/sdk.js";
    script1.async = true;
    document.body.appendChild(script1);
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "libForSdk"
    script.src = process.env.PUBLIC_URL + "/libForSdk.js";
    script.async = true;
    document.body.appendChild(script);


    let pathname = window.location.pathname
    pathname = pathname.split('/')
    const script1 = document.createElement("script");
    script1.id = "sdk-ekyc"
    // script1.src = pathname && pathname.length >= 3 ? `/${pathname[1]}/sdk.js` : "/sdk.js";
    script1.src = process.env.PUBLIC_URL + "/sdk.js";
    script1.async = true;
    document.body.appendChild(script1);


    //config hardcode load thư viện
    dispatch(alertType(true))
    setTimeout(() => { dispatch(alertType(false)) }, 2000)

  }, []);

  const removeLibFromDom = () => {
    let sdk = document.getElementById("sdk-ekyc");
    let ekyc_sdk_intergrated = document.getElementById("ekyc_sdk_intergrated")
    ekyc_sdk_intergrated.classList.remove('hidden')

    let image = document.getElementById("image_result_ekyc")
    image.src = ''

    if (sdk) {
      document.body.removeChild(sdk)
    }
  }

  const handleReset = async () => {
    let load_ekyc = document.getElementById("load-ekyc")
    if (load_ekyc) {
      load_ekyc.classList.remove('hidden')
    }
    this.removeLibFromDom();
    this.addLibToDom();
  }



  const uploadImage2Server = async (body) => {
    let hashCode = ""
    await sdkVNPTService.addFileServerEkyc(body)
      .then((responses) => {
        responses = responses.data
        hashCode = responses.object && responses.object.hash
      })
      .catch((error) => {
        hashCode = ''
      });
    return hashCode
  }


  const handleCompare2Faces = async (data) => {
    const body = {
      // image_hash_front: "idg20220508-d0d3238d-6720-3187-e053-62199f0ac777/IDG01_a2900e27-cea8-11ec-bad5-99fd408e3de2",
      image_hash_front: auth.userInfor.user.hashAvatar,
      image_hash_face: data,
    }

    dispatch(alertType(true))
    await sdkVNPTService.compare2Faces(body)
      .then((res) => {
        res = res.data
        if (res && res.statusCode === 200) {
          if (res.object.msg === STATUS_FACE.MATCH) {
            dispatch(alertType(false))
            ToastSuccess(res.object.result)
            dispatch(loginAuthentication(true))
            setTimeout(() => { history.push("/dashboard") }, 2000)
            localStorage.setItem("firstLogin", true)
          }
          else {
            dispatch(alertType(false))
            ToastError(res.object.result)
          }
        }
      })
      .catch(error => {
        dispatch(alertType(false))
        alert("catch" + error)
      })
  }

  const handleSubmit = async () => {
    let imageBase64
    let fileImage
    let fileName = `dsc_face_${Math.random() * 100000000}` // session client
    const image = document.getElementById("image_result_ekyc")
    imageBase64 = await image.src && image.src.indexOf('data:image') !== -1 ? image.src : ''
    if (image && imageBase64) {
      await fetch(imageBase64)
        .then(res => res.blob())
        .then(blob => {
          fileImage = new File([blob], fileName, { type: "image/png" })
        }).catch(error => {
          alert('error while convert', error)
          return
        })
      if (fileImage && fileImage.size !== 0) {
        let imageOptimize

        try {
          imageOptimize = await compressImage(fileImage)
        } catch (error) {
          imageOptimize = null
          return
        }
        const body = {
          file: imageOptimize,
          title: 'Upload image face',
          description: 'Test upload image face'
        }

        let hashCode = await uploadImage2Server(body)
        if (hashCode) {
          await handleCompare2Faces(hashCode)
        } else {
          alert('error when while upload')
        }
      }
    } else {
      ToastError("Không thấy token yêu cầu đăng nhập lại")
    }
  }

  const handleRedirect = () => {
    history.push("/")
  }

  const onCloseModalLogin = () => {
    setIsOpenModalLogin(false)
  }

  return (
    <div className='compare-face'>
      <div className='block-compare-face container'>
        <div id="ekyc_sdk_intergrated"></div>
        <div id="face_image_ekyc">
          <img id='image_result_ekyc' src="" alt="" />
        </div>
        <div id="error-ekyc" className="hidden">
          <p id="content-error-ekyc"></p>
          {/* <button className="btn-reload" onClick={handleReset}>reset</button> */}
          <button style={{ marginRight: "10px" }} className="btn btn-primary" onClick={handleRedirect}>Quay về đăng nhập</button>
          <button className="btn btn-warning" onClick={handleSubmit}>Xác thực</button>
        </div>
      </div>
      <ModalLogin isOpenModalLogin={isOpenModalLogin} onCloseModalLogin={onCloseModalLogin}></ModalLogin>
    </div>
  )
}

export default CompareFace