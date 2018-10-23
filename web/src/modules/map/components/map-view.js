import React, { Component } from 'react';
import './map-view.css';

class MapView extends Component {

    constructor(props){
        super(props)
        this.map = null
        this.displayPosition = this.displayPosition.bind(this)
        this.showLocationError = this.showLocationError.bind(this)
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
        document.body.appendChild(script);
        script.async = true;
        script.onload = function () {
            this.map = window.tomtom.L.map('map', {
                source: 'vector',
                key: 'FGnnvNpBGVusBxLf12fGiSd88coPe37Y',
                center: [52.525244, 13.332137],
                basePath: '/sdk',
                zoom: 15
            });
            this.map.locate({setView: true, maxZoom: 15});
            this.map.on('locationfound', (evt) => {
                window.tomtom.L.marker(evt.latlng, {
                    title:'You are here',
                    icon: window.tomtom.L.icon({
                        iconUrl:'sports-car.png',
                        iconSize:[16,16]
                    })
                }).addTo(this.map)
            }, this)
            this.map.on('locationerror', () => {
                window.tomtom.messageBox({closeAfter:5000})
                    .setContent('Could not locate you')
                    .openOn(this.map)
            }, this)
        }
    }

    displayPosition(evt) {
        window.tomtom.L.marker(evt.latlng, {
            title:'You are here',
            icon: window.tomtom.L.icon({
                iconUrl:'sports-car.png',
                iconSize:[16,16]
            })
        }).addTo(this.map)
    }

    showLocationError() {
        window.tomtom.messageBox({closeAfter:5000})
            .setContent('Could not locate you')
            .openOn(this.map)
    }

    render() {
        return <div id = 'map'></div>
    }
}

export default MapView;