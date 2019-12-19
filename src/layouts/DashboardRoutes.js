import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Activity from '../container/News';
import NewsCreate from '../container/News/Created';
import NewsEdit from '../container/News/Edit';
import Category from 'container/News/Category';
import ListPage from '../container/Pages';
import PagesCreate from '../container/Pages/Created';
import PageEdit from '../container/Pages/Edit';
import ApprPage from '../container/Pages/ApprovedPage';
import PageAppr from '../container/Pages/ApprovedPage/Edit';
import Block from 'container/block';
import CreateBlock from 'container/block/created';
import Tags from 'container/tags';
import AprrEdit from '../container/ApprovingNews/Approving';
import AprrNews from '../container/ApprovingNews';
import ListMail from '../container/Mails';
import MailsCreate from '../container/Mails/Created';
import MailEdit from '../container/Mails/Edit';
import ListFormBuilder from 'container/formbuilder';
import CreatedFormBuilder from 'container/formbuilder/created';
import EditFormBuilder from 'container/formbuilder/edit';
import ListMenus from 'container/Menu';
import CreateMenus from 'container/Menu/Create';
import CreateMenusItem from 'container/Menu/CreateItem';
import EditMenus from 'container/Menu/Edit';
import SettingHome from 'container/SettingHome/index';

const DashboardRoutes = () => (
  <Switch>
    <Route path="/news/list" exact component={Activity} />
    <Route path="/news/create" exact component={NewsCreate} />
    <Route path="/news/edit" exact component={NewsEdit} />
    <Route path="/news/category" component={Category} />
    <Route path="/news/approved_listings" exact component={AprrNews} />
    <Route path="/news/approving" exact component={AprrEdit} />

    <Route path="/pages/list" exact component={ListPage} />
    <Route path="/pages/create" exact component={PagesCreate} />
    <Route path="/pages/edit" exact component={PageEdit} />
    <Route path="/pages/approved_listings" exact component={ApprPage} />
    <Route path="/pages/approved" exact component={PageAppr} />
    <Route path="/pages/block" exact component={Block} />
    <Route path="/pages/block/create" exact component={CreateBlock} />
    <Route path="/pages/tags" exact component={Tags} />

    {/*Email*/}
    <Route path="/emails/list" exact component={ListMail} />
    <Route path="/emails/create" exact component={MailsCreate} />
    <Route path="/emails/edit" exact component={MailEdit} />

    {/* Setting */}
    <Route path="/setting" exact component={SettingHome} />

    {/*Menu*/}
    <Route path="/menu/list" exact component={ListMenus} />
    <Route path="/menu/create" exact component={CreateMenus} />
    <Route path="/menu/edit" exact component={EditMenus} />
    <Route path="/menu/edit/item" exact component={CreateMenusItem} />
    {/*Components*/}
    <Route path="/form-builder/list" exact component={ListFormBuilder} />
    <Route path="/form-builder/create" exact component={CreatedFormBuilder} />
    <Route path="/form-builder/edit" exact component={EditFormBuilder} />

    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

export default DashboardRoutes;
