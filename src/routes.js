export const homeRoutes = {
  name: 'Home',
  to: '/',
  exact: true,
  icon: 'chart-pie',
  children: [
    { to: '/', name: 'Dashboard', exact: true },
    { to: '/dashboard-alt', name: 'Dashboard alt', badge: { text: 'new' } },
    { to: '/landing', name: 'Landing' }
  ]
};

export const newRoutes = {
  name: 'Tin Tức',
  to: '/news',
  icon: 'copy',
  children: [
    { to: '/news/list', name: 'Tin tức' },
    { to: '/news/category', name: 'Danh mục' },
    { to: '/news/approved_listings', name: 'Duyệt tin' }
  ]
};

export const pageRoutes = {
  name: 'Trang',
  to: '/pages',
  icon: 'copy',
  children: [
    { to: '/pages/list', name: 'Trang' },
    { to: '/pages/block', name: 'Khối' },
    { to: '/pages/tags', name: 'Thẻ' },
    { to: '/pages/approved_listings', name: 'Duyệt Trang' }
  ]
};

export const emailRoutes = {
  name: 'Mẫu Thư',
  to: '/email',
  icon: 'envelope-open',
  children: [{ to: '/emails/list', name: 'Mẫu Thư' }]
};

export const formRoutes = {
  name: 'Tạo Form',
  to: '/form-builder/list',
  icon: 'book'
};

export const menuRoutes = {
  name: 'Menu',
  to: '/menu/list',
  exact: true,
  icon: 'plug'
};

export const userRoutes = {
  name: 'User',
  to: '/users',
  exact: true,
  icon: 'plug',
  children: [{ to: '/users/list', name: 'User' }]
};

export const pluginRoutes = {
  name: 'Plugins',
  to: '/plugins',
  icon: 'plug',
  children: [
    { to: '/plugins/bulk-select', name: 'Bulk select' },
    { to: '/plugins/chart', name: 'Chart' },
    { to: '/plugins/countup', name: 'Countup' },
    { to: '/plugins/datetime', name: 'Datetime' },
    { to: '/plugins/echarts', name: 'Echarts' },
    { to: '/plugins/fontawesome', name: 'Fontawesome' },
    { to: '/plugins/google-map', name: 'Google map' },
    { to: '/plugins/image-lightbox', name: 'Image lightbox' },
    { to: '/plugins/progressbar', name: 'Progressbar' },
    { to: '/plugins/select', name: 'Select' },
    { to: '/plugins/toastify', name: 'Toastify' },
    { to: '/plugins/typed', name: 'Typed' },
    { to: '/plugins/wysiwyg', name: 'WYSIWYG editor' }
  ]
};

export const settingRoutes = {
  name: 'Setting',
  to: '/setting',
  exact: true,
  icon: 'cog'
};

export default [
  homeRoutes,
  newRoutes,
  pageRoutes,
  emailRoutes,
  formRoutes,
  menuRoutes,
  pluginRoutes,
  settingRoutes,
  userRoutes
];
