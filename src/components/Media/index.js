import React from 'react';

import PropTypes from 'prop-types';
import Img from 'react-image';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
const PropsTypes = {
  detail: PropTypes.object
};

function MediaDetail({ detail }) {
  return (
    <React.Fragment>
      <div>
        <h4>{detail.name}</h4>
        <Row>
          <Col lg={9} md={8}>
            <Img src={detail.url} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

MediaDetail.propTypes = PropsTypes;

const mapStateToProps = state => {
  return {
    detail: state.MediaReducer.detail
  };
};

export default connect(
  mapStateToProps,
  null
)(MediaDetail);
