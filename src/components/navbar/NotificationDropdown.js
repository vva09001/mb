import React, { useState } from 'react';
import { Card, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import ListGroup from 'reactstrap/es/ListGroup';
import ListGroupItem from 'reactstrap/es/ListGroupItem';
import Notification from '../notification/Notification';
import { isIterableArray } from '../../helpers/utils';
import { rawNewNotifications } from '../../data/notification/notification';
import i18n from 'i18next';
import { setLang } from 'helpers/localStorage';
import useFakeFetch from '../../hooks/useFakeFetch';

const NotificationDropdown = () => {
  // State
  const { data: newNotifications } = useFakeFetch(rawNewNotifications);
  const [isOpen, setIsOpen] = useState(false);

  // Handler
  const handleToggle = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const changeLang = lang => {
    i18n.changeLanguage(lang);
    setLang(lang);
  };
  return (
    <Dropdown nav inNavbar isOpen={isOpen} toggle={handleToggle}>
      <DropdownToggle nav className=" px-0">
        <FontAwesomeIcon icon={faGlobe} transform="shrink-6" className="fs-4" />
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-card">
        <Card className="card-notification shadow-none" style={{ maxWidth: '20rem' }}>
          <ListGroup flush className="font-weight-normal fs--1">
            {isIterableArray(newNotifications) &&
              newNotifications.map((notification, index) => (
                <ListGroupItem key={index} onClick={handleToggle}>
                  <Notification {...notification} flush setLang={lang => changeLang(lang)} />
                </ListGroupItem>
              ))}
          </ListGroup>
        </Card>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationDropdown;
