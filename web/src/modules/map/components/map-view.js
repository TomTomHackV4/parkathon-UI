import React, { Component } from 'react'
import './map-view.css'

class MapView extends Component {
    constructor(props) {
        super(props)
        this.onLoadMap = this.onLoadMap.bind(this)
        this.updateMap = this.updateMap.bind(this)

        this.map = null
        this.navigate = true
        this.routeCordinates = null
        this.destination = [52.535244, 13.332137]
        this.routeOnMapView = null
    }

    componentDidMount() {
      this.createMap()

      if(this.navigate){
        setInterval(() => this.setState({ time:
          this.updateMap()
        }), 500)
      }
    }

    updateMap(){
      if(this.routeOnMapView === null){
        return
      }
      if(this.routeCordinates === null ||
        this.routeCordinates.length === 1){
        return
      }
      this.routeCordinates.shift()
      var startPoint = [this.routeCordinates[0][1], this.routeCordinates[0][0]]

      console.log(startPoint)

      this.routeOnMapView.draw([startPoint, this.destination])

      this.map.setMaxZoom(15)
      this.map.setZoom(15)
    }

    render() {
        console.log('freeParkingSpots', this.props.freeParkingSpots)
        return (<div id='map'></div>)
    }

    drawRoute(start, finish){
      window.tomtom.routing().locations([start, finish]).go().then((routeJson) => {
        this.routeCordinates = routeJson.features[0].geometry.coordinates
      });

      var routeOnMapView = window.tomtom.routeOnMap(
        {
          generalMarker: {icon: null}
        }
      ).addTo(this.map);
      routeOnMapView.draw([start, finish]);
      this.routeOnMapView = routeOnMapView
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
            zoom: 15,
            zoomAnimation: false,
            fadeAnimation: false,
            markerZoomAnimation: false
        })

        this.map.setMinZoom(15)

        this.map.locate({setView: true, maxZoom: 15})

        this.map.on('locationfound', (evt) => {
            window.tomtom.L.marker(evt.latlng, {
                title:'Your position',
                icon: window.tomtom.L.icon({
                    iconUrl:'user.png',
                    iconSize:[32,32]
                })
            }).addTo(this.map)
            this.drawRoute(evt.latlng, this.destination)
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