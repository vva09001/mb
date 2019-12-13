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
  children: [{ to: '/pages/list', name: 'Trang' }]
};

export const emailRoutes = {
  name: 'Mẫu Thư',
  to: '/email',
  icon: 'envelope-open',
  children: [{ to: '/emails/list', name: 'Mẫu Thư' }]
};

export const documentationRoutes = {
  name: 'Documentation',
  to: '/documentation',
  exact: true,
  icon: 'book'
};

export const componentRoutes = {
  name: 'Tạo Form',
  to: '/form-builder/list',
  icon: 'book'
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

export const utilityRoutes = {
  name: 'Utilities',
  to: '/utilities',
  icon: ['fab', 'hotjar'],
  children: [
    { to: '/utilities/borders', name: 'Borders' },
    { to: '/utilities/clearfix', name: 'Clearfix' },
    { to: '/utilities/closeIcon', name: 'Close icon' },
    { to: '/utilities/colors', name: 'Colors' },
    { to: '/utilities/display', name: 'Display' },
    { to: '/utilities/embed', name: 'Embed' },
    { to: '/utilities/figures', name: 'Figures' },
    { to: '/utilities/flex', name: 'Flex' },
    { to: '/utilities/grid', name: 'Grid' },
    { to: '/utilities/sizing', name: 'Sizing' },
    { to: '/utilities/spacing', name: 'Spacing' },
    { to: '/utilities/stretchedLink', name: 'Stretched link' },
    { to: '/utilities/typography', name: 'Typography' },
    { to: '/utilities/verticalAlign', name: 'Vertical align' },
    { to: '/utilities/visibility', name: 'Visibility' }
  ]
};

export default [
  homeRoutes,
  newRoutes,
  pageRoutes,
  emailRoutes,
  componentRoutes,
  utilityRoutes,
  pluginRoutes,
  documentationRoutes
];
