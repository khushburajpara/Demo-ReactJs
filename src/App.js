import React, { Component } from 'react';
import 'antd/dist/antd.css';

import AddEditModal from './AddEditModal.js';
import { Table, Select, Button, Icon, Popconfirm, Row, Col } from 'antd';

import './App.css';
import data from './test';


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
        // render: (record) => (

        //   <span>
        //     {record.toUpperCase()}
        //   </span >

        // ),
      },

      {
        title: 'Blood Group',
        dataIndex: 'blood_group',
        key: 'blood_group',
      },
      {
        title: 'Action',
        render: (record) => (
          this.state.data.length >= 1
            ? (
              <span>
                <Popconfirm
                  title="Are You Sure to Delete"
                  onConfirm={() => this.handleDelete(record)}
                  //onCancel={e => this.cancelDelete(e,record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Icon
                    type="close-circle"
                    theme="outlined"
                    className="icon-component margin-right color_custom"
                  //onClick={() => this.handleDelete(record)}
                  />
                </Popconfirm>

                {/* <a href="javascript:;" onClick={() => this.handleDelete(record)}>Delete</a>&nbsp;&nbsp; */}
                {/* <a href="javascript:;" onClick={() => this.handleEdit(record)}>Edit</a> */}
                <Icon type="edit" theme="outlined" className="icon-component color_custom" onClick={() => this.handleEdit(record)} />
              </span>
            ) : null
        ),

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
    console.log("record", record);
    const dataSource = [...this.state.data];
    this.setState({
      data: dataSource.filter(item => item.id !== record.id)
    })

  }
  handleEdit = (record) => {
    console.log("Record Info", record);
    this.setState({
      details: record,
      showpopUp: true
    })
  }
  handleCancel = (e) => {
    this.setState({
      showpopUp: false
    })
  }
  handleOk = (e) => {

  }
  handleFormData = (values) => {
    const currentData = [...this.state.data];
    if (0 < Object.keys(this.state.details).length) {
      //debugger;
      this.state.data.splice(currentData.findIndex(item => item.id === values.id), 1, values);
      this.setState({
        data: [...this.state.data]
      })
    }
    else {
      this.setState({
        data: [values, ...currentData]
      })
      //this.state.data.unshift(values);
    }
    this.setState({
      showpopUp: false
    }, () => { console.log("data.state", this.state.data); })

  }
  render() {

    return (
      <div>
        <body>
          <AddEditModal
            visible={this.state.showpopUp}
            onOk={this.handleOk}
            details={this.state.details}
            data={this.state.data}
            onCancel={this.handleCancel}
            handleFormData={this.handleFormData}
          />
          <h1 className="header_text color_custom">Students Records</h1>
          <Row type="flex" justify="center">
            {/* <Col span={1}></Col> */}
            <Col span={22}>

              <Row>
                <Col span={24}>
                  <Button type="primary" className="btn-add" onClick={this.addRecord}>
                    Add
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table className="tableLayout" columns={this.columns} dataSource={this.state.data} />
                </Col>

              </Row>

              {/* <Col span={1}></Col> */}
            </Col>
          </Row>
        </body>
      </div>
    );
  }
}

export default App;
