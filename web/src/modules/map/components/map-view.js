import React, { Component } from 'react'
import './map-view.css'

class MapView extends Component {
    constructor(props) {
        super(props)
        console.log('MapView Constructor', this.props)
        this.onLoadMap = this.onLoadMap.bind(this)
        this.updateMap = this.updateMap.bind(this)
        this.parseDestination = this.parseDestination.bind(this)
        this.fetchAndPrintMap = this.fetchAndPrintMap.bind(this)

        this.map = null
        this.navigate = false
        this.routeCordinates = null
        this.parseDestination()
        this.routeOnMapView = null
    }

    componentDidMount() {
        console.log('MapView componentDidMount', this.props)
        this.fetchAndPrintMap()
    }

    componentDidUpdate() {
        console.log('MapView componentDidUpdate', this.props)
        this.fetchAndPrintMap()
    }

    render() {
        console.log('freeParkingSpots', this.props.freeParkingSpots)
        return (<div id='map'></div>)
    }

    parseDestination() {
        if (this.props.destinationMarker) {
            const { latitude, longitude } = this.props.destinationMarker
            this.destination = {lat: latitude, lng: longitude}
        }
        else {
            this.destination = null
        }
    }

    fetchAndPrintMap() {
        this.parseDestination()
        this.createMap()

        if(this.navigate && this.destination){
            setInterval(() => this.setState({ time:
                this.updateMap()
            }), 500)
        }
    }

    createMap() {
        const script = document.createElement('script')
        script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js'
        document.body.appendChild(script)
        script.async = true
        script.onload = this.onLoadMap
    }

    onLoadMap() {
        // Define TT Map
        this.map = this.map
            ? this.map
            : window.tomtom.L.map('map', {
                source: 'vector',
                // key: 'FGnnvNpBGVusBxLf12fGiSd88coPe37Y', // PARKATHON
                // key: 'AwXNJrFOUApkdmvv1GTZLI4KrI7KozIz', // PARKATHON2
                key: 'sgqShnAhoEUi2DZq1UGH6GxzNU1IAqHG', // PARKATHONV4
                center: [52.525244, 13.332137],
                basePath: '/sdk',
                zoom: 15,
                zoomAnimation: false,
                fadeAnimation: false,
                markerZoomAnimation: false
            })

        this.map.locate({setView: true, maxZoom: 15})

        this.map.on('locationfound', (evt) => {
        debugger
            console.log('evt: ', evt)
            // Prints current user position
            window.tomtom.L.marker(evt.latlng, {
                title:'Your position',
                //icon: window.tomtom.L.icon({
                //    iconUrl:'icon.png',
                //   iconSize:[32,32]
                //})
                icon:new window.tomtom.L.Icon.Default()

            }).addTo(this.map)

            // Prints route of user on map
            if (this.destination)
            {
                console.log('DRAW EVENT', evt.latlng, this.destination)
                this.drawRoute([evt.latlng.lat, evt.latlng.lng], [52.5177350, 13.3396140])
                // this.drawRoute([evt.latlng.lat, evt.latlng.lng], [this.destination.lat, this.destination.lng])
            }
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
            window.tomtom.L.marker([latitude, longitude], { icon: myIcon })
                .on('click', () => this.props.onMarkerClicked({latitude: latitude, longitude: longitude}))
                .addTo(this.map)
        })
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

    drawRoute(start, finish){
        debugger
      /*window.tomtom.routing().locations([start, finish]).go().then((routeJson) => {
        this.routeCordinates = routeJson.features[0].geometry.coordinates
      });*/
        this.routeOnMapView = window.tomtom.routeOnMap().addTo(this.map)

        this.routeOnMapView.draw([start, finish]);
    }




}

export default MapView