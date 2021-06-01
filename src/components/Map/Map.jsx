import React from 'react'
import GoogleMapReact from 'google-map-react';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import './Map.scss'

const AnyReactComponent = ({ text }) => {
  return (
    <Grid className="location-pickup" container direction="column">
      <div style={{ color: '#ff9000' }}>Asok</div>
      <Icon style={{ color: '#ff9000', fontSize: 24 }}>place</Icon>
    </Grid>
  )
}

const Map = () => {
  const defaultProps = {
    center: [13.7398994, 100.5391488],
    zoom: 12,
  };
  return (
    <div className="map" style={{ height: '500px', width: '500px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBPgmVVeGhksGlVPvTmClpmaKGCHoepXag' }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={13.7398994} lng={100.5391488} text={'Asok'}/>
      </GoogleMapReact>
    </div>
  )
}

export default Map