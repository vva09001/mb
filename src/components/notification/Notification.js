import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from '../common/Avatar';
import createMarkup from '../../helpers/createMarkup';

const Notification = ({ to, avatar, time, className, unread, flush, emoji, children, setLang, lang }) => (
  <div
    className={classNames('notification', { unread, 'notification-flush': flush }, className)}
    onClick={() => setLang(lang)}
  >
    {avatar && (
      <div className="notification-avatar">
        <Avatar {...avatar} className="mr-3" />
      </div>
    )}
    <div className="notification-body" style={{ cursor: 'pointer' }}>
      <p className={emoji ? 'mb-1' : 'mb-0'} dangerouslySetInnerHTML={createMarkup(children)} />
    </div>
  </div>
);

Notification.propTypes = {
  to: PropTypes.string,
  avatar: PropTypes.shape(Avatar.propTypes),
  time: PropTypes.string,
  className: PropTypes.string,
  unread: PropTypes.bool,
  flush: PropTypes.bool,
  emoji: PropTypes.string,
  lang: PropTypes.string,
  children: PropTypes.node,
  setLang: PropTypes.func
};

Notification.defaultProps = { unread: false, flush: false };

export default Notification;
