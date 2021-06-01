import React from 'react'
import GoogleMapReact from 'google-map-react';
import Modal from '@material-ui/core/Modal';

import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import './Map.scss'

const LocationPin = ({ text }) => {
  return (
    <Grid className="location-pickup" container direction="column">
      <div style={{ color: 'white', fontSize: 12, backgroundColor: '#ff9000', textAlign: 'center', borderRadius: 3, padding: '2px 4px', fontWeight: '700' }}>{text}</div>
      <Icon style={{ color: '#ff9000', fontSize: 24 }}>place</Icon>
    </Grid>
  )
}

const Map = ({
  data = [],
  open = false,
  onClose = () => {},
  style = {},
}) => {
  const defaultProps = {
    center: [13.7398994, 100.5391488],
    zoom: 14,
  };
  console.log(data)
  return (
    <Modal
      open={open}
      onClose={() => { onClose() }}
    >
      <div className="map" style={{ ...style }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBPgmVVeGhksGlVPvTmClpmaKGCHoepXag' }}
          center={defaultProps.center}
          zoom={defaultProps.zoom}
        >
          {data.map((location) => {
            return (
              <LocationPin key={location.id} lat={location.lat} lng={location.long} text={location.name}/>
            )
          })}
        </GoogleMapReact>
      </div>
    </Modal>
  )
}

export default Map