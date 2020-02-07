import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import Background from '../common/Background';
import corner1 from '../../assets/img/illustrations/corner-1.png';
import corner2 from '../../assets/img/illustrations/corner-2.png';
import corner3 from '../../assets/img/illustrations/corner-3.png';
import { useTranslation } from 'react-i18next';

const getImage = color => {
  switch (color) {
    case 'warning':
      return corner1;
    case 'info':
      return corner2;
    case 'success':
      return corner3;
    default:
      return corner1;
  }
};

const getContentClassNames = color => {
  const contentClassNames = 'display-4 fs-4 mb-2 font-weight-normal text-sans-serif cardCustom';
  if (color === 'success') return contentClassNames;
  return `${contentClassNames} text-${color}`;
};

const CardSummary = ({ linkText, to, color, loadingValue, acceptValue }) => {
  const { t } = useTranslation();
  return (
    <Card className="mb-3 overflow-hidden" style={{ maxWidth: '16rem', minWidth: '16rem' }}>
      <Background image={getImage(color)} className="bg-card" />
      <CardBody className="position-relative">
        <div className={getContentClassNames(color)}>
          <div>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className="cardItems">
            <p className="m-0">{`${t('acceptPage')} : ${loadingValue}`}</p>
            <p className="m-0">{`${t('acceptNew')} :  ${acceptValue}`}</p>
          </div>
        </div>
        <Link className="font-weight-semi-bold fs--1 text-nowrap" to={to}>
          {t(linkText)}
          <FontAwesomeIcon icon="angle-right" transform="down-1.5" className="ml-1" />
        </Link>
      </CardBody>
    </Card>
  );
};

CardSummary.propTypes = {
  loadingValue: PropTypes.number,
  acceptValue: PropTypes.number,
  linkText: PropTypes.string,
  to: PropTypes.string,
  color: PropTypes.string
};

CardSummary.defaultProps = {
  linkText: 'See all',
  to: '#!',
  color: 'primary'
};

export default CardSummary;
