import React, { Component } from 'react';
import 'antd/dist/antd.css';
import AddEditModal from './AddEditModal.js';
import { Table, Button, Icon, Popconfirm, Row, Col } from 'antd';
import notification from './Notification';
import './App.css';
import data from './Sample';
// notification.config({
//   duration: 2
// });
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      showpopUp: false,
      hasError: false,
      details: {},
    }
    this.columns = [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
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

  componentDidCatch(error, info) {
    console.log("Error in child", error, info)
  }

  addRecord = () => {
    this.setState({
      details: {},
      showpopUp: true
    })
  }
  handleDelete(record) {
    console.log("record", record);
    const dataSource = [...this.state.data];
    this.setState({
      data: dataSource.filter(item => item.id !== record.id)
    })
    notification('success', 'Record Deleted Successfully');
  }
  handleEdit(record) {
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

  handleFormData = (values) => {
    const currentData = [...this.state.data];
    // For Edit Records
    if (0 < Object.keys(this.state.details).length) {
      //debugger;
      this.state.data.splice(currentData.findIndex(item => item.id === values.id), 1, values);
      this.setState({
        data: [...this.state.data]
      })
      notification('success', 'Record Saved Successfully')
    }
    //For Add Records
    else {
      this.setState({
        data: [values, ...currentData]
      })
      notification('success', 'Record Added Successfully')

    }
    this.setState({
      showpopUp: false
    }, () => { console.log("data.state", this.state.data); })
  }

  render() {
    return (
      <div>
        <body>
          {/* Common Modal Popup for add & edit */}
          <AddEditModal
            visible={this.state.showpopUp}
            details={this.state.details}
            data={this.state.data}
            onCancel={this.handleCancel}
            handleFormData={this.handleFormData}
          />
          <h1 className="header_text color_custom">Students Records</h1>
          <Row type="flex" justify="center">

            <Col span={22}>

              <Row>
                <Button type="primary" className="btn-add" onClick={this.addRecord}>
                  Add
                </Button>
              </Row>
              <Row>
                <Col span={24}>
                  <Table className="tableLayout" columns={this.columns} rowKey={record => record.id} dataSource={this.state.data} />
                </Col>

              </Row>

            </Col>
          </Row>
        </body>
      </div>
    );
  }
}

export default App;
