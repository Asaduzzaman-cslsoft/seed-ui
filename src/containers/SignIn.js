import React from 'react';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import AuthService from "../util/AuthService";
import Auth from "../util/Auth";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      isLoad: true,
      loader: false,
      errorMessage: ''
    }
    this.Auth = new AuthService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  hideSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ errorMessage: "" })
  };

  componentDidMount() {
    window.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter') {
        this.handleSubmit();
      }
    });
  }

  handleSubmit = () => {
    const { userName, password } = this.state;
    if (userName && password) {
      this.setState({ loader: true })
      new Auth().logIn(userName, password)
        .then(login => {
          this.props.history.push("/");
        })
        .catch(error => {
          this.setState({ errorMessage: error, loader: false })
        });
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value, isLoad: false });
  }

  render() {
    const { userName, password, isLoad, loader, errorMessage } = this.state;

    return (
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">

          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="Jambo">
              <img src={require("assets/images/logo.png")} alt="jambo" title="jambo" />
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h1><IntlMessages id="appModule.signIn" /></h1>
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    name="userName"
                    required
                    label={<IntlMessages id="appModule.userName" />}
                    fullWidth
                    onChange={this.handleChange}
                    defaultValue={userName}
                    margin="normal"
                    className="mt-1 my-sm-3"
                    error={!isLoad && userName === ""}
                    helperText={!isLoad && userName === "" ? "Username is required!" : ""}
                  />
                  <TextField
                    name="password"
                    required
                    type="password"
                    label={<IntlMessages id="appModule.password" />}
                    fullWidth
                    onChange={this.handleChange}
                    defaultValue={password}
                    margin="normal"
                    className="mt-1 my-sm-3"
                    error={!isLoad && password === ""}
                    helperText={!isLoad && password === "" ? "Password name is required!" : ""}
                  />
                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button onClick={this.handleSubmit} variant="contained" color="primary">
                      <IntlMessages id="appModule.signIn" />
                    </Button>

                    <a href="/ResetPassword"><IntlMessages id="appModule.forgotPassword" /></a>
                  </div>

                </fieldset>
              </form>
            </div>
          </div>
        </div>
        {
          loader &&
          <div className="loader-view">
            <CircularProgress />
          </div>
        }
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={errorMessage !== ""}
          autoHideDuration={4000}
          onClose={this.hideSnackbar}>
          <Alert onClose={this.hideSnackbar} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default SignIn