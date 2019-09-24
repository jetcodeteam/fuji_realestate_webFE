import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AdornedButton from '../components/AdornedButton';
import Background from '../assets/admin-bg.png';
import { userLogin } from '../services/UserServices';
import { setAccessToken } from '../services/TokenServices';

const styles = () => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundImage: `url(${Background})`,
    height: '100vh',
    zIndex: -1,
  },
  login: {
    boxShadow: '0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)',
    borderRadius: '4px',
    padding: '5vh',
    backgroundColor: '#fff',
    maxWidth: '340px',
    margin: '25vh auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  input: {
    paddingBottom: '25px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    marginBottom: '25px',
    maxWidth: '200px',
  },
  gutter: {
    marginBottom: '1em',
  },
});

const LoginPage = (props) => {
  const {
    classes,
    t,
    history,
  } = props;

  const [isFormLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(' ');
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRememberUser, setShouldRememberUser] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormLoading) {
      return;
    }
    setFormLoading(true);
    if (!userName || !password) {
      setFormLoading(false);
      setIsError(true);
      setError('User and password cannot be empty');
    } else {
      userLogin({
        username: userName,
        password,
      })
        .then((res) => {
          console.log(res);
          setFormLoading(false);
          setAccessToken(_.get(res, 'data.token'));
          history.push('/emails');
        })
        .catch((err) => {
          console.log(err.response);
          setFormLoading(false);
          setIsError(true);
          setError(_.get(err, 'response.data.message'));
        });
    }
  };

  return (
    <React.Fragment>
      <div className={classes.container} />
      <form className={classes.login}>
        <div className={classes.gutter}>
          <TextField
            className={classes.input}
            fullWidth
            error={isError}
            id="user-name"
            label="User Name"
            value={userName}
            onChange={evt => setUserName(evt.currentTarget.value)}
            autoComplete="current-user"
          />
          <TextField
            className={classes.input}
            error={isError}
            type="password"
            id="password"
            label="Password"
            fullWidth
            value={password}
            onChange={evt => setPassword(evt.currentTarget.value)}
            helperText={error}
          />
        </div>
        <div className={classes.row}>
          <AdornedButton
            className={classes.button}
            loading={isFormLoading}
            variant="contained"
            color="primary"
            id="submit-login"
            onClick={handleSubmit}
          >
            {t('sign_in')}
          </AdornedButton>
        </div>
        <FormControlLabel
          control={(
            <Checkbox
              checked={shouldRememberUser}
              color="secondary"
              onChange={() => setShouldRememberUser(!shouldRememberUser)}
            />
          )}
          label="Remember me"
        />
      </form>
    </React.Fragment>
  );
};

LoginPage.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withRouter(withI18n()(withStyles(styles)(LoginPage)));
