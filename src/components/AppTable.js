import React, { useState, useContext } from "react";
import { MyContext } from "./App";
import {
  Button,
  Select,
  Table,
  TimePicker,
  Popconfirm,
  Icon,
  Input
} from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import "./Style.css";
import { projectKeys, projectValues } from "./ProjectObj";
import { subKeys, subValues } from "./SubObj";
import { EditableCell, EditableFormRow } from "./EditableCell";

const AppTable = () => {
  const myContext = useContext(MyContext);

  //Set States
  const [count, setCount] = useState(myContext.myDataSource.length);

  // Columns
  const columns = [
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",

      //type selection, option:
      render: (projectId, record, rowIndex) => {
        const mySelect = projectId.split("*").map((value, index) => {
          return (
            <Select.Option key={index} id={index} value={value}>
              {value}
            </Select.Option>
          );
        });
        // console.log(dataSource[rowIndex]);
        return (
          <Select
            // onSelect={value => console.log(value, rowIndex)}
            style={{ width: 110 }}
            value={myContext.myDataSource[rowIndex].selectedProjectId} //if index=rowID that has changed state && create state at dataSource as a value of some dataIndex or sth
            onChange={value => {
              myContext.myDispatch({
                type: "selectionpjid",
                rowIndex: rowIndex,
                value
              });

              console.log(myContext.myDataSource[rowIndex]);
            }}
          >
            {mySelect}
          </Select>
        );
      }
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",

      render: (projectName, record, rowIndex) => {
        const mySelect = projectName.split("*").map((value, index) => {
          return (
            <Select.Option key={index} id={index} value={value}>
              {value}
            </Select.Option>
          );
        });
        return (
          <Select
            style={{ width: 200 }}
            value={myContext.myDataSource[rowIndex].selectedProjectName}
            onChange={value => {
              myContext.myDispatch({
                type: "selectionpjname",
                rowIndex: rowIndex,
                value
              });

              console.log(myContext.myDataSource[rowIndex]);
            }}
          >
            {mySelect}
          </Select>
        );
      }
    },
    {
      title: "Sub ID",
      dataIndex: "subId",
      key: "subId",

      render: (subId, record, rowIndex) => {
        const mySelect = subId.split("*").map((value, index) => {
          return (
            <Select.Option key={index} id={index} value={value}>
              {value}
            </Select.Option>
          );
        });
        return (
          <Select
            style={{ width: 110 }}
            value={myContext.myDataSource[rowIndex].selectedSubId}
            onChange={value => {
              myContext.myDispatch({
                type: "selectionsubid",
                rowIndex: rowIndex,
                value
              });

              console.log(myContext.myDataSource[rowIndex]);
            }}
          >
            {mySelect}
          </Select>
        );
      }
    },
    {
      title: "Sub Name",
      dataIndex: "subName",
      key: "subName",

      render: (subName, record, rowIndex) => {
        const mySelect = subName.split("*").map((value, index) => {
          return (
            <Select.Option key={index} id={index} value={value}>
              {value}
            </Select.Option>
          );
        });
        return (
          <Select
            style={{ width: 190 }}
            value={myContext.myDataSource[rowIndex].selectedSubName}
            onChange={value => {
              myContext.myDispatch({
                type: "selectionsubname",
                rowIndex: rowIndex,
                value
              });

              console.log(myContext.myDataSource[rowIndex]);
            }}
          >
            {mySelect}
          </Select>
        );
      }
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime, record, rowIndex) => (
        <TimePicker
          style={{ width: 110 }}
          defaultOpenValue={moment("00:00", "HH:mm")}
          format={"HH:mm"}
          value={myContext.myDataSource[rowIndex].startTime}
          onChange={value => {
            myContext.myDispatch({
              type: "starttime",
              rowIndex: rowIndex,
              value
            });
          }}
        />
      )
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime, record, rowIndex) => (
        <TimePicker
          style={{ width: 110 }}
          defaultOpenValue={moment("00:00", "HH:mm")}
          format={"HH:mm"}
          value={myContext.myDataSource[rowIndex].endTime}
          onChange={value => {
            myContext.myDispatch({
              type: "endtime",
              rowIndex: rowIndex,
              value
            });
          }}
        />
      )
    },
    {
      title: "Work Time",
      dataIndex: "workTime",
      key: "workTime",
      render: (text, record, rowIndex) => (
        <Input
          style={{ width: 60 }}
          disabled
          value={myContext.myDataSource[rowIndex].workTime}
        />
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      editable: true
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      editable: true
    },
    {
      title: "",
      dataIndex: "operation",
      render: (text, record, rowIndex) =>
        myContext.myDataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.key)}
          >
            <a href="/">
              <Icon type="delete" />
            </a>
          </Popconfirm>
        ) : null
    }
  ];

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell
    }
  };
  const newColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record, rowIndex) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex + rowIndex,
        title: col.title,
        key: col.key
      })
    };
  });

  const onAdd = () => {
    const newData = {
      key: count,
      projectId: projectKeys,
      selectedProjectId: "--Choose--",
      projectName: projectValues,
      selectedProjectName: "--Choose--",
      subId: subKeys,
      selectedSubId: "--Choose--",
      subName: subValues,
      selectedSubName: "--Choose--",
      startTime: null,
      endTime: null,
      workTime: "00:00",
      status: null,
      comment: null
    };

    myContext.myDispatch({ type: "addrow", newData });
    setCount(count + 1);
  };

  const onDelete = key => {
    myContext.myDispatch({ type: "deleterow", key });
  };

  return (
    <div>
      <Button onClick={onAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        style={{ overflowX: "auto" }}
        components={components}
        columns={newColumns}
        dataSource={myContext.myDataSource}
        rowKey={record => record.key}
        size="middle"
        bordered
        pagination={false}
      />
    </div>
  );
};

export default AppTable;
