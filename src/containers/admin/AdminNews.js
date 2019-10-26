import React, {
  useState,
  useEffect,
} from 'react';
import _ from 'lodash';
import { withI18n } from 'react-i18next';

import {
  pagination,
} from '../../configs/constants';

import {
  message,
  Table,
  Button,
  Modal,
} from 'antd';
import AdornedButton from '../../components/utils/AdornedButton';

import {
  getNews, deleteNews,
} from '../../services/NewsServices';

const { confirm } = Modal;

const AdminNews = (props) => {
  const {
    t,
    history,
  } = props

  const [isTableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  // paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const submitNew = (news) => {
    if (news) {
      history.push(`/admin/news/${news}`);
    } else {
      history.push('/admin/news/create');
    }
  }

  const showDeleteConfirm = (record) => {
    confirm({
      title: t('delete_news'),
      okText: t('confirm'),
      okType: 'danger',
      cancelText: t('no'),
      onOk() {
        deleteNews(record._id)
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

  const newsColumns = [
    {
      title: '#',
      dataIndex: '#',
      key: '#',
      width: 50,
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      width: 700,
    },
    {
      key: 'actions',
      width: 100,
      render: record => (
        <span>
          <Button
            type="link"
            onClick={() => {
              submitNew(_.get(record, '_id'));
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

  const getNewsList = (params) => {
    const data = {
      offset: 0,
      limit: pagination.limit,
      order: 'desc',
      sort: 'createdAt',
      ...params,
    };
    setTableLoading(true);
    getNews(data)
      .then((res) => {
        setTableData(_.get(res, 'data.data'));
        setTableLoading(false);
        setTotalPage(parseInt(_.get(res, "headers['content-range']", "0/0").split("/")[1]) / data.limit);
      })
      .catch(() => {
        setTableLoading(false);
      });
  };

  // Add translation and stt
  const translatedTableColumn = columns => columns.map((column) => {
    column = { ...column, title: t(column.title) };
    return column;
  });

  const preHandleShowData = (data = []) => data.map((dta, index) => (
    { '#': `${Number((currentPage - 1) * pagination.limit) + Number(index) + 1}`, ...dta }
  ));

  const onPageChange = (page) => {
    const offset = (page - 1) * pagination.limit;
    setCurrentPage(page);
    getNewsList({ offset });
  };

  useEffect(() => {
    // get table Data
    getNewsList();
  }, []);

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
        onClick={() => submitNew()}
      >
        {t('create_news')}
      </AdornedButton>
      <Table
        rowKey="_id"
        dataSource={preHandleShowData(tableData)}
        columns={translatedTableColumn(newsColumns)}
        loading={isTableLoading}
        pagination={{
          current: currentPage,
          pageSize: pagination.limit,
          total: totalPage * pagination.limit,
          onChange: onPageChange,
          style: { margin: '16px' },
        }}
      />
    </React.Fragment>
  );
};

export default withI18n()(AdminNews);