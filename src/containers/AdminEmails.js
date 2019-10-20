import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import _ from 'lodash';
import {
  Table,
  Button,
  Modal,
  Tag,
  message,
} from 'antd';
import AdminEdmailEdit from '../components/AdminEmailEdit';
import {
  pagination,
} from '../configs/constants';

import {
  getAllRequests,
  deleteRequest,
} from '../services/EmailServices';

const { confirm } = Modal;


const AdminEmails = (props) => {
  const {
    t,
  } = props;

  const showDeleteConfirm = (record) => {
    confirm({
      title: t('delete_email'),
      okText: t('confirm'),
      okType: 'danger',
      cancelText: t('no'),
      onOk() {
        deleteRequest(_.get(record, '_id'))
          .then((res) => {
            message.success(`Delete request ${_.get(record, 'topic')} success`)
          })
          .catch(() => {
            message.error(`Couldn't delete request. Please try again.`)
          })
      },
      onCancel() {},
    });
  };

  // email detail
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailRecord, setDetailRecord] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);

  const emailColumns = [
    {
      title: '#',
      dataIndex: '#',
      key: '#',
      width: 50,
    },
    {
      title: 'topic',
      dataIndex: 'topic',
      key: 'topic',
      width: 150,
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      width: 75,
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 75,
    },
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
      width: 250,
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      render: (text, record) => (
        (!text) ? (
          <Tag color="#108ee9">Pending</Tag>
        ) : (
          <Tag color="#87d068">Handled</Tag>
        )
      )
    },
    {
      key: 'actions',
      width: 100,
      render: record => (
        <span>
          <Button
            type="link"
            onClick={() => {
              setDetailVisible(true);
              setDetailRecord(record);
            }
            }
          >
            {t('edit')}
          </Button>
          <Button
            type="link"
            onClick={() => showDeleteConfirm(record)}
          >
            {t('delete')}
          </Button>
        </span>
      ),
    },
  ];

  const [tableData, setTableData] = useState([]);

  // Table loading state
  const [isTableLoading, setTableLoading] = useState(false);
  // paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getEmailList = (params) => {
    const data = {
      offset: 0,
      limit: pagination.limit,
      order: 'desc',
      sort: 'createdAt',
      ...params,
    };
    setTableLoading(true);
    getAllRequests(data)
      .then((res) => {
        setTableData(_.get(res, 'data.data', []));
        setTableLoading(false);
        setTotalPage(0);
      })
      .catch(() => {
        setTableLoading(false);
      });
  };

  useEffect(() => {
    // get table Data
    getEmailList();

    return Modal.destroyAll();
  }, []);

  // Add translation and stt
  const translatedTableColumn = columns => columns.map((column) => {
    column = { ...column, title: t(column.title) };
    return column;
  });

  const onPageChange = (page) => {
    const offset = (page - 1) * pagination.limit;
    setDetailRecord({});
    setCurrentPage(page);
    getEmailList({ offset });
  };

  const preHandleShowData = (data = []) => data.map((dta, index) => (
    { '#': `${Number((currentPage - 1) * pagination.limit) + Number(index) + 1}`, ...dta }
  ));

  const completeHandler = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setDetailVisible(false);
    }, 1000);
  };

  return (
    <React.Fragment>
      <Table
        dataSource={preHandleShowData(tableData)}
        columns={translatedTableColumn(emailColumns)}
        loading={isTableLoading}
        pagination={{
          current: currentPage,
          pageSize: pagination.limit,
          total: totalPage * pagination.limit,
          onChange: onPageChange,
          style: { margin: '16px' },
        }}
      />
      <AdminEdmailEdit
        record={detailRecord}
        reloadTable={() => onPageChange(1)}
        isFormVisible={detailVisible}
        setFormVisible={setDetailVisible}
      />
    </React.Fragment>
  );
};

AdminEmails.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(AdminEmails);
