import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import './New.css';

const New = ({ imgSrc, title, description, to }) => (
  <Row className="list_news__item">
    <Col sm={3}>
      <img className="mr-2" src={imgSrc} alt={title} />
    </Col>
    <Col sm={9}>
      <h6 className="fs-0 mb-0">
        <Link className="stretched-link" to={to}>
          {title}
        </Link>
      </h6>
      <p className="mb-0">{description}</p>
    </Col>
  </Row>
);

New.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default New;
