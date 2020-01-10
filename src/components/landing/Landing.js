import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

const Landing = ({ location }) => {
  useEffect(() => {
    window.location.replace('https://mb-frontend.vva0901.now.sh/');
  }, [location.pathname]);

  return <Fragment />;
};

Landing.propTypes = { location: PropTypes.object.isRequired };

export default Landing;
