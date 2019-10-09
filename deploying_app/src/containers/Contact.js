import React from 'react';
import { withI18n } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import email from '../static/images/contact/email.png';
import phoneCall from '../static/images/contact/phone-call.png';
import schedule from '../static/images/contact/schedule.png';
import map from '../static/images/contact/map.png';


const ContactPage = () => {
  const [values, setValues] = React.useState({
    multiline: '',
  });
  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const useStyles = makeStyles(theme => ({
    contactWrapper: {
      position: 'absolute',
      top: '15%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      height: '160%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputWrapper: {
      width: '35%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flexShrink: 1,
      marginRight: '5%',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    infoWrapper: {
      display: 'flex',
      height: '70%',
      flexDirection: 'column',
      flexShrink: 1,
      marginRight: '5%',
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
            alignItems: 'center',
            marginBottom: '5%',
          }}
        >
          <div className={classes.inputWrapper}>
            <TextField
              id="outlined-name-input"
              label="Name"
              className={classes.textField}
              type="name"
              name="name"
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-subject-input"
              label="Subject"
              className={classes.textField}
              type="subject"
              name="subject"
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-description-flexible"
              label="Description"
              multiline
              rowsMax="4"
              value={values.multiline}
              onChange={handleChange('multiline')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <Button variant="contained" color="primary" className={classes.button}>
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
              <img src={email} style={{ marginRight: '10%' }} alt="Email" width="40" height="40" />
              <div className={classes.infoContent}>
                <h3>MAILING ADDRESS</h3>
                <h3>company@fujiwara.com</h3>
              </div>
            </div>
          </div>
        </div>
        <img src={map} alt="example map" />
      </div>
    </React.Fragment>
  );
};

export default withI18n()(ContactPage);
