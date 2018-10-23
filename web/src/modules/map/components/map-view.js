import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import './map-view.css';
import ParkingPopup from  './parking-popup';

class MapView extends Component {

    constructor(props) {
      super(props)
      this.onLoadMap = this.onLoadMap.bind(this)
      this.onClickPopup = this.onClickPopup.bind(this)
      this.map = null;
    }

    componentDidMount() {
         const script = document.createElement('script');
         script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
         document.body.appendChild(script);
         script.async = true;
         script.onload = this.onLoadMap
    }

    onClickPopup(){
      console.log("Clicked")
    }

    drawRoute(start, finish){
      var that = this
      var routeBackgroundWeight = 12;
      var routeWeight = 9;
          
      window.tomtom.routing().locations([start, finish]).go().then(function (routeJson) {
        var route = [];
        route[0] = window.tomtom.L.geoJson(routeJson, {
          style: {
            color: 'black',
            weight: routeBackgroundWeight
          }
        }).addTo(that.map);
        route[1] = window.tomtom.L.geoJson(routeJson, {
          style: {
            color: 'green',
            weight: routeWeight
          }
        }).addTo(that.map);
      });
    }   

    render() {
      return <div id = 'map'></div>
    }

    onLoadMap () {
      this.map = window.tomtom.L.map('map', {
          source: 'vector',
          key: 'FGnnvNpBGVusBxLf12fGiSd88coPe37Y',
          center: [52.525244, 13.332137],
          basePath: '/sdk',
          zoom: 15
        });
      
      var myIcon = window.tomtom.L.icon({
        iconUrl: 'icon.png',
        iconSize: [50, 50],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
      });
        
      this.props.freeParkingSpots.forEach(({latitude, longitude}) => {
        var marker = window.tomtom.L.marker([latitude, longitude], {icon: myIcon}).addTo(this.map);
        marker.bindPopup(ReactDOMServer.renderToString(
          <ParkingPopup latitude={latitude} longitude={longitude} onClick={this.onClickPopup} />
        ))
      })
  
      var locations =  [ [52.525244, 13.332137], [52.535244, 13.332137]]
      
      this.drawRoute(locations[0], locations[1])
    }

    
}

export default MapView;