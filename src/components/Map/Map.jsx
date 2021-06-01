import React from 'react'
import GoogleMapReact from 'google-map-react';
import Modal from '@material-ui/core/Modal';

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

const Map = ({
  open = false,
  onClose = () => {},
}) => {
  const defaultProps = {
    center: [13.7398994, 100.5391488],
    zoom: 12,
  };
  return (
    <Modal
      open={open}
      onClose={() => { onClose() }}
    >
      <div className="map" style={{ height: '60vh', width: '80vw', margin: 'auto', marginTop: 64 }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBPgmVVeGhksGlVPvTmClpmaKGCHoepXag' }}
          center={defaultProps.center}
          zoom={defaultProps.zoom}
        >
          <AnyReactComponent lat={13.7398994} lng={100.5391488} text={'Asok'}/>
        </GoogleMapReact>
      </div>
    </Modal>
  )
}

export default Map