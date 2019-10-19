import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import {
  Table,
  Button,
  Modal,
} from 'antd';
import {
  pagination,
} from '../configs/constants';

import {
  getAllRequests,
} from '../services/EmailServices';

const { confirm } = Modal;


const AdminEmails = (props) => {
  const {
    t,
  } = props;

  const showDeleteConfirm = () => {
    confirm({
      title: t('delete_email'),
      okText: t('confirm'),
      okType: 'danger',
      cancelText: t('no'),
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
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
      width: 100,
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
      width: 200,
    },
    {
      title: 'product_col',
      dataIndex: 'product',
      key: 'product',
      width: 100,
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: 50,
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
            onClick={() => showDeleteConfirm()}
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
        console.log(res);
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
    setTableData([{
      id: '5d5fa766f54a623d45807adb',
      topic: 'Mock test',
      email: 'jetcode@gmail.com',
      phone: '0212331231',
      content: 'Want to buy a house in Binh Thanh District',
      status: 'Pending',
    }]);

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
      <Modal
        title={t('email_detail')}
        visible={detailVisible}
        onOk={() => completeHandler(detailRecord)}
        okText={t('email_complete')}
        cancelText={t('cancel')}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setDetailVisible(false);
          setDetailRecord({});
        }
        }
        destroyOnClose
        closable
      >
        <p>TODO</p>
      </Modal>
    </React.Fragment>
  );
};

AdminEmails.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(AdminEmails);
