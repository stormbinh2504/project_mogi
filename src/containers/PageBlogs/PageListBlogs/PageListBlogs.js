import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType, updateDataFilterNews } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';

import "./PageListBlogs.scss"
import PaginationComponent from '../../../components/PaginationComponent/PaginationComponent';

let pageSize = 5
let df_body_blogs = {
    "searchName": null,
    "page": 0,
    "size": pageSize
}

const PageListBlogs = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { filterBlogs } = app
    const [dataListBlogs, setDataListBlogs] = useState([])
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        onFilterBlogs(0)
    }, []);


    useEffect(() => {
        onFilterBlogs(0)
    }, [filterBlogs]);

    const onFilterBlogs = async (page) => {
        let body = {
            ...df_body_blogs,
            ...filterBlogs,
            page: page
        }
        console.log("binh_onFilterBroker", { filterBlogs, body })
        dispatch(alertType(true))
        await accountService.getAllBlogs(body)
            .then(res => {
                if (res) {
                    if (res.content && res.content.length > 0) {
                        setDataListBlogs(res.content)
                    } else {
                        setDataListBlogs([])
                    }
                    setTotalPages(res.totalElements)
                    window.scrollTo(0, 0);
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    const onRedirectDetail = (record) => {
        console.log("binh_onRedirectDetail", record)
        const { id } = record
        if (id) {
            let pathname = `blogs/${id}`
            // history.push(pathname)
            window.location.pathname = pathname
        }
    }


    const onChangePage = (page) => {
        onFilterBlogs(page)
    }

    console.log("PageListNews_render", { filterBlogs: filterBlogs, dataListBlogs: dataListBlogs })

    return (
        <div class="page-list-blogs" >
            <h1 class="page-title">Danh sách Blogs nổi bật</h1>
            <div className="list-blogs">
                {dataListBlogs && dataListBlogs.length > 0 && dataListBlogs.map((item, index) => {
                    return (
                        < div className="item-blogs" onClick={() => onRedirectDetail(item)}>
                            <div className="row">
                                <div className="col-4 h-100">
                                    <img src={item.url} />
                                </div>
                                <div className="col-8  h-100">
                                    <div className="block-content">
                                        <h2 className="title">
                                            {item.title}
                                        </h2>
                                        {/* <div className="content" dangerouslySetInnerHTML={{ __html: item.content }}></div> */}
                                        <div className="date">
                                            {CommonUtils.formatDateCeateApi(item.dateCreate)}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })}
                {dataListBlogs && dataListBlogs.length == 0 && <div className='not-result item-center'>Không có kết quả tìm kiếm phù hợp </div>}
            </div >

            {
                dataListBlogs && dataListBlogs.length > 0 && <div className="pagination-broker">
                    <PaginationComponent
                        dataPage={dataListBlogs}
                        totalPages={totalPages}
                        itemsPerPage={pageSize}
                        onChangePage={onChangePage}
                    />
                </div>
            }
        </div >
    )
}

export default PageListBlogs