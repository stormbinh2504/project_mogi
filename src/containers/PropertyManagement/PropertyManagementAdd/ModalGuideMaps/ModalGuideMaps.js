import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalGuideMaps.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../../components/DraggableModal/DraggableModal';
import _ from 'lodash';

const { Column, ColumnGroup } = Table;

const ModalGuideMaps = (props) => {
    const { isOpen, onClose } = props

    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-guide-maps"}
            titleId={"Hướng dẫn"}
            toggle={onClose}
        >
            <div className="body">
                <div className="body-content-row">
                    <h1 className='item-center'>
                        Hướng dẫn thêm địa chỉ vào website
                    </h1>
                </div>
                <div className="body-content-row">
                    <iframe
                        // id="ytplayer"
                        // className={""}
                        // type="text/html"
                        title="YouTube video"
                        width="100%"
                        height="400"
                        src={'https://www.youtube.com/embed/1P-hMj-WQEc'}
                        frameBorder="0"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        </DraggableModal>
    )
}

export default ModalGuideMaps