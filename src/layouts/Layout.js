import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';
import DashboardLayout from './DashboardLayout';
import { PrivateRoute } from 'helpers/PrivateRoute';
import ErrorLayout from './ErrorLayout';
import history from 'helpers/history';
import loadable from '@loadable/component';
const AuthBasicLayout = loadable(() => import('./AuthBasicLayout'));
const Landing = loadable(() => import('../components/landing/Landing'));

const Layout = () => {
  useEffect(() => {
    AuthBasicLayout.preload();
    Landing.preload();
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <Route path="/landing" exact component={Landing} />
        <Route path="/authentication/" component={AuthBasicLayout} />
        <Route path="/errors" component={ErrorLayout} />
        <PrivateRoute component={DashboardLayout} />
      </Switch>
      <ToastContainer transition={Fade} closeButton={<CloseButton />} position={toast.POSITION.BOTTOM_LEFT} />
    </Router>
  );
};

export default Layout;
