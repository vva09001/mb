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
  icon: 'book'
};

export const menuRoutes = {
  name: 'Menu',
  to: '/menu/list',
  exact: true,
  icon: 'plug'
};

export const settingRoutes = {
  name: 'menu.setting',
  to: '/setting',
  exact: true,
  icon: 'cog'
};

export default [homeRoutes, newRoutes, pageRoutes, emailRoutes, formRoutes, menuRoutes, settingRoutes];
