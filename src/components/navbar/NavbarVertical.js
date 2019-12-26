import React, { useContext } from 'react';
import { Collapse, Nav, Navbar } from 'reactstrap';
import { navbarBreakPoint } from '../../config';
import Logo from './Logo';
import routes from '../../routes';
import NavbarVerticalMenu from './NavbarVerticalMenu';
import AppContext from '../../context/AppContext';

const isBurgerMenuShown = () => {
  const burgerMenu = document.getElementById('burgerMenu');
  return !(getComputedStyle(burgerMenu).display === 'none');
};

const NavbarVertical = () => {
  const { showBurgerMenu, setShowBurgerMenu } = useContext(AppContext);

  const handleNavbarVerticalCollapse = () => isBurgerMenuShown() && setShowBurgerMenu(!showBurgerMenu);

  return (
    <Navbar expand={navbarBreakPoint} className="navbar-vertical navbar-glass" light>
      <Logo at="navbar-vertical" width={40} />
      <Collapse navbar isOpen={showBurgerMenu}>
        <Nav navbar vertical>
          <NavbarVerticalMenu routes={routes} handleNavbarVerticalCollapse={handleNavbarVerticalCollapse} />
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarVertical;
