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
import EditBlock from 'container/block/edit';
import Tags from 'container/tags';
import CreateTags from 'container/tags/created';
import EditTags from 'container/tags/edit';
import AprrEdit from '../container/ApprovingNews/Approving';
import AprrNews from '../container/ApprovingNews';
import ListMail from '../container/Mails';
import MailsCreate from '../container/Mails/Created';
import MailEdit from '../container/Mails/Edit';
import ListFormBuilder from 'container/formbuilder';
import CreatedFormBuilder from 'container/formbuilder/created';
import EditFormBuilder from 'container/formbuilder/edit';
import Resemail from 'container/formbuilder/reponsivemail/index';
import Formdata from 'container/formbuilder/formdata/index';
import Embeded from 'container/formbuilder/emmbedform/index';
import SettingHome from 'container/SettingHome/index';
// import Storefont from '../container/Storefont';
// import Slider from '../container/Slider';
// import SliderCreate from '../container/Slider/Created';
// import SliderEdit from 'container/Slider/edit';
import ListMenus from 'container/Menu';
import CreateMenus from 'container/Menu/Create';
import CreateMenusItem from 'container/Menu/CreateItem';
import EditMenusItem from 'container/Menu/EditItem';
import EditMenus from 'container/Menu/Edit';
import ListUsers from 'container/Users';
import UsersCreate from 'container/Users/Create';
import UsersEdit from 'container/Users/Edit';
import ListRoles from 'container/Users/Roles';
import RolesCreate from 'container/Users/Roles/Create';
import RolesEdit from 'container/Users/Roles/Edit';
import Media from 'container/media';
import Network from '../container/Network';
import NetworkCreate from '../container/Network/Create';
import NetworkDetail from '../container/Network/Detail';
import ToolMenu from 'container/InterestRate/index';
import DeleteFiles from 'container/media/deleteFiles';
import ListExchangeRate from 'container/exchangeRate';
import ExChangeRateCreate from 'container/exchangeRate/create';
import ListGroup from 'container/group';
import CreateGroup from 'container/group/create';
import EditGroup from 'container/group/edit';
import ExChangeRateEdit from 'container/exchangeRate/edit';
import ApprDashboard from 'container/dashboard/Appr';

import BlockElemnt from 'container/blockElement';
import BlockElemntEdit from 'container/blockElement/Edit';

const DashboardRoutes = () => (
  <Switch>
    <Route path="/appr/:id" exact component={ApprDashboard} />

    <Route path="/news/list" exact component={Activity} />
    <Route path="/news/create" exact component={NewsCreate} />
    <Route path="/news/edit/:id" exact component={NewsEdit} />
    <Route path="/news/category" component={Category} />
    <Route path="/news/approved_listings" exact component={AprrNews} />
    <Route path="/news/approving/:id" exact component={AprrEdit} />
    <Route path="/pages/list" exact component={ListPage} />
    <Route path="/pages/create/:id" exact component={BlockElemnt} />
    <Route path="/pages/edit/:id" exact component={BlockElemntEdit} />
    <Route path="/pages/approved_listings" exact component={ApprPage} />
    <Route path="/pages/approved/:id" exact component={PageAppr} />
    <Route path="/pages/block" exact component={Block} />
    <Route path="/pages/block/create" exact component={CreateBlock} />
    <Route path="/pages/block/edit" exact component={EditBlock} />
    <Route path="/pages/tags" exact component={Tags} />
    <Route path="/pages/tags/create" exact component={CreateTags} />
    <Route path="/pages/tags/edit/:id" exact component={EditTags} />

    {/*Email*/}
    <Route path="/emails/list" exact component={ListMail} />
    <Route path="/emails/create" exact component={MailsCreate} />
    <Route path="/emails/edit/:id" exact component={MailEdit} />

    {/*Components*/}
    <Route path="/form-builder/list" exact component={ListFormBuilder} />
    <Route path="/form-builder/create" exact component={CreatedFormBuilder} />
    <Route path="/form-builder/edit/:id" exact component={EditFormBuilder} />
    <Route path="/form-builder/:id/rely" exact component={Resemail} />
    <Route path="/form-builder/:id/formdata" exact component={Formdata} />
    <Route path="/form-builder/:id/emmbed" exact component={Embeded} />

    {/* Setting */}
    <Route path="/setting" exact component={SettingHome} />

    {/* Storefont */}

    {/* User */}
    <Route path="/users/list" exact component={ListUsers} />
    <Route path="/users/create" exact component={UsersCreate} />
    <Route path="/users/edit/:id" exact component={UsersEdit} />
    <Route path="/users/listrole" exact component={ListRoles} />
    <Route path="/users/listrole/create" exact component={RolesCreate} />
    <Route path="/users/listrole/edit/:id" exact component={RolesEdit} />
    {/*Menu*/}
    <Route path="/menu/list" exact component={ListMenus} />
    <Route path="/menu/create" exact component={CreateMenus} />
    <Route path="/menu/edit" exact component={EditMenus} />
    <Route path="/menu/edit/item" exact component={CreateMenusItem} />
    <Route path="/menu/edit/item/edit" exact component={EditMenusItem} />

    {/* <Route path="/storefont" exact component={Storefont} /> */}

    {/* Slider */}
    {/* <Route path="/slider" exact component={Slider} />
    <Route path="/slider/create" exact component={SliderCreate} />
    <Route path="/slider/edit/:id" exact component={SliderEdit} /> */}

    {/* Network */}
    <Route path="/network" exact component={Network} />
    <Route path="/network/create" exact component={NetworkCreate} />
    <Route path="/network/detail/:id" exact component={NetworkDetail} />

    <Route path="/media" exact component={Media} />
    <Route path="/media/deleteFiles" exact component={DeleteFiles} />

    {/*toolMenu*/}
    <Route path="/interest-rate" exact component={ToolMenu} />
    <Route path="/exchangeRate" exact component={ListExchangeRate} />
    <Route path="/exchangeRate/create" exact component={ExChangeRateCreate} />
    <Route path="/exchangeRate/edit" exact component={ExChangeRateEdit} />

    {/* Group */}
    <Route path="/group" exact component={ListGroup} />
    <Route path="/group/create" exact component={CreateGroup} />
    <Route path="/group/edit/:id" exact component={EditGroup} />

    <Route path="/block" exact component={BlockElemnt} />
    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

export default DashboardRoutes;
