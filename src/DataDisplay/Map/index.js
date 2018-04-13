import React from 'react'
import GoogleMapReact from 'google-map-react'
// import styled from 'styled-components'



class SimpleMap extends React.Component {

  renderMarkers(map, maps) {

    return new maps.Marker({
      position:{
        lat: this.props.lat,
        lng: this.props.lng
      },
      map,
      title: this.props.name
    });
  }

  render() {

    return (

       <GoogleMapReact
        google={this.props.google}
        // bootstrapURLKeys={{ key: 'AIzaSyChyTQR99XFwMy--qCA5X5AU4HrkQK_hVw' }}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
        layerTypes={['TrafficLayer']}
        defaultCenter={{
          lat: this.props.lat,
          lng: this.props.lng
        }}
        onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals={true}
      >

      </GoogleMapReact>
    );
  }
}

export default SimpleMap;
