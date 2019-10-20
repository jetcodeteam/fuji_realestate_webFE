import React, {useState} from 'react';
import { withI18n } from 'react-i18next';
import _ from 'lodash';
import {
  Descriptions,
  Badge,
  Modal,
  message,
} from 'antd';

import { updateRequest } from '../services/EmailServices';

const AdminEmailEdit = (props) => {
  const {
    t,
    record,
    reloadTable,
    isFormVisible,
    setFormVisible,
  } = props;

  const [isFormLoading, setFormLoading] = useState(false);

  const formHandled = () => {
    setFormLoading(true);
    updateRequest(_.get(record, '_id'), {
      status: 1,
    })
      .then((res) => {
        setFormLoading(false);
        reloadTable(true);
        handleCancle();
      })
      .catch(() => {
        message.error(`Something went wrong. Please try again.`)
      })
  }

  const handleCancle = () => {
    setFormVisible(false);
  }

  return (
    <React.Fragment>
      <Modal
        title={t('email_detail')}
        visible={isFormVisible}
        onOk={() => formHandled(record)}
        okText={t('email_complete')}
        cancelText={t('back')}
        confirmLoading={isFormLoading}
        onCancel={handleCancle}
        destroyOnClose
        closable
        width="800px"
      >
        <Descriptions bordered>
          <Descriptions.Item label={t('topic')} span={3}>{_.get(record, 'topic')}</Descriptions.Item>
          <Descriptions.Item label={t('email')} span={2}>{_.get(record, 'email')}</Descriptions.Item>
          <Descriptions.Item label={t('phone')} span={1}>{_.get(record, 'phone')}</Descriptions.Item>
          <Descriptions.Item label={t('status')} span={3}>
            {
              _.get(record, 'status') ? (
                <Badge status="success" text={t('handled')} />
              ) : (
                <Badge status="processing" text={t('pending')} />
              )
            }
          </Descriptions.Item>
          <Descriptions.Item label={t('content')} span={3}>{_.get(record, 'content')}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </React.Fragment>
  );
};


export default withI18n()(AdminEmailEdit);