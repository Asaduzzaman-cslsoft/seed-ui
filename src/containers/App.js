import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import 'assets/vendors/style';
import defaultTheme from './themes/defaultTheme';
import AppLocale from '../lngProvider';

import MainApp from 'app/index';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from 'components/Home';
import TestViewer from 'app/routes/TestViewer';
// import ResetPassword from './ResetPassword';
import { setInitUrl } from '../actions/Auth';
import RTL from 'util/RTL';
import asyncComponent from 'util/asyncComponent';

import AuthService from "../util/AuthService";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'assets/css/app.css';


const RestrictedRoute = ({ component: Component, authUser, ...rest }) =>
  <Route
    {...rest}
    render={
      props => authUser ?
        <Component {...props} /> :
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }} />
    }
  />;

class App extends Component {
  UNSAFE_componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  render() {
    // authUser
    const { match, location, locale, isDirectionRTL } = this.props;
    const auth = new AuthService();
    let user = auth.getUser();
    if (location.pathname === '/') {
      if (user === null || !auth.loggedIn()) {
        return (<Redirect to={'/signin'} />);
      }
      else {
        return (<Redirect to={'/home'} />);
      }
    }

    const applyTheme = createMuiTheme(defaultTheme);

    if (isDirectionRTL) {
      applyTheme.direction = 'rtl';
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl');
      applyTheme.direction = 'ltr';
    }

    const currentAppLocale = AppLocale[locale.locale];

    return (
      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <RTL>
              <div className='app-main'>
                <Switch>
                  {/* <Route path='/ResetPassword' component={ResetPassword} /> */}
                  <Route path='/signin' component={SignIn} />
                  <RestrictedRoute path={`${match.url}`} authUser={user}
                    component={MainApp} />
                  <Route path='/signup' component={SignUp} />
                  <Route path='/home' component={Home} /> 
                  <Route path='/test' component={TestViewer} />              
                  {/* <Route path='/home' component={asyncComponent(() => import('components/Home'))} /> */}
                  <Route component={asyncComponent(() => import('components/Error404'))} />
                </Switch>
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { sideNavColor, locale, isDirectionRTL } = settings;
  const { authUser, initURL } = auth;
  return { sideNavColor, locale, isDirectionRTL, authUser, initURL }
};

export default connect(mapStateToProps, { setInitUrl })(App);
