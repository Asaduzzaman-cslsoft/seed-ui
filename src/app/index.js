import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import TopNav from 'components/TopNav';
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from 'constants/ActionTypes';

import asyncComponent from 'util/asyncComponent';

import { isIOS, isMobile } from 'react-device-detect';

import { $http } from "util/HttpRequest";
import { AppConst, Services } from "../util/Util";

import CircularProgress from '@material-ui/core/CircularProgress';
// import UserProfile from 'app/routes/UserProfile';

import Home from 'components/Home';
import Error404 from 'components/Error404';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // redux can be used to make this state element as prop,
      // since a user's meneList will not change as long as s/he is logged into the system
      menuList: [],
      loader: true
    };
  }

  componentDidMount() {
    $http.get(`${AppConst.BaseUrl}${Services.Security}/User/GetMenus`)
      .then(res => this.setState({ menuList: res.Result, loader: false }))
      .catch(() => {
        this.setState({ loader: false })
      });
  }

  render() {
    const { drawerType, navigationStyle, horizontalNavPosition } = this.props;
    let { menuList, loader } = this.state;
    if (!menuList) menuList = [];
    const drawerStyle =
      drawerType.includes(FIXED_DRAWER) ?
        'fixed-drawer' :
        drawerType.includes(COLLAPSED_DRAWER) ?
          'collapsible-drawer' :
          'mini-drawer';

    // set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height');
    }
    else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height');
    }

    return (
      <div className={`app-container ${drawerStyle}`}>
        <Sidebar menuList={menuList} />

        <div className="app-main-container">
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {
              (navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
              <TopNav menuList={menuList.filter(menu => menu.MenuId !== menu.ParentId)} styleName="app-top-header" />
            }

            <Header />

            {
              (navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
              <TopNav menuList={menuList.filter(menu => menu.MenuId !== menu.ParentId)} />
            }
          </div>
          {
            loader &&
            <div className="loader-view">
              <CircularProgress />
            </div>
          }
          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                {/* <Route path='/ResetPassword' component={ResetPassword} /> */}
                {/* <Route path='/ChangePassword' component={ChangePassword} /> */}
                {/* <Route path='/profile' component={UserProfile} /> */}
                {
                  menuList.map((menu, index) => {
                    if (menu.ViewName)
                      return <Route
                        key={index}
                        path={`/${menu.RouteName}`}
                        component={
                          asyncComponent(() => import(`./routes/${menu.ViewName}`),
                            {
                              MenuId: menu.MenuId, CanCreate: menu.CanCreate, CanRead: menu.CanRead, CanUpdate: menu.CanUpdate, CanDelete: menu.CanDelete
                            }, menu.Parameters)
                        }
                      />
                      else return null;
                  })
                }

                <Route path='/home' component={Home} />
                {
                  menuList.length &&
                  <Route component={Error404} />
                }
              </Switch>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition };
};

export default withRouter(connect(mapStateToProps)(App));
