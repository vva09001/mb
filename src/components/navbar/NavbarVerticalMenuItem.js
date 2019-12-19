import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';

const NavbarVerticalMenuItem = ({ route }) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex align-items-center">
      {route.icon && (
        <span className="nav-link-icon">
          <FontAwesomeIcon icon={route.icon} />
        </span>
      )}
      <span>{t(route.name)}</span>
      {!!route.badge && (
        <Badge color={route.badge.color || 'soft-success'} pill className="ml-2">
          {route.badge.text}
        </Badge>
      )}
    </div>
  );
};

NavbarVerticalMenuItem.propTypes = {
  route: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    name: PropTypes.string.isRequired,
    badge: PropTypes.object
  }).isRequired
};

export default NavbarVerticalMenuItem;
