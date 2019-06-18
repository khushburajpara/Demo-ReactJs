import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Select, Form, Input, Button, Modal, Row, Col, Radio } from 'antd';
import './App.css';

const Option = Select.Option;
const RadioGroup = Radio.Group;

class AddEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Male"
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //For edit record pass id
                if (Object.keys(this.props.details).length > 0) {
                    values.id = this.props.details.id;
                }
                //For new record add id
                else {
                    values.id = this.props.data.length + 1;
                }
                console.log('Received values of form: ', values);
                this.props.handleFormData(values);
            }
        });
    }
    handleChange = (value, key) => {
        //console.log("Value,Key", value, key);
    }
    onChange = (e) => {
        //console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    render() {
        const dropDownValue = [
            { key: "A+", value: "A+" },
            { key: "B+", value: "B+" },
            { key: "A-", value: "A-" },
            { key: "B-", value: "B-" },
            { key: "AB+", value: "AB+" },
            { key: "AB-", value: "AB-" },
            { key: "O+", value: "O+" },
            { key: "O-", value: "O-" },
        ]
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
                <Modal
                    title={0 < Object.keys(this.props.details).length ? "Edit Record" : "Add Record"}
                    visible={this.props.visible}
                    //centered={true}
                    //onOk={this.props.onOk}
                    onCancel={this.props.onCancel}
                    width={"40%"}
                    style={{ top: 20 }}
                    footer={false}
                    closable={true}
                    destroyOnClose={true}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            label="First Name"
                        >
                            {getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please enter firstname!' }],
                                initialValue: 0 < Object.keys(this.props.details).length ? this.props.details.firstName : ""
                            })(
                                <Input placeholder="First Name" />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="Last Name"
                        >
                            {getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please enter lastname!' }],
                                initialValue: 0 < Object.keys(this.props.details).length ? this.props.details.lastName : ""
                            })(
                                <Input placeholder="Last Name" />
                            )}
                        </Form.Item>
                        {/* style={{ borderRadius: '3px', fontSize: "0.9rem", width: "98%" }} */}
                        <Form.Item
                            {...formItemLayout}
                            label="Age"
                        >
                            {getFieldDecorator('age', {
                                rules: [{ required: false, message: 'Please enter age!' }],
                                initialValue: 0 < Object.keys(this.props.details).length ? this.props.details.age : ""
                            })(
                                // <InputNumber size="large" style={{ borderRadius: '3px', fontSize: "0.9rem", width: "100%" }}/>
                                <Input placeholder="Age" />
                            )}
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Gender"
                        >
                            {getFieldDecorator('gender', {
                                // rules: [{ type: 'string', required: true, message: "Slect Gender", whitespace: true }],
                                initialValue: 0 < Object.keys(this.props.details).length ? this.props.details.gender : this.state.value
                            })(
                                <RadioGroup onChange={this.onChange}>
                                    <Radio value="Male">Male</Radio>
                                    <Radio value="Female">Female</Radio>
                                </RadioGroup>)}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="Blood Group"
                        >
                            {getFieldDecorator('blood_group', {
                                rules: [{ type: 'string', required: false }],
                                initialValue: 0 < Object.keys(this.props.details).length ? this.props.details.blood_group : "+B"
                            })(
                                <Select onChange={this.handleChange}>

                                    {dropDownValue.map(function (name, index) {
                                        return <Option key={name.key} value={name.value}>{name.value}</Option>;
                                    })}
                                </Select>)}
                        </Form.Item>

                        <Row>
                            <Col span={12}>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="danger" onClick={this.props.onCancel}>Cancle</Button>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">Save</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>

            </div>
        );
    }
}
const Wrapped = Form.create({
    name: 'register'
})(AddEditModal);
export default Wrapped;

