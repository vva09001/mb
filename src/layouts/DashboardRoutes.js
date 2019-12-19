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
import ListUsers from 'container/Users';
import UsersCreate from 'container/Users/Create';
import UsersEdit from 'container/Users/Edit';
import ListRoles from 'container/Users/Roles';
import RolesCreate from 'container/Users/Roles/Create';
import RolesEdit from 'container/Users/Roles/Edit';
import Typed from '../components/plugins/Typed';
import ImageLightbox from '../components/plugins/ImageLightbox';
import GoogleMapExample from '../components/plugins/GoogleMap';
import Chart from '../components/plugins/Chart';
import CountUpExample from '../components/plugins/Countup';
import DatetimeExample from '../components/plugins/Datetime';
import FontAwesome from '../components/plugins/FontAwesome';
import Echarts from '../components/plugins/Echarts';
import Toastify from '../components/plugins/Toastify';
import Select from '../components/plugins/Select';
import QuillEditorExample from '../components/plugins/Quill';
import BulkSelect from '../components/plugins/BulkSelect';
import ProgressBarJs from '../components/plugins/ProgressBarJs';
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

    {/* User */}
    <Route path="/users/list" exact component={ListUsers} />
    <Route path="/users/create" exact component={UsersCreate} />
    <Route path="/users/edit" exact component={UsersEdit} />
    <Route path="/users/listrole" exact component={ListRoles} />
    <Route path="/users/listrole/create" exact component={RolesCreate} />
    <Route path="/users/listrole/edit" exact component={RolesEdit} />
    {/*Changelog*/}

    {/*Components*/}
    <Route path="/form-builder/list" exact component={ListFormBuilder} />
    <Route path="/form-builder/create" exact component={CreatedFormBuilder} />
    <Route path="/form-builder/edit" exact component={EditFormBuilder} />

    {/*Plugins*/}
    <Route path="/plugins/bulk-select" exact component={BulkSelect} />
    <Route path="/plugins/typed" exact component={Typed} />
    <Route path="/plugins/image-lightbox" exact component={ImageLightbox} />
    <Route path="/plugins/google-map" exact component={GoogleMapExample} />
    <Route path="/plugins/wysiwyg" exact component={QuillEditorExample} />
    <Route path="/plugins/chart" exact component={Chart} />
    <Route path="/plugins/countup" exact component={CountUpExample} />
    <Route path="/plugins/datetime" exact component={DatetimeExample} />
    <Route path="/plugins/fontawesome" exact component={FontAwesome} />
    <Route path="/plugins/echarts" exact component={Echarts} />
    <Route path="/plugins/toastify" exact component={Toastify} />
    <Route path="/plugins/select" exact component={Select} />
    <Route path="/plugins/progressbar" exact component={ProgressBarJs} />

    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

export default DashboardRoutes;
