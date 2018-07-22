import { Modal, Button, message } from 'antd';
import React from 'react';
import { WrappedCreatePostForm } from './CreatePostForm';
import $ from 'jquery';
import {API_ROOT, POS_KEY, TOKEN_KEY, AUTH_PREFIX, LOC_SHAKE} from "../constants";

export class CreatePostButton extends React.Component {
    state = {
        //ModalText: 'Content of the modal',
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
            if (!err) {
                const formData = new FormData();
                const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
                formData.set('lat', lat + Math.random() * LOC_SHAKE * 2 - LOC_SHAKE);
                formData.set('lon', lon + Math.random() * LOC_SHAKE * 2 - LOC_SHAKE);
                //to have it between (-1,1); so that several markers'd show up + vary from the exact locs
                formData.set('message', values.message);
                formData.set('image', values.image[0].originFileObj);

                $.ajax({
                    url: `${API_ROOT}/post`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
                    },
                    processData: false,
                    contentType: false,
                    dataType: 'text',
                }).then((response) => {
                    message.success('Created successfully!');
                    this.form.resetFields(); // reset the pic uploaded last time
                    this.setState({ visible: false, confirmLoading: false });
                    this.props.loadNearbyPosts();
                }, (response) => {
                    message.error(response.responseText);
                    this.setState({ visible: false, confirmLoading: false }); // reset after each submit
                }).catch((error) => {
                    console.log(error);
                });
                //$.ajax returns a promise
            }
        });
        // send request when the buttons spinning
        // setTimeout(() => {
        //     this.setState({
        //         visible: false,
        //         confirmLoading: false,
        //     });
        // }, 2000); --> moved to successful request
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
        //const { visible, confirmLoading, Mo }
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