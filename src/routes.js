import { getToken } from './helpers/localStorage';
import { indexOf } from 'lodash';
import jwt from 'jsonwebtoken';

const token = getToken();
const permission = jwt.decode(token);
let listScopes = [];
let tool_menu = true;

if (permission !== null) {
  listScopes = permission.scopes.split(',');
}

if (indexOf(listScopes, 'ROLE_XEM LÃI SUẤT') < 0 && indexOf(listScopes, 'ROLE_XEM TỈ GIÁ') < 0) {
  tool_menu = false;
}

export const homeRoutes = {
  name: 'menu.dashborad',
  to: '/',
  exact: true,
  permission: indexOf(listScopes, 'quản trị') > 0 ? true : false,
  icon: 'chart-pie',
  children: [
    { to: '/', name: 'menu.dashborad', exact: true, permission: indexOf(listScopes, 'quản trị') > 0 ? true : false },
    { to: '/landing', name: 'menu.home', permission: indexOf(listScopes, 'quản trị') > 0 ? true : false }
  ]
};

export const newRoutes = {
  name: 'menu.news',
  to: '/news',
  icon: 'copy',
  permission: indexOf(listScopes, 'ROLE_XEM TIN TỨC') > 0 ? true : false,
  children: [
    { to: '/news/list', name: 'menu.news', permission: indexOf(listScopes, 'ROLE_XEM TIN TỨC') > 0 ? true : false },
    {
      to: '/news/category',
      name: 'menu.category',
      permission: indexOf(listScopes, 'ROLE_XEM DANH MỤC') > 0 ? true : false
    },
    {
      to: '/news/approved_listings',
      name: 'menu.newsAccept',
      permission: indexOf(listScopes, 'ROLE_DUYỆT TIN TỨC') > 0 ? true : false
    }
  ]
};

export const pageRoutes = {
  name: 'menu.page',
  to: '/pages',
  icon: 'copy',
  permission: indexOf(listScopes, 'ROLE_XEM PAGE') >= 0 ? true : false,
  children: [
    { to: '/pages/list', name: 'menu.page', permission: indexOf(listScopes, 'ROLE_XEM PAGE') > 0 ? true : false },
    { to: '/pages/block', name: 'menu.block', permission: indexOf(listScopes, 'ROLE_XEM BLOCK') > 0 ? true : false },
    { to: '/pages/tags', name: 'menu.tags', permission: indexOf(listScopes, 'ROLE_XEM TAG') > 0 ? true : false },
    {
      to: '/pages/approved_listings',
      name: 'menu.pageAccept',
      permission: indexOf(listScopes, 'ROLE_DUYỆT TRANG') > 0 ? true : false
    }
  ]
};

export const emailRoutes = {
  name: 'menu.mail',
  to: '/email',
  permission: indexOf(listScopes, 'ROLE_XEM MAILTEMPLATE') > 0 ? true : false,
  icon: 'envelope-open',
  children: [
    {
      to: '/emails/list',
      name: 'menu.mail',
      permission: indexOf(listScopes, 'ROLE_XEM MAILTEMPLATE') > 0 ? true : false
    }
  ]
};

export const formRoutes = {
  name: 'menu.form',
  to: '/form-builder/list',
  exact: true,
  permission: indexOf(listScopes, 'ROLE_XEM FORM') > 0 ? true : false,
  icon: 'file-alt'
};

export const menuRoutes = {
  name: 'Menu',
  to: '/menu/list',
  permission: indexOf(listScopes, 'ROLE_XEM MENU') > 0 ? true : false,
  exact: true,
  icon: 'sliders-h'
};

export const userRoutes = {
  name: 'menu.user',
  to: '/users',
  permission: indexOf(listScopes, 'ROLE_XEM NHÂN VIÊN') > 0 ? true : false,
  exact: true,
  icon: 'user',
  children: [
    { to: '/users/list', name: 'menu.user', permission: indexOf(listScopes, 'ROLE_XEM NHÂN VIÊN') > 0 ? true : false },
    {
      to: '/users/listrole',
      name: 'menu.role',
      permission: indexOf(listScopes, 'ROLE_XEM VAI TRÒ') > 0 ? true : false
    }
  ]
};

export const settingRoutes = {
  name: 'menu.setting',
  to: '/setting',
  permission: indexOf(listScopes, 'ROLE_XEM CÀI ĐẶT') > 0 ? true : false,
  exact: true,
  icon: 'cog'
};

export const storefontRoutes = {
  name: 'menu.storeFont',
  to: '/storefont',
  permission: indexOf(listScopes, 'ROLE_XEM STORE') > 0 ? true : false,
  exact: true,
  icon: 'pencil-alt',
  children: [
    {
      to: '/storefont',
      name: 'menu.storeFont',
      exact: true,
      icon: 'pencil-alt',
      permission: indexOf(listScopes, 'ROLE_XEM STORE') > 0 ? true : false
    },
    {
      name: 'menu.network',
      to: '/network',
      exact: true,
      icon: 'code-branch',
      permission: indexOf(listScopes, 'ROLE_XEM MẠNG LƯỚI') > 0 ? true : false
    }
  ]
};

export const mediaRouter = {
  name: 'menu.media',
  to: '/media',
  permission: indexOf(listScopes, 'ROLE_XEM MEDIA') > 0 ? true : false,
  exact: true,
  icon: 'image'
};

export const groupRouter = {
  name: 'menu.group',
  to: '/group',
  permission: indexOf(listScopes, 'ROLE_XEM NHÓM') > 0 ? true : false,
  exact: true,
  icon: 'code-branch'
};

export const toolMenu = {
  name: 'menu.tool_menu',
  to: '/interest-rate',
  exact: true,
  permission: tool_menu,
  icon: 'ellipsis-h',
  children: [
    {
      to: '/interest-rate',
      name: 'interest_rate.interest_rate',
      permission: indexOf(listScopes, 'ROLE_XEM LÃI SUẤT') > 0 ? true : false
    },
    {
      to: '/exchangeRate',
      name: 'interest_rate.exchange_rate',
      permission: indexOf(listScopes, 'ROLE_XEM TỈ GIÁ') >= 0 ? true : false
    }
  ]
};

export default [
  homeRoutes,
  newRoutes,
  pageRoutes,
  emailRoutes,
  formRoutes,
  menuRoutes,
  groupRouter,
  mediaRouter,
  storefontRoutes,
  toolMenu,
  userRoutes,
  settingRoutes
];
