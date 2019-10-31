import React from 'react';
import { withI18n } from 'react-i18next';
import { Form, Input, Icon, Button } from 'antd';

let id = 0;

const FeatureForm = (props) => {
  const { 
    t,
    form,
  } = props

  const remove = (k) => {
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  const add = () => {
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  };

  const { getFieldDecorator, getFieldValue } = form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  getFieldDecorator('keys', { initialValue: [] });
  const keys = getFieldValue('keys');

  const formItems = keys.map((k, index) => (
    <Form.Item
      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
      label={index === 0 ? 'Passengers' : ''}
      required={false}
      key={k}
    >
      {getFieldDecorator('feature', {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [
          {
            required: true,
            whitespace: true,
            message: "Please input feature or delete this field.",
          },
        ],
      })(<Input placeholder="Feature" style={{ width: '60%', marginRight: 8 }} />)}
      {keys.length > 1 ? (
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => remove(k)}
        />
      ) : null}
    </Form.Item>
  ));
  return (
    <Form onSubmit={handleSubmit()}>
      {formItems}
      <Form.Item {...formItemLayoutWithOutLabel}>
        <Button type="dashed" onClick={add()} style={{ width: '60%' }}>
          <Icon type="plus" /> Add field
        </Button>
      </Form.Item>
      <Form.Item {...formItemLayoutWithOutLabel}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

FeatureForm.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
};

export default withI18n()(FeatureForm);