import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import _ from 'lodash';
import {
  Table,
  Button,
  Modal,
  Tag,
  message
} from 'antd';
import AdornedButton from '../components/AdornedButton';
import ProductCreateForm from '../components/AdminProductCreate';
import {
  pagination,
} from '../configs/constants';

import {
  getProducts,
  deleteProduct,
} from '../services/ProductServices';

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
        deleteProduct(record._id)
          .then((res) => {
            onPageChange(1);
            message.success(`Delete ${record.name} successful`);
          })
          .catch((res) => {
            message.error(`Could not delete ${record.name}. Please try again later`);
          })
      },
      onCancel() {},
    });
  };

  // email detail
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailRecord, setDetailRecord] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);

  // create form states
  const [isFormVisible, setFormVisible] = useState(false);


  const emailColumns = [
    {
      title: '#',
      dataIndex: '#',
      key: '#',
      width: 50,
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'square',
      dataIndex: 'square',
      key: 'square',
      width: 100,
    },
    {
      title: 'floor',
      dataIndex: 'floor',
      key: 'floor',
      width: 100,
    },
    {
      title: 'street',
      dataIndex: 'street',
      key: 'street',
      width: 200,
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      render: (text, record) => (
        (!text) ? (
          <Tag color="#87d068">Pending</Tag>
        ) : (
          <Tag color="#108ee9">Sold</Tag>
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

  const getProductList = (params) => {
    const data = {
      offset: 0,
      limit: pagination.limit,
      order: 'desc',
      sort: 'createdAt',
      ...params,
    };
    setTableLoading(true);
    getProducts(data.offset, data.limit, data.sort, data.order)
      .then((res) => {
        setTableData(_.get(res, 'data.data'));
        setTableLoading(false);
        setTotalPage(parseInt(_.get(res, "headers['content-range']", "0/0").split("/")[1]) / data.limit);
      })
      .catch(() => {
        setTableLoading(false);
      });
  };

  useEffect(() => {
    // get table Data
    getProductList();

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
    getProductList({ offset });
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
      <AdornedButton
        style={{
          color: '#fff',
          textTransform: 'none',
          width: '160px',
          marginTop: '-80px',
        }}
        variant="contained"
        color="primary"
        id="submit-login"
        onClick={() => setFormVisible(true)}
      >
        {t('add_product')}
      </AdornedButton>
      <Table
        rowKey="_id"
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
      <ProductCreateForm
        isFormVisible={detailVisible || isFormVisible}
        setFormVisible={isFormVisible ? setFormVisible : setDetailVisible}
        reloadTable={() => onPageChange(1)}
        formData={detailVisible ? detailRecord : null}
      />
    </React.Fragment>
  );
};

AdminEmails.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(AdminEmails);
