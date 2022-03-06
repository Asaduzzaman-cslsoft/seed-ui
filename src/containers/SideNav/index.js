import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
// import SidenavContent from './SidenavContent';
import UserInfo from 'components/UserInfo';
import { COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { toggleCollapsedNav, updateWindowWidth } from 'actions/Setting';

import { AppMenu } from 'lib/index';
// import IntlMessages from 'util/IntlMessages';
// import IconDashboard from '@material-ui/icons/Dashboard';
import SecurityIcon from '@material-ui/icons/Security';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import BarChartIcon from '@material-ui/icons/BarChart';

class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuState: {},
      // activeMenu: ''
    }    
  }

  iconArray = [
    { name: 'SecurityIcon', component: SecurityIcon },
    { name: 'HomeWorkIcon', component: HomeWorkIcon },
    { name: 'ReceiptIcon', component: ReceiptIcon },
    { name: 'SyncAltIcon', component: SyncAltIcon },
    { name: 'BarChartIcon', component: BarChartIcon }
  ];

  makeMenu = (parentList, menuList) => {
    var menuString = [];

    parentList.forEach((parentMenu, index) => {
      menuString.push({ name: parentMenu.Description, Icon: this.iconArray.find(icon => icon.name === (parentMenu.IconName || "HomeWorkIcon")).component });

      var childString = this.makeSubmenu(menuList, parentMenu.MenuId);
      if (childString.length) {
        menuString[index].submenus = childString;
      }
    });

    return menuString;
  }

  makeSubmenu = (menuList, parentId) => {
    var childList = menuList.filter(menu => menu.ParentId === parentId);
    var menuString = [];

    childList.forEach((childMenu, index) => {
      menuString.push({ name: childMenu.Description, link: childMenu.RouteName });

      if (!childMenu.RouteName && !childMenu.ViewName) {
        var childString = this.makeSubmenu(menuList, childMenu.MenuId);

        if (childString.length) {
          menuString[index].submenus = childString;
        }
      }
    });

    return menuString;
  }

  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.props.updateWindowWidth(window.innerWidth)
    });
  }

  render() {
    const { navCollapsed, drawerType, width, navigationStyle } = this.props;

    let drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-xl-flex' : drawerType.includes(COLLAPSED_DRAWER) ? '' : 'd-flex';
    let type = 'permanent';

    if (drawerType.includes(COLLAPSED_DRAWER) || (drawerType.includes(FIXED_DRAWER) && width < 1200)) {
      type = 'temporary';
    }

    if (navigationStyle === HORIZONTAL_NAVIGATION) {
      drawerStyle = '';
      type = 'temporary';
    }

    let menuList = this.makeMenu(
      this.props.menuList.filter(menu => menu.MenuId === menu.ParentId),
      this.props.menuList.filter(menu => menu.MenuId !== menu.ParentId)
    );

    return (
      <div className={`app-sidebar d-none ${drawerStyle}`}>
        <Drawer className='app-sidebar-content'
          variant={type}
          open={type.includes('temporary') ? navCollapsed : true}
          onClose={this.onToggleCollapsedNav}
          classes={{ paper: 'side-nav' }}>

          <UserInfo history={this.props.history} />
          {/* <SidenavContent menuList={this.props.menuList.filter(menu => menu.MenuId !== menu.ParentId)} /> */}

          <ul className='nav-menu'>
            <AppMenu menuList={menuList} parent={this} />
          </ul>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { navCollapsed, drawerType, width, navigationStyle } = settings;
  return { navCollapsed, drawerType, width, navigationStyle }
};

export default withRouter(connect(mapStateToProps, { toggleCollapsedNav, updateWindowWidth })(SideNav));

