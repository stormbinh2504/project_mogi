import React, { useEffect } from 'react'


const CompateFaceApi = () => {

    const addTest = async () => {

        // const script2 =   document.createElement("script");
        // script2.id = "face-api-test2"
        // script2.src = process.env.PUBLIC_URL + "/commons.js";
        // script2.async = true;
        // document.body.appendChild(script2);

        const script0 = document.createElement("script");
        script0.id = "face-api-test"
        script0.src = process.env.PUBLIC_URL + "/test-face.js";
        script0.async = true;
        document.body.appendChild(script0);

        // const script1 = document.createElement("script");
        // script1.id = "face-api-test1"
        // script1.src = process.env.PUBLIC_URL + "/bbt.js";
        // script1.async = true;
        // document.body.appendChild(script1);


    }

    useEffect(() => {
        const script = document.createElement("script");
        script.id = "face-api"
        script.src = process.env.PUBLIC_URL + "/face-api.js";
        script.async = true;
        document.body.appendChild(script);

        // const input1 = document.getElementById('myImg1');
        // const input2 = document.getElementById('myImg2');
        // const detection1 = faceapi.detectAllFaces(input1).withFaceLandmarks().withFaceDescriptors();
        // const detection2 = faceapi.detectAllFaces(input2).withFaceLandmarks().withFaceDescriptors();
        // const distance = faceapi.euclideanDistance(detection1, detection2);
        // console.log(distance);
        addTest()
    }, []);

    return (
        <div>
            {/* <img id="myImg1" src="https://static2.yan.vn/YanNews/2167221/201912/cam-dong-hinh-anh-me-trai-hoa-khap-nguoi-con-trai-sau-khi-hien-tang-0aa17a24.jpg" />
            <img id="myImg2" src="https://i.pinimg.com/474x/62/ee/a8/62eea8996641733c2a071b98da328364--seul-lips.jpg" /> */}

            <div id="navbar"></div>
            <div class="center-content page-container">
                <div>
                    <div class="progress" id="loader">
                        <div class="indeterminate"></div>
                    </div>
                    <div class="row side-by-side">
                        <div class="center-content">
                            <img id="face1" src="" class="margin" />
                            <div id="selectList1"></div>
                        </div>
                        <div class="center-content">
                            <img id="face2" src="" class="margin" />
                            <div id="selectList2"></div>
                        </div>
                    </div>
                    <div class="row">
                        <label for="distance">Distance:</label>
                        <input disabled value="-" id="distance" type="text" class="bold" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompateFaceApi