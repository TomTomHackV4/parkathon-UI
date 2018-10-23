import React, { Component } from 'react';
import './map-view.css';

class MapView extends Component {
    componentDidMount() {
         const script = document.createElement('script');
         script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
         document.body.appendChild(script);
         script.async = true;
         script.onload = function () {
           window.tomtom.L.map('map', {
             source: 'vector',
             key: 'FGnnvNpBGVusBxLf12fGiSd88coPe37Y',
             center: [52.525244, 13.332137],
             basePath: '/sdk',
             zoom: 15
           });
         }
       }

       render() {
         return <div id = 'map'></div>
       }
}

export default MapView;