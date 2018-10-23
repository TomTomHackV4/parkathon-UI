import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import './map-view.css';
import ParkingPopup from  './parking-popup';

class MapView extends Component {

    constructor(props) {
      super(props)
      this.onLoadMap = this.onLoadMap.bind(this)
      this.map = null;
    }

    componentDidMount() {
         const script = document.createElement('script');
         script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
         document.body.appendChild(script);
         script.async = true;
         script.onload = this.onLoadMap
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
            marker.bindPopup(ReactDOMServer.renderToString(<ParkingPopup />))
          })
      
       }
}

export default MapView;