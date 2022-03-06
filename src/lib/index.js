/* eslint-disable */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from 'react-router-dom';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var AppMenuItemComponent = function (props) {
    var className = props.className, onClick = props.onClick, link = props.link, children = props.children;
    // If link is not set return the orinary ListItem
    if (!link || typeof link !== 'string') {
        // eslint-disable-next-line react/no-children-prop
        return React.createElement(ListItem, { button: true, className: className, children: children, onClick: onClick });
    }
    // Return a LitItem with a link component
    return (React.createElement(ListItem, { button: true, 
        // className={className}
        className: "menu no-arrow " + className, 
        // eslint-disable-next-line react/no-children-prop
        children: children, 
        // eslint-disable-next-line react/display-name
        component: forwardRef(function (props, ref) { return (React.createElement(NavLink, __assign({ exact: true }, props, { innerRef: ref }))); }), to: link }));
};
//# sourceMappingURL=AppMenuItemComponent.js.map

// React runtime PropTypes
var AppMenuItemPropTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
    Icon: PropTypes.elementType,
    parent: PropTypes.any,
    submenus: PropTypes.array,
};
var useStyles = makeStyles(function () {
    return createStyles({
        menuItem: {
            '&.active': {
                background: 'rgba(0, 0, 0, 0.20)',
                '& .MuiListItemIcon-root': {
                    color: 'beige',
                },
            },
        },
        menuItemIcon: {
            color: 'beige',
        },
        listItemText: {
            color: 'beige',
        },
        activeMenu: {
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
        },
    });
});
// const AppMenuItem: React.FC<AppMenuItemProps> = props => {
//   const { name, link, Icon, submenus = [] } = props;
//   const classes = useStyles();
//   const isExpandable = submenus && submenus.length > 0;
//   const [open, setOpen] = React.useState(false);
//   useEffect(() => {
//     console.log(open);
//     setOpen(open);
//   }, [open, setOpen]);
//   function handleClick() {
//     setOpen(!open);
//   }
//   const MenuItemRoot: React.FC<any> = props => {
//     return (
//       <AppMenuItemComponent className={props.classes.menuItem} link={props.link} onClick={props.handleClick}>
//         {/* Display an icon if any */}
//         {!!props.Icon && (
//           // <ListItemIcon className={classes.menuItemIcon}>
//           <ListItemIcon>
//             <props.Icon className={props.classes.menuItemIcon} />
//           </ListItemIcon>
//         )}
//         <ListItemText className={props.classes.listItemText} primary={props.name} inset={!props.Icon} />
//         {/* Display the expand menu if the item has children */}
//         {props.isExpandable && !props.open && <IconExpandMore />}
//         {props.isExpandable && props.open && <IconExpandLess />}
//       </AppMenuItemComponent>
//     );
//   };
//   const MenuItemRootMemoized = React.memo(MenuItemRoot);
//   const MenuItemChildren: React.FC<any> = props => {
//     return props.isExpandable ? (
//       // <Collapse in={open} timeout="auto" unmountOnExit>
//       <Collapse in={props.open} timeout="auto">
//         <Divider />
//         <List component="div" disablePadding>
//           {submenus.map((item, index) => (
//             <AppMenuItem {...item} key={index} />
//           ))}
//         </List>
//       </Collapse>
//     ) : null;
//   };
//   const MenuItemChildrenMemoized = React.memo(MenuItemChildren);
//   return (
//     <>
//       <MenuItemRootMemoized
//         classes={classes}
//         link={link}
//         handleClick={handleClick}
//         Icon={Icon}
//         name={name}
//         open={open}
//         isExpandable={isExpandable}
//       />
//       <MenuItemChildrenMemoized open={open} isExpandable={isExpandable} />
//     </>
//   );
// };
var AppMenuItem = function (props) {
    var name = props.name, link = props.link, Icon = props.Icon, parent = props.parent, _a = props.submenus, submenus = _a === void 0 ? [] : _a;
    var classes = useStyles();
    var isExpandable = submenus && submenus.length > 0;
    // const [open, setOpen] = React.useState(parent && parent.state.menuState[name] ? parent.state.menuState[name] : false);
    var open = React.useState(parent && parent.state.menuState[name] ? parent.state.menuState[name] : false)[0];
    function handleClick() {
        var _a;
        // setOpen(!open);
        var menuState = parent.state.menuState;
        var updatedMenuState = Object.keys(menuState).reduce(function (updatingMenuState, key) {
            updatingMenuState[key] = false;
            return updatingMenuState;
        }, {});
        parent.setState({ menuState: __assign(__assign({}, updatedMenuState), (_a = {}, _a[name] = !open, _a)) });
    }
    var MenuItemRoot = (
    // <AppMenuItemComponent className={classes.menuItem} link={link} onClick={handleClick}>
    React.createElement(AppMenuItemComponent, { className: classes.menuItem + " " + (
        // (parent && parent.state.activeMenu === name && open) ||
        window.location
            .toString()
            .split('/')
            .slice(-1)
            .pop() === link
            ? classes.activeMenu
            : ''), link: link, onClick: handleClick },
        !!Icon && (
        // <ListItemIcon className={classes.menuItemIcon}>
        React.createElement(ListItemIcon, null,
            React.createElement(Icon, { className: classes.menuItemIcon }))),
        React.createElement(ListItemText, { className: classes.listItemText, primary: name, inset: !Icon }),
        isExpandable && !open && React.createElement(IconExpandMore, null),
        isExpandable && open && React.createElement(IconExpandLess, null)));
    var MenuItemChildren = isExpandable ? (
    // <Collapse in={open} timeout="auto" unmountOnExit>
    React.createElement(Collapse, { in: open, timeout: "auto" },
        React.createElement(Divider, null),
        React.createElement(List, { component: "div", disablePadding: true }, submenus.map(function (item, index) { return (React.createElement(AppMenuItem, __assign({}, item, { key: index }))); })))) : null;
    return (React.createElement(React.Fragment, null,
        MenuItemRoot,
        MenuItemChildren));
};

// React runtime PropTypes
var AppMenuPropTypes = {
    menuList: PropTypes.array.isRequired,
    parent: PropTypes.any,
};
// const drawerWidth = 240;
var useStyles$1 = makeStyles(function (theme) {
    return createStyles({
        appMenu: {
            width: '100%',
            padding: theme.spacing(0),
        },
    });
});
var AppMenu = function (props) {
    var _a = props.menuList, menuList = _a === void 0 ? [] : _a, parent = props.parent;
    var classes = useStyles$1();
    var AppMenuRoot = function (props) {
        var menuList = props.menuList, parent = props.parent, classes = props.classes;
        return (React.createElement(List, { component: "nav", className: classes.appMenu, disablePadding: true }, menuList.map(function (menu, index) { return (React.createElement(AppMenuItem, __assign({}, menu, { key: index, parent: parent }))); })));
    };
    var AppMenuRootMemoized = React.memo(AppMenuRoot, function () { return true; });
    return React.createElement(AppMenuRootMemoized, { menuList: menuList, parent: parent, classes: classes });
    // return (
    //   <List component="nav" className={classes.appMenu} disablePadding>
    //     {menuList.map((menu, index) => (
    //       <AppMenuItem {...menu} key={index} />
    //     ))}
    //   </List>
    // );
};

export { AppMenu };
