import React from 'react';
import { Form, Input, Upload, Icon } from 'antd';
const FormItem = Form.Item;

class CreatePostForm extends React.Component {
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    //component level func

    beforeUpload = () => {
        return false;
    }
    // stop from auto uploading -> only after hitting "upload" button

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <Form layout="vertical">
                <FormItem
                    {...formItemLayout}
                    label="Message">
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: 'Please input a message.' }],
                    })(
                        <Input />
                    )}
                    {/*input gets field from message; rules checked if "required: true" is satisfied;*/}
                    {/*"message: xyz" goes when its not*/}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Image"
                >
                    <div className="dropbox">
                        {getFieldDecorator('image', {
                            rules: [{ required: true, message: 'Please select an image.' }],
                            // required == true <=> have red star on the screen
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload.Dragger name="files" beforeUpload={this.beforeUpload}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        )}
                    </div>
                </FormItem>

            </Form>
        );
    }
}

export const WrappedCreatePostForm = Form.create()(CreatePostForm);
/*Form.create() -> high order component to wrap CreatePostForm
(our component) in order to have auto check function*/