import React, { Component } from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Table, Select, Form, Input, DatePicker, Button, Modal, Icon, Popconfirm, Row, Col } from 'antd';
import logo from './logo.svg';
import './App.css';

import data from './test';
const stdformate = "MM-DD-YYYY";
const Option = Select.Option;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      showpopUp: false,
      details: {},
    }
    this.columns = [
      {
        title: 'Action',
        render: (record) => (
          this.state.data.length >= 1
            ? (
              <span>
                <a href="javascript:;" onClick={() => this.handleDelete(record)}>Delete</a>&nbsp;&nbsp;
                <a href="javascript:;" onClick={() => this.handleEdit(record)}>Edit</a>
              </span>
            ) : null
        ),

      },
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        // render: (record) => (

        //   <span>
        //     {record.toUpperCase()}
        //   </span >

        // ),
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        // render: (record) => (

        //   <span>
        //     {record.toUpperCase()}
        //   </span >

        // ),
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',

      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        render: (record) => (

          <span>
            {record.toUpperCase()}
          </span >

        ),
      },
      {
        title: 'Date of Joining',
        dataIndex: 'dob',
        key: 'dob',
      },

    ]
  }
  addRecord = () => {
    this.setState({
      details: {},
      showpopUp: true
    })
  }
  handleDelete = (record) => {
    const dataSource = [...this.state.data];
    this.setState({
      data: dataSource.filter(item => item.firstName !== record.firstName)
    })

  }
  handleEdit = (record) => {
    console.log("handleEdit", record);
    this.setState({
      details: record,
      showpopUp: true
    })
  }
  handleCancel = () => {
    this.setState({
      showpopUp: false
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.dob = (values.dob).format(stdformate);

        if (0 < Object.keys(this.state.details).length) {
          //debugger;
          const currentData = [...this.state.data]
          this.state.data.splice(currentData.findIndex(item => item.firstName == values.firstName), 1, values)
        }
        else {
          this.state.data.unshift(values);
        }
        this.setState({
          //data: ary,
          showpopUp: false
        }, () => { console.log("data.state", this.state.data); })
      }
    });
  }
  render() {
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
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    return (
      <div>
        <body>
          {this.state.showpopUp ?
            <Modal
              title="Add"
              visible={this.state.showpopUp}
              //centered={true}
              onOk={() => this.handleOk()}
              onCancel={() => this.handleCancel()}
              width={"85%"}
              style={{ top: 20 }}
              footer={false}
              closable={true}
              //maskClosable={false}
              //footer={[]}
              destroyOnClose={true}
            >
              <Form onSubmit={this.handleSubmit}>
                <Form.Item
                  {...formItemLayout}
                  label="First Name"
                >
                  {getFieldDecorator('firstName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    initialValue: 0 < Object.keys(this.state.details).length ? this.state.details.firstName : ""
                  })(
                    <Input placeholder="First Name" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Last Name"
                >
                  {getFieldDecorator('lastName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    initialValue: 0 < Object.keys(this.state.details).length ? this.state.details.lastName : ""
                  })(
                    <Input placeholder="Last Name" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Age"
                >
                  {getFieldDecorator('age', {
                    rules: [{ required: true, message: 'Please input your age!' }],
                    initialValue: 0 < Object.keys(this.state.details).length ? this.state.details.age : ""
                  })(
                    <Input placeholder="Age" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Gender"
                >
                  {getFieldDecorator('gender', {
                    rules: [{ type: 'string', required: true, message: "Slect Gender", whitespace: true }],
                    initialValue: 0 < Object.keys(this.state.details).length ? this.state.details.gender : ""
                  })(
                    <Select size="large"
                      style={{ borderRadius: '3px', fontSize: "0.9rem" }}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      {/* {this.state.dropdownValue.map(function (d) {
                        console.log("d", d);
                        return <Option key={d.key} >{d.value}</Option>
                      })
                      }) */}
                    </Select>
                  )}
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Date of Joining"
                >
                  {getFieldDecorator('dob', {
                    rules: [{ type: 'object', required: true, message: "Slect Date", whitespace: true }],
                    initialValue: 0 < Object.keys(this.state.details).length ? moment(this.state.details.dob, stdformate) : ""
                  })(
                    <DatePicker format={stdformate} />
                  )}
                </Form.Item>
                <Row>
                  <Col span={12}>
                    <Form.Item {...tailFormItemLayout}>
                      <Button type="danger" onClick={() => this.handleCancel()}>Cancle</Button>

                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit"> Save</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Modal>
            : null
          }
          <Button type="primary" onClick={() => this.addRecord()}>Add</Button>
          <Table columns={this.columns} dataSource={this.state.data} />
        </body>
      </div>
    );
  }
}
const WrappedNormal = Form.create({
  name: 'register'
})(App);
export default WrappedNormal;
