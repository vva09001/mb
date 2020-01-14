import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useGoogleMap, useMap } from '../map/hooks.js';
import { useParams } from 'react-router-dom';
import { NetworkActions } from '../../../store/actions';
import { connect } from 'react-redux';
const API_KEY = '';

const PropsType = {
  detail: PropTypes.object,
  getNetworkId: PropTypes.func
};
const Gmap = ({ detail, getNetworkId }) => {
  let { id } = useParams();
  useEffect(() => {
    getNetworkId(id);
  }, [getNetworkId, id]);

  // let lattide = detail.latitude;
  // let lngtide = detail.longitude;

  var initialConfig = {
    zoom: 14,
    center: { lat: 16.051119, lng: 108.20571 } // lat: 16.051119, lng: 108.205710
  };

  const googleMap = useGoogleMap(API_KEY);
  const mapContainerRef = useRef(null);
  useMap({ googleMap, mapContainerRef, initialConfig });
  return (
    <div
      style={{
        height: '100vh',
        width: '100%'
      }}
      ref={mapContainerRef}
    />
  );
};

Gmap.propTypes = PropsType;

const mapStateToProps = state => {
  return { detail: state.NetworkReducer.detail };
};

const mapDispatchToProps = {
  aprrNetwork: NetworkActions.AprrNetwork,
  getNetworkId: NetworkActions.getByNetworkId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gmap);
