import React, { useState, useEffect } from 'react'
import "./PageBreadcrumb.scss"
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

const PageBreadcrumb = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { location } = history
    const { pathname } = location

    const { nameDetail, prevPageTitle, prevPageTitle2 } = props

    return (
        <div className="page-breadcrumb">
            <div className="wrap-text">
                <span onClick={() => history.push("/home")}>
                    Mogi
                </span>
                <span>/</span>
                {prevPageTitle && <span onClick={() => history.push(prevPageTitle.pathName)}>
                    {prevPageTitle.name}
                </span>}
                {prevPageTitle2 &&
                    <>
                        <span>/</span>
                        <span onClick={() => history.push(prevPageTitle2.pathName)}>
                            {prevPageTitle2.name}
                        </span>
                    </>
                }
                {nameDetail &&
                    <>
                        <span>/</span>
                        <span>
                            {nameDetail}
                        </span>
                    </>
                }
            </div>
        </div >
    )
}

export default PageBreadcrumb