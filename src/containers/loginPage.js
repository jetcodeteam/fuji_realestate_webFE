import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AdornedButton from '../components/AdornedButton';
// import { userLogin } from '../services/UserLogIn';

const styles = () => ({
  container: {
    position: 'absolute',
    width: '100%',
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
    setTimeout(() => {
      setFormLoading(false);
      setIsError(true);
      setError('Wrong!');
    }, 3000);
    // UserLogIn(userName, password)
    //   .then(() => {
    //     if (isFormLoading) {
    //       setFormLoading(false);
    //     }
    //   })
    //   .catch((err) => {
    //     setIsError(true);
    //     setError(err.message);
    //   });
  };

  return (
    <div>
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
            Sign in
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
    </div>
  );
};

LoginPage.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default withStyles(styles)(LoginPage);
