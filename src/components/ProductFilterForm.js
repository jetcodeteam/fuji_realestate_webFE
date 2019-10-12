import React, {
    useState,
} from 'react';

import { Modal, Button, Select, Row, Col, Form, Input } from 'antd';

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
    area: 'area',
    district: 'district',
    ward: 'ward',
    city: 'city',
    price: 'price',
    houseType: 'houseType',
  }

  const [state, setState] = useState({
    [kinds.room]: undefined,
    [kinds.floor]: undefined,
    [kinds.area]: undefined,
    [kinds.district]: undefined,
    [kinds.ward]: undefined,
    [kinds.city]: undefined,
    [kinds.price]: undefined,
    [kinds.houseType]: undefined,
  });

  console.log(state);

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
        title="Product Filter"
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
              <Form.Item label="Room">
                <Select
                  placeholder="Select how many room you want"
                  onChange={value => onValueChange(kinds.room, value)}
                  value={state.room}
                >
                  <Option key={'all'} value={undefined}>All</Option>
                  {
                    numberArray.map((number, i) => (
                      <Option key={i} value={number}>{number}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Floor">
                <Select
                  placeholder="Select how many floor you want"
                  onChange={value => onValueChange(kinds.floor, value)}
                  value={state.floor}
                >
                  <Option key={'all'} value={undefined}>All</Option>
                  {
                    numberArray.map((number, i) => (
                      <Option key={i} value={number}>{number}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Total area">
                <Input addonAfter="m2" value={state.area} onChange={(e) => onValueChange(kinds.area, e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Price">
                <Select
                  onChange={value => onValueChange(kinds.price, value)}
                  value={state.price}
                >
                  <Option key="all" value={undefined}>All</Option>
                  <Option key="1" value="1">Below 6 billions</Option>
                  <Option key="2" value="2">From 6 to 10 billions</Option>
                  <Option key="3" value="3">More than 10 billions</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="House Type">
                <Select
                  onChange={value => onValueChange(kinds.houseType, value)}
                  value={state.houseType}
                >
                  <Option key="all" value={undefined}>All</Option>
                  <Option key="1" value="1">Office</Option>
                  <Option key="2" value="2">House</Option>
                  <Option key="3" value="3">Restaurant</Option>
                  <Option key="4" value="4">Industrial Zone</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        
      </Modal>
    </React.Fragment>
  );
};

export default ProductFilterForm;