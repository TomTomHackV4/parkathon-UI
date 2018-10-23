import React, { Component } from 'react'
import './map-view.css'

class MapView extends Component {
    constructor(props) {
        super(props)
        this.onLoadMap = this.onLoadMap.bind(this)

        this.map = null
    }

    componentDidMount() {
        this.createMap()
    }

    render() {
        console.log('freeParkingSpots', this.props.freeParkingSpots)
        return (<div id='map'></div>)
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

    onLoadMap() {
        // Define TT Map
        this.map = window.tomtom.L.map('map', {
            source: 'vector',
            key: 'FGnnvNpBGVusBxLf12fGiSd88coPe37Y',
            center: [52.525244, 13.332137],
            basePath: '/sdk',
            zoom: 15
        })

        this.map.locate({setView: true, maxZoom: 15})
        this.map.on('locationfound', (evt) => {
            window.tomtom.L.marker(evt.latlng, {
                title:'Your position',
                icon: window.tomtom.L.icon({
                    iconUrl:'icon.png',
                    iconSize:[32,32]
                })
            }).addTo(this.map)
        }, this)
        this.map.on('locationerror', () => {
            window.tomtom.messageBox({closeAfter:5000})
                .setContent('Could not locate you')
                .openOn(this.map)
        }, this)

        const myIcon = window.tomtom.L.icon({
            iconUrl: 'icon.png',
            iconSize: [50, 50],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        })

        this.props.freeParkingSpots.forEach((object) => {
            const { latitude, longitude } = object
            console.log('Latitude, longitude', [latitude, longitude])
            window.tomtom.L.marker([latitude, longitude], { icon: myIcon }).addTo(this.map)
        })

        // const locations =  [ [52.525244, 13.332137], [52.535244, 13.332137]]
        // const currentMap = this.map

        // this.drawRoute(locations[0], locations[1], currentMap)

    }

    createMap() {
        const script = document.createElement('script')
        script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js'
        document.body.appendChild(script)
        script.async = true
        script.onload = this.onLoadMap
    }
}

export default MapView