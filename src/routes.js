import { version } from './config';

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
  children: [{ to: '/news/list', name: 'Tin tức' }, { to: '/news/category', name: 'Danh mục' }]
};

export const pageRoutes = {
  name: 'Trang',
  to: '/pages',
  icon: 'envelope-open',
  // badge: { text: 'new' },
  children: [{ to: '/pages/list', name: 'Trang' }]
};

export const documentationRoutes = {
  name: 'Documentation',
  to: '/documentation',
  exact: true,
  icon: 'book'
};

export const changelogRoutes = {
  name: 'Changelog',
  to: '/changelog',
  exact: true,
  icon: 'code-branch',
  badge: {
    text: `v${version}`,
    color: 'soft-primary'
  }
};

export const componentRoutes = {
  name: 'Components',
  to: '/components',
  icon: 'puzzle-piece',
  children: [
    { to: '/components/alerts', name: 'Alerts' },
    { to: '/components/accordions', name: 'Accordions' },
    { to: '/components/avatar', name: 'Avatar' },
    { to: '/components/badges', name: 'Badges' },
    { to: '/components/backgrounds', name: 'Backgrounds' },
    { to: '/components/breadcrumb', name: 'Breadcrumb' },
    { to: '/components/buttons', name: 'Buttons' },
    { to: '/components/cards', name: 'Cards' },
    { to: '/components/collapses', name: 'Collapses' },
    { to: '/components/dropdowns', name: 'Dropdowns' },
    { to: '/components/forms', name: 'Forms' },
    { to: '/components/listgroups', name: 'List groups' },
    { to: '/components/modals', name: 'Modals' },
    { to: '/components/navs', name: 'Navs' },
    { to: '/components/navbars', name: 'Navbars' },
    { to: '/components/pageheaders', name: 'Page headers' },
    { to: '/components/paginations', name: 'Paginations' },
    { to: '/components/popovers', name: 'Popovers' },
    { to: '/components/progress', name: 'Progress' },
    { to: '/components/tables', name: 'Tables' },
    { to: '/components/tooltips', name: 'Tooltips' }
  ]
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
  componentRoutes,
  utilityRoutes,
  pluginRoutes,
  documentationRoutes,
  changelogRoutes
];
