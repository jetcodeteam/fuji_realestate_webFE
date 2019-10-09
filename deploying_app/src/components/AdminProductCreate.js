import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import {
  Modal,
  Form,
  Input,
  Upload,
  Icon,
  Row,
  Col,
} from 'antd';
import { getAccessToken } from '../services/TokenServices';

const ProductCreateForm = (props) => {
  const {
    isFormVisible,
    setFormVisible,
    reloadTable,
    t,
    form,
  } = props;

  const { getFieldDecorator } = form;

  const [isFormLoading, setFormLoading] = useState(false);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const columnSpan = 24;

  const handleSubmit = () => {
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormVisible(false);
      reloadTable();
    }, 1000);
  };

  const handleCancel = () => {
    setFormVisible(false);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Modal
        title="Create Product"
        visible={isFormVisible}
        onOk={handleSubmit}
        confirmLoading={isFormLoading}
        onCancel={handleCancel}
      >
        <Row>
          <Form {...formItemLayout}>
            <Col span={columnSpan}>
              <Form.Item label={t('Name')}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Name is required!' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('Image')}>
                {getFieldDecorator('image', {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                })(
                  <Upload.Dragger
                    headers={{
                      Authorization: `Bearer ${getAccessToken()}`,
                    }}
                    name="upload"
                    multiple
                    action="https://api-fujiwara-v2.herokuapp.com/uploads"
                  >
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>,
                )}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('Square')}>
                {getFieldDecorator('square ', {
                  rules: [{ required: true, message: 'Square is required!' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('Floor')}>
                {getFieldDecorator('floor', {
                  rules: [{ required: true, message: 'Floor is required!' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('Street')}>
                {getFieldDecorator('street', {
                  rules: [{ required: true, message: 'Street is required!' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('City')}>
                {getFieldDecorator('city', {
                  rules: [{ required: true, message: 'City is required!' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('District')}>
                {getFieldDecorator('district', {
                  rules: [{ required: true, message: 'District is required!' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('Ward')}>
                {getFieldDecorator('ward', {
                  rules: [{ required: true, message: 'Ward is required!' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('Status')}>
                {getFieldDecorator('status', {
                  rules: [{ required: true, message: 'Staus is required!' }],
                })(<Input disabled />)}
              </Form.Item>
            </Col>
          </Form>
        </Row>
      </Modal>
    </div>
  );
};

ProductCreateForm.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  isFormVisible: PropTypes.bool.isRequired,
  setFormVisible: PropTypes.func.isRequired,
  reloadTable: PropTypes.func.isRequired,
  form: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

const WrappedDemo = Form.create({ name: 'validate_other' })(ProductCreateForm);

export default withI18n()(WrappedDemo);
