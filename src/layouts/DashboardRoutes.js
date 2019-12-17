import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Activity from '../container/News';
import NewsCreate from '../container/News/Created';
import NewsEdit from '../container/News/Edit';
import Category from 'container/News/Category';
import ListPage from '../container/Pages';
import PagesCreate from '../container/Pages/Created';
import PageEdit from '../container/Pages/Edit';
import AprrEdit from '../container/ApprovingNews/Approving';
import AprrNews from '../container/ApprovingNews';
import ListMail from '../container/Mails';
import MailsCreate from '../container/Mails/Created';
import MailEdit from '../container/Mails/Edit';
import GettingStarted from '../components/documentation/GettingStarted';
import ListFormBuilder from 'container/formbuilder';
import CreatedFormBuilder from 'container/formbuilder/created';
import EditFormBuilder from 'container/formbuilder/edit';
import ListMenus from 'container/Menu';
import Borders from '../components/utilities/Borders';
import Clearfix from '../components/utilities/Clearfix';
import CloseIcon from '../components/utilities/CloseIcon';
import Colors from '../components/utilities/Colors';
import Display from '../components/utilities/Display';
import Embed from '../components/utilities/Embed';
import Figures from '../components/utilities/Figures';
import Flex from '../components/utilities/Flex';
import Grid from '../components/utilities/Grid';
import Sizing from '../components/utilities/Sizing';
import Spacing from '../components/utilities/Spacing';
import StretchedLink from '../components/utilities/StretchedLink';
import Typography from '../components/utilities/Typography';
import VerticalAlign from '../components/utilities/VerticalAlign';
import Visibility from '../components/utilities/Visibility';
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

    {/*Email*/}
    <Route path="/emails/list" exact component={ListMail} />
    <Route path="/emails/create" exact component={MailsCreate} />
    <Route path="/emails/edit" exact component={MailEdit} />

    {/*Documentation*/}
    <Route path="/documentation" exact component={GettingStarted} />

    {/*Setting*/}
    <Route path="/setting" exact component={GettingStarted} />

    {/*Menu*/}
    <Route path="/menu/list" exact component={ListMenus} />

    {/*Changelog*/}

    {/*Components*/}
    <Route path="/form-builder/list" exact component={ListFormBuilder} />
    <Route path="/form-builder/create" exact component={CreatedFormBuilder} />
    <Route path="/form-builder/edit" exact component={EditFormBuilder} />

    {/*Utilities*/}
    <Route path="/utilities/borders" exact component={Borders} />
    <Route path="/utilities/clearfix" exact component={Clearfix} />
    <Route path="/utilities/closeIcon" exact component={CloseIcon} />
    <Route path="/utilities/colors" exact component={Colors} />
    <Route path="/utilities/display" exact component={Display} />
    <Route path="/utilities/embed" exact component={Embed} />
    <Route path="/utilities/figures" exact component={Figures} />
    <Route path="/utilities/flex" exact component={Flex} />
    <Route path="/utilities/grid" exact component={Grid} />
    <Route path="/utilities/sizing" exact component={Sizing} />
    <Route path="/utilities/spacing" exact component={Spacing} />
    <Route path="/utilities/stretchedLink" exact component={StretchedLink} />
    <Route path="/utilities/typography" exact component={Typography} />
    <Route path="/utilities/verticalAlign" exact component={VerticalAlign} />
    <Route path="/utilities/visibility" exact component={Visibility} />

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

    {/* Setting */}
    <Route path="/setting" exact component={SettingHome} />

    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

export default DashboardRoutes;
