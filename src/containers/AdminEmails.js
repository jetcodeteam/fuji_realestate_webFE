import React, { useEffect, useState } from 'react';
import {
  Table,
} from 'antd';


const AdminEmails = () => {
  const columns = [
    {
      title: 'topic',
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // get table Data
    setTableData([]);
  }, []);

  return (
    <React.Fragment>
      <Table dataSource={tableData} columns={columns} />
    </React.Fragment>
  );
};

export default AdminEmails;
