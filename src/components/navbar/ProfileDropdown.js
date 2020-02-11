import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import Avatar from '../common/Avatar';
import team3 from '../../assets/img/team/3.jpg';
import { AuthActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Proptype = {
  logout: Proptypes.func
};

const ProfileDropdown = ({ logout }) => {
  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav className="pr-0">
        <Avatar src={team3} />
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-card">
        <div className="bg-white rounded-soft py-2">
          <DropdownItem href="#!">Set status</DropdownItem>
          <DropdownItem tag={Link} to="/users/profile">
            Profile &amp; account
          </DropdownItem>
          <DropdownItem href="#!">Feedback</DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/settings">
            Settings
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to="/authentication/login"
            onClick={() => {
              logout();
              window.location.reload();
            }}
          >
            Logout
          </DropdownItem>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

ProfileDropdown.propTypes = Proptype;

const mapDispatchToProps = {
  logout: AuthActions.logout
};

export default connect(
  null,
  mapDispatchToProps
)(ProfileDropdown);
