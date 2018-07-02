import { Modal, Button } from 'antd';
import React from 'react';
import { WrappedCreatePostForm } from './CreatePostForm';

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
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
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
                    <WrappedCreatePostForm/>
                </Modal>
            </div>
        );
    }
}