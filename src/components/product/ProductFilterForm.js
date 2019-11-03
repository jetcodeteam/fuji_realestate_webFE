import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import _ from 'lodash';

import { Modal, Button, Select, Row, Col, Form, Input } from 'antd';
import { getDistricts } from '../../services/LocationServices';

const { Option } = Select;

const ProductFilterForm = (props) => {
  const {
    t,
    handleFilter,
    onFilterClose,
    visible,
  } = props;

  const kinds = {
    room: 'room',
    floor: 'floor',
    square: 'square',
    districts: 'district',
    ward: 'ward',
    city: 'city',
    price: 'price',
    houseType: 'houseType',
  }

  const [state, setState] = useState({
    [kinds.room]: undefined,
    [kinds.floor]: undefined,
    [kinds.square]: undefined,
    [kinds.districts]: undefined,
    [kinds.ward]: undefined,
    [kinds.city]: undefined,
    [kinds.price]: undefined,
    [kinds.houseType]: undefined,
  });
  const [districts, setDistricts] = useState([])

  useEffect(() => {
    getDistricts()
    .then((res) => {
      setDistricts(_.get(res, 'data.data', []));
    })
  }, [])

  const onValueChange = (kind, value) => {
    setState({
        ...state,
        [kind]: value,
    });
  };

  const numberArray = Array.from(Array(10), (e,i)=>i+1);

  return (
    <React.Fragment>
      <Modal
        visible={visible}
        title={t('product_filter')}
        onOk={() => handleFilter(state)}
        onCancel={onFilterClose}
        footer={[
          <Button key="back" onClick={onFilterClose}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={() => handleFilter(state)}>
            Apply
          </Button>,
        ]}
      >
        <Form>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label={t('room')}>
                <Select
                  placeholder="Select how many room you want"
                  onChange={value => onValueChange(kinds.room, value)}
                  value={state.room}
                >
                  <Option key={'all'} value={undefined}>{t('all')}</Option>
                  {
                    numberArray.map((number, i) => (
                      <Option key={i} value={number}>{number}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t('floor')}>
                <Select
                  placeholder="Select how many floor you want"
                  onChange={value => onValueChange(kinds.floor, value)}
                  value={state.floor}
                >
                  <Option key={'all'} value={undefined}>{t('all')}</Option>
                  {
                    numberArray.map((number, i) => (
                      <Option key={i} value={number}>{number}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t('total_area')}>
                <Input addonAfter="m2" value={state.square} onChange={(e) => onValueChange(kinds.square, e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t('price')}>
                <Select
                  onChange={value => onValueChange(kinds.price, value)}
                  value={state.price}
                >
                  <Option key="all" value={undefined}>{t('all')}</Option>
                  <Option key='below_6' value='below_6'>Below 6 millions</Option>
                  <Option key='from_6_to_10' value='from_6_to_10'>From 6 to 10 millions</Option>
                  <Option key='from_10_to_15' value='from_10_to_15'>From 10 to 15 millions</Option>
                  <Option key='above_15' value='above_15'>More than 15 millions</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t('house_type')}>
                <Select
                  onChange={value => onValueChange(kinds.houseType, value)}
                  value={state.houseType}
                >
                  <Option key="all" value={undefined}>{t('all')}</Option>
                  <Option key="1" value="house_type1">{t('house_type1')}</Option>
                  <Option key="2" value="house_type2">{t('house_type2')}</Option>
                  <Option key="3" value="house_type3">{t('house_type3')}</Option>
                  <Option key="4" value="house_type4">{t('house_type4')}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t('address')}>
                <Select
                  placeholder="Select the district you want"
                  onChange={value => onValueChange(kinds.districts, value)}
                  value={state.districts}
                >
                  <Option key="all" value={undefined}>{t('all')}</Option>
                  {districts.map(district => (
                    <Option
                      key={_.get(district, '_id', '')}
                      value={_.get(district, '_id', '')}
                    >
                      {_.get(district, 'name_with_type', '')}
                  </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        
      </Modal>
    </React.Fragment>
  );
};

ProductFilterForm.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(ProductFilterForm);
