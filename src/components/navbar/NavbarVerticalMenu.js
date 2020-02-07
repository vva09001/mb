import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Nav, NavItem } from 'reactstrap';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { map } from 'lodash';
import NavbarVerticalMenuItem from './NavbarVerticalMenuItem';

const NavbarVerticalMenu = ({ routes, location, handleNavbarVerticalCollapse }) => {
  const [opened, setOpened] = useState(null);
  useEffect(() => {
    let openedDropdown = null;
    routes.forEach((route, index) => {
      if (location.pathname.indexOf(route.to) === 0) openedDropdown = index;
    });

    setOpened(openedDropdown);
    // eslint-disable-next-line
  }, []);

  const toggleOpened = (e, index) => {
    e.preventDefault();
    return setOpened(opened === index ? null : index);
  };

  return map(routes, (route, index) => {
    if (!route.children && route.permission) {
      return (
        <NavItem key={index}>
          <NavLink className="nav-link" {...route} onClick={handleNavbarVerticalCollapse}>
            <NavbarVerticalMenuItem route={route} />
          </NavLink>
        </NavItem>
      );
    }
    if (route.permission) {
      return (
        <NavItem key={index}>
          <Link
            to="#!"
            onClick={e => toggleOpened(e, index)}
            className="nav-link dropdown-indicator"
            aria-expanded={opened === index}
          >
            <NavbarVerticalMenuItem route={route} />
          </Link>
          <Collapse isOpen={opened === index}>
            <Nav>
              <NavbarVerticalMenu
                routes={route.children}
                location={location}
                handleNavbarVerticalCollapse={handleNavbarVerticalCollapse}
              />
            </Nav>
          </Collapse>
        </NavItem>
      );
    }
  });
};

NavbarVerticalMenu.propTypes = {
  routes: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(NavbarVerticalMenu);
