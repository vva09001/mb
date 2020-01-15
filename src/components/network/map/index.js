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

  const googleMap = useGoogleMap(API_KEY);
  const mapContainerRef = useRef(null);
  var initialConfig = {
    zoom: 14,
    center: { lat: !detail.latitude ? 0 :  Number(detail.latitude), lng: !detail.longitude ? 0 : Number(detail.longitude) }

  };
  let map = useMap({ googleMap, mapContainerRef, initialConfig });
  if (detail.latitude && detail.latitude) {
    map.setCenter({ lat: Number(detail.latitude), lng: Number(detail.longitude) });
    const marker = new googleMap.maps.Marker({
      position: initialConfig.center,
      map: map
    });
    const InfoWindow = new googleMap.maps.InfoWindow({
      content: '<div id="content" style="size: 10px;text-align: right;">\n' +
        '                    <button id="onBtn" class="btn btn-sm">\n' +
        '                     <p>' + detail.address_name + '</p>\n' +
        '                     <p>'+ detail.address +'</p>\n' +
        '                    </button>\n' +
        '                  </div>'
    });
    marker.addListener('click', () => {
      InfoWindow.open(map, marker);
    });
  }
  return (
    <div
      style={{
        height: '100vh',
        width: '100%'
      }}
      ref={mapContainerRef}
    />);
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
