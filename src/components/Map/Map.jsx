import React, {useState} from 'react'
import GoogleMapReact from 'google-map-react';
import Modal from '@material-ui/core/Modal';

import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import './Map.scss'

const Location = ({
  data = {},
  onClick = () => {},
}) => {
  const [showInfo, setShowInfo] = useState(false)
  if (showInfo) {
    return (
      <Grid 
        direction="column"
        style={{
          width: 100,
          height: 60,
          backgroundColor: '#ff9000',
          borderRadius: 5,
          padding: 4,
          color: 'white',
          fontWeight: 700,
          boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        }}
      >
        <Grid item style={{ fontSize: 14 }}>{data.name}</Grid>
        <Grid item >Max Units: {data.max_dist}</Grid>
        <Grid item>Fee: {data.fee}</Grid>
        <Grid
          container
          justify="flex-end"
          style={{ fontSize: 14, cursor: 'pointer' }}
          onClick={() => { onClick() }}
        >Add</Grid>
      </Grid>
    )
  } else {
    return (
      <Grid
        className="location-pickup"
        container direction="column"
        onClick={() => {
          setShowInfo(true)
        }}
        style={{ cursor: 'pointer' }}
      >
        <div style={{ color: 'white', fontSize: 12, backgroundColor: '#ff9000', textAlign: 'center', borderRadius: 3, padding: '2px 4px', fontWeight: '700' }}>{data.name}</div>
        <Icon style={{ color: '#ff9000', fontSize: 24 }}>place</Icon>
      </Grid>
    )
  }
}

const Map = ({
  data = [],
  open = false,
  onClose = () => {},
  style = {},
  onSelect = () => {},
}) => {
  const defaultProps = {
    center: [13.7398994, 100.5391488],
    zoom: 14,
  };
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
              <Location
                key={location.id}
                lat={location.lat}
                lng={location.long}
                data={location}
                onClick={() => {
                  onClose()
                  onSelect(location)
                }}
              />
            )
          })}
        </GoogleMapReact>
      </div>
    </Modal>
  )
}

export default Map