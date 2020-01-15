export const homeRoutes = {
  name: 'menu.dashborad',
  to: '/',
  exact: true,
  icon: 'chart-pie',
  children: [{ to: '/', name: 'menu.dashborad', exact: true }, { to: '/landing', name: 'menu.home' }]
};

export const newRoutes = {
  name: 'menu.news',
  to: '/news',
  icon: 'copy',
  children: [
    { to: '/news/list', name: 'menu.news' },
    { to: '/news/category', name: 'menu.category' },
    { to: '/news/approved_listings', name: 'menu.newsAccept' }
  ]
};

export const pageRoutes = {
  name: 'menu.page',
  to: '/pages',
  icon: 'copy',
  children: [
    { to: '/pages/list', name: 'menu.page' },
    { to: '/pages/block', name: 'menu.block' },
    { to: '/pages/tags', name: 'menu.tags' },
    { to: '/pages/approved_listings', name: 'menu.pageAccept' }
  ]
};

export const emailRoutes = {
  name: 'menu.mail',
  to: '/email',
  icon: 'envelope-open',
  children: [{ to: '/emails/list', name: 'menu.mail' }]
};

export const formRoutes = {
  name: 'menu.form',
  to: '/form-builder/list',
  icon: 'file-alt'
};

export const menuRoutes = {
  name: 'Menu',
  to: '/menu/list',
  exact: true,
  icon: 'sliders-h'
};

export const userRoutes = {
  name: 'menu.user',
  to: '/users',
  exact: true,
  icon: 'user',
  children: [{ to: '/users/list', name: 'menu.user' }, { to: '/users/listrole', name: 'menu.role' }]
};

export const settingRoutes = {
  name: 'menu.setting',
  to: '/setting',
  exact: true,
  icon: 'cog'
};

export const storefontRoutes = {
  name: 'menu.storeFont',
  to: '/storefont',
  exact: true,
  icon: 'pencil-alt',
  children: [
    {
      to: '/storefont',
      name: 'menu.storeFont',
      exact: true,
      icon: 'pencil-alt'
    }, {
      name: 'menu.network',
      to: '/network',
      exact: true,
      icon: 'code-branch'
    }
  ]
};

export const sliderfontRoutes = {
  name: 'menu.slider',
  to: '/slider',
  exact: true,
  icon: 'sliders-h'
};

export const mediaRouter = {
  name: 'menu.media',
  to: '/media',
  exact: true,
  icon: 'image'
};

export const toolMenu = {
  name: 'menu.tool_menu',
  to: '/',
  exact: true,
  icon: 'ellipsis-h',
  children: [
    { to: '/interest-rate', name: 'interest_rate.interest_rate', exact: true },
    { to: '/exchangeRate', name: 'interest_rate.exchange_rate', exact: true }
  ]
};

export const groupRouter = {
  name: 'menu.group',
  to: '/group',
  exact: true,
  icon: 'code-branch'
};
export default [
  homeRoutes,
  newRoutes,
  pageRoutes,
  emailRoutes,
  formRoutes,
  menuRoutes,
  toolMenu,
  sliderfontRoutes,
  storefontRoutes,
  mediaRouter,
  groupRouter,
  userRoutes,
  settingRoutes
];
