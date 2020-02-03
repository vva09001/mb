import React, { useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, NavItem, Nav } from 'reactstrap';
import AppContext from '../../context/AppContext';
import Logo from './Logo';
import SearchBox from './SearchBox';
import ProfileDropdown from './ProfileDropdown';
import NotificationDropdown from './NotificationDropdown';
import { useTranslation } from 'react-i18next';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
var jwt = require('jsonwebtoken');

const Proptype = {
  profile: Proptypes.object
};

const NavbarTop = ({ profile }) => {
  const token = profile.token;
  const decode = jwt.decode(token);
  const { t } = useTranslation();
  const { showBurgerMenu, setShowBurgerMenu } = useContext(AppContext);
  return (
    <Navbar light className="navbar-glass fs--1 font-weight-semi-bold row navbar-top sticky-kit" expand>
      <NavbarToggler onClick={() => setShowBurgerMenu(!showBurgerMenu)} id="burgerMenu" />
      <Logo at="navbar-top" id="topLogo" />
      <Collapse navbar>
        <Nav navbar className="align-items-center d-none d-lg-block">
          <NavItem>
            <SearchBox />
          </NavItem>
        </Nav>

        <Nav navbar className="align-items-center ml-auto">
          <span>
            {t('hello')}, {decode.sub}
          </span>
          <NotificationDropdown />
          <ProfileDropdown />
        </Nav>
      </Collapse>
    </Navbar>
  );
};

NavbarTop.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    profile: state.AuthReducer.profile
  };
};
export default connect(
  mapStateToProps,
  null
)(NavbarTop);
