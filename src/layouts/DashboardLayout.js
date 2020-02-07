import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'container/dashboard/';
import NavbarTop from '../components/navbar/NavbarTop';
import NavbarVertical from '../components/navbar/NavbarVertical';

import loadable from '@loadable/component';
const DashboardRoutes = loadable(() => import('./DashboardRoutes'));

const DashboardLayout = ({ location }) => {
  useEffect(() => {
    DashboardRoutes.preload();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // check thay đổi user
  return (
    <div className="container-fluid">
      <NavbarVertical />
      <div className="content">
        <NavbarTop />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <DashboardRoutes />
        </Switch>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = { location: PropTypes.object.isRequired };

export default DashboardLayout;
