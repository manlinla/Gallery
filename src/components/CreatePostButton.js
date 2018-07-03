import { Modal, Button } from 'antd';
import React from 'react';
import { WrappedCreatePostForm } from './CreatePostForm';
import $ from 'jquery';
import {API_ROOT, POS_KEY, TOKEN_KEY, AUTH_PREFIX} from "../constants";

export class CreatePostButton extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true,
            // visual indicator; happens after clicking the button, before uploading request
        });
        this.form.validateFields((err, values) => {
            const formData = new FormData();
            const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
            formData.set('message', values.message);
            formData.set('lat', lat);
            formData.set('lon', lon);
            formData.set('image', values.image[0].originFileObj);

            if (!err) {
                $.ajax({
                    url: `${API_ROOT}/post`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
                    }
                    processData: false,
                    contentType: false,
                    dataType: 'text',
                });
                //$.ajax returns a promise
            }
        });
        // send request when the buttons spinning
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    //confirmLoading: false -> reset after handling ok
    // control create new post window (modal) by setting "visible" state

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Create New Post</Button>
                {/*click Button -> do showModal*/}
                <Modal title="Create New Post"
                       visible={visible}
                       onOk={this.handleOk}
                       okText="Woo Create!"
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <WrappedCreatePostForm ref = {this.saveFormRef}/>
                    {/*use component instance*/}
                </Modal>
            </div>
        );
    }
}