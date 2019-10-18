import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import _ from 'lodash';
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
import { Select } from 'antd';
import {
  getDistricts,
  getWards,
} from '../services/LocationServices';

const { Option } = Select;

const ProductCreateForm = (props) => {
  const {
    isFormVisible,
    setFormVisible,
    reloadTable,
    t,
    form,
    formData,
  } = props;
  console.log(formData);

  const statuses = [
    {
      id: 0,
      name: t('Pending'),
    },
    {
      id: 1,
      name: t('Sold'),
    }
  ]

  const { getFieldDecorator } = form;

  const [isFormLoading, setFormLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isWardsDisable, setWardsDisable] = useState(true)

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
    if (Array.isArray(e)) {
      return e;
    }
    console.log(e.fileList);
    return e && e.fileList.slice(-4);
  };

  const handleWards = (district_id) => {
    setWardsDisable(true);
    getWards(district_id)
      .then((res) => {
        setWardsDisable(false);
        setWards(_.get(res, 'data.data.wardList', []));
      })
  }

  useEffect(() => {
    getDistricts()
      .then((res) => {
        setDistricts(_.get(res, 'data.data', []));
      })
  }, [])

  return (
    <div>
      <Modal
        title={t('create_product')}
        visible={isFormVisible}
        onOk={handleSubmit}
        confirmLoading={isFormLoading}
        onCancel={handleCancel}
        destroyOnClose
        closable
        // centered
        width="800px"
      >
        <Row>
          <Form {...formItemLayout}>
            <Col span={columnSpan}>
              <Form.Item label={t('Name')}>
                {getFieldDecorator('name', {
                  initialValue: _.get(formData, 'name', ''),
                  rules: [{ required: true, message: 'Name is required!' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('Image')}>
                {getFieldDecorator('image', {
                  // initialValue: _.get(formData, 'images', []),
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
                  initialValue: _.get(formData, 'square', ''),
                  rules: [{ required: true, message: 'Square is required!' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('Floor')}>
                {getFieldDecorator('floor', {
                  initialValue: _.get(formData, 'floor', ''),
                  rules: [{ required: true, message: 'Floor is required!' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('Street')}>
                {getFieldDecorator('street', {
                  initialValue: _.get(formData, 'street', ''),
                  rules: [{ required: true, message: 'Street is required!' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('City')}>
                {getFieldDecorator('city', {
                  initialValue: 'Ho Chi Minh',
                  rules: [{ required: true, message: 'City is required!' }],
                })(<Input disabled /> )}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('District')}>
                {getFieldDecorator('district', {
                  rules: [{ required: true, message: 'District is required!' }],
                })(
                  <Select onChange={handleWards}>
                    {
                      districts.map((district) => (
                        <Option key={_.get(district, '_id')} value={_.get(district, '_id')}>{_.get(district, 'name_with_type')}</Option>
                      ))
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('Ward')}>
                {getFieldDecorator('ward', {
                  rules: [{ required: true, message: 'Ward is required!' }],
                })(
                  <Select disabled={isWardsDisable}>
                    {
                      wards.map((ward) => (
                        <Option key={_.get(ward, 'code')} value={_.get(ward, 'code')}>{_.get(ward, 'name_with_type')}</Option>
                      ))
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label={t('Status')}>
                {getFieldDecorator('status', {
                  initialValue: _.get(formData, 'status', 0),
                  rules: [{ required: true, message: 'Status is required!' }],
                })(
                  <Select disabled={!_.get(formData, 'status', false)}>
                    {
                      statuses.map((status) => (
                        <Option key={_.get(status, 'id')} value={_.get(status, 'id')}>{_.get(status, 'name')}</Option>
                      ))
                    }
                  </Select>
                )}
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
