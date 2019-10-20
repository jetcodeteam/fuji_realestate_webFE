import React, { useState } from 'react';
import { withI18n } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { message } from "antd";

import emailPic from '../static/images/contact/email.png';
import phoneCall from '../static/images/contact/phone-call.png';
import schedule from '../static/images/contact/schedule.png';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createRequest } from '../services/EmailServices';

const ContactPage = (props) => {
  const {
    t,
    history,
  } = props;
  const shouldWrap = useMediaQuery('(min-width:555px)');
  const [topic, setTopic] = useState('');
  const [data, setData] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [values, setValues] = React.useState({
    multiline: '',
  });
  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    if (topic && data && email && phone) {
      const body = {
        topic: topic,
        content: data,
        email: email,
        phone: phone,
        status: 0,
      }
      createRequest(body)
        .then((res) => {
          console.log(res);
          history.push('/request');
        })
        .catch((err) => {
          message.error(`Couldn't create request`);
          console.log(err);
        })
    } else {
      message.error(`All field is required`);
    }
  }

  const useStyles = makeStyles(theme => ({
    contactWrapper: {
      margin: '55px 0 100px 0',
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      height: '160%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputWrapper: {
      position: shouldWrap || 'relative',
      width: shouldWrap ? '35%' : '80%',
      minWidth: '304.141px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flexShrink: 1,
      marginRight: '5%',
      border: shouldWrap || '1px solid #D9D9D9',
      height: shouldWrap || 500,
      padding: shouldWrap || 35,
      borderRadius: shouldWrap || 5,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    infoWrapper: {
      display: 'flex',
      width: shouldWrap ? '15%' : '35%',
      minWidth: '193.94px',
      flexDirection: 'column',
      flexShrink: 1,
      marginRight: '5%',
      height: shouldWrap || 250,
      marginTop: shouldWrap || 75,
    },
    subInfo: {
      display: 'flex',
      flexGrow: 1,
    },
    infoContent: {
      textAlign: 'center',
      fontSize: 15,
    },
    button: {
      marginTop: 35,
      width: '30%',
      margin: theme.spacing(1),
      color: 'white',
    },
  }));
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.contactWrapper}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '5%',
            flexWrap: 'wrap',
          }}
        >
          <div className={classes.inputWrapper}>
            {
              shouldWrap || (
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '1.5em',
                    position: 'absolute',
                    top: -15,
                    left: '25%',
                    backgroundColor: '#fff',
                  }}
                >
                  Contact Information
                </div>
              )
            }
            <TextField
              id="outlined-phone-input"
              label={t('phone')}
              className={classes.textField}
              type="phone"
              name="phone"
              margin="normal"
              variant="outlined"
              value={phone}
              onChange={evt => setPhone(evt.currentTarget.value)}
            />
            <TextField
              id="outlined-email-input"
              label={t('email')}
              className={classes.textField}
              type="email"
              name="email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={evt => setEmail(evt.currentTarget.value)}
            />
            <TextField
              id="outlined-subject-input"
              label={t('subject')}
              className={classes.textField}
              type="subject"
              name="subject"
              margin="normal"
              variant="outlined"
              value={topic}
              onChange={evt => setTopic(evt.currentTarget.value)}
            />
            <TextField
              id="outlined-description-flexible"
              label={t('description')}
              multiline
              rowsMax="4"
              value={values.multiline}
              onChange={handleChange('multiline')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={data}
              onChange={evt => setData(evt.currentTarget.value)}
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
          <div className={classes.infoWrapper}>
            <div className={classes.subInfo}>
              <img
                src={schedule}
                style={{ marginRight: '10%' }}
                alt="Schedule"
                width="40"
                height="40"
              />
              <div className={classes.infoContent}>
                <h3>WORKING HOURS</h3>
                <h3>7:00 AM - 5:00 PM</h3>
              </div>
            </div>
            <div className={classes.subInfo}>
              <img
                src={phoneCall}
                style={{ marginRight: '10%' }}
                alt="Phone Call"
                width="40"
                height="40"
              />
              <div className={classes.infoContent}>
                <h3>CALL NOW</h3>
                <h3>+84 90 - 381 - 5099</h3>
              </div>
            </div>
            <div className={classes.subInfo}>
              <img src={emailPic} style={{ marginRight: '10%' }} alt="Email" width="40" height="40" />
              <div className={classes.infoContent}>
                <h3>MAILING ADDRESS</h3>
                <h3>company@fujiwara.com</h3>
              </div>
            </div>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4174421520065!2d106.70258875020643!3d10.77930556205077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f48b8b124c3%3A0x57cd8facbcbcfec6!2zOGEgVGjDoWkgVsSDbiBMdW5nLCBC4bq_biBOZ2jDqSwgSG8gQ2hpIE1pbmggQ2l0eSwgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1571581019509!5m2!1sen!2s"
          width="1000" height="450" frameBorder="0" style={{ border:0 }} allowFullScreen="">
        </iframe>
      </div>
    </React.Fragment>
  );
};

export default withI18n()(ContactPage);
