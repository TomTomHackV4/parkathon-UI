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
        this.userPosition = {
            lat: 0,
            lng: 0
        }
    }

    componentDidMount() {
        console.log('MapView componentDidMount', this.props)
        this.getUserPositionIfPossible().then(this.fetchAndPrintMap)
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
                center: [this.userPosition.lat, this.userPosition.lng],
                basePath: '/sdk',
                zoom: 15,
                zoomAnimation: false,
                fadeAnimation: false,
                markerZoomAnimation: false
            })

        window.tomtom.L.marker([this.userPosition.lat, this.userPosition.lng], {
            title:'Your position',
            icon: window.tomtom.L.icon({
                iconUrl:'icons/ic_user_location.svg'
            })

        }).addTo(this.map)

        // Prints route of user on map
        if (this.destination)
        {
            console.log('DRAW EVENT', evt.latlng, this.destination)
            this.drawRoute([evt.latlng.lat, evt.latlng.lng], [52.5177350, 13.3396140])
            // this.drawRoute([evt.latlng.lat, evt.latlng.lng], [this.destination.lat, this.destination.lng])
        }

        const myIcon = window.tomtom.L.icon({
            iconUrl: 'icons/ic_parking_spot.svg',
            iconSize: [32, 32]
        })

        this.props.freeParkingSpots && Array.isArray(this.props.freeParkingSpots) && this.props.freeParkingSpots.forEach(({location}) => {
            const { latitude, longitude } = location
            console.log('Latitude, longitude', [latitude, longitude])
            window.tomtom.L.marker([latitude, longitude], { icon: myIcon })
                .on('click', () => this.props.onMarkerClicked({latitude: latitude, longitude: longitude}))
                .addTo(this.map)
        })
    }

    getUserPositionIfPossible () {
        if (navigator.geolocation) {
            const userCoords = {
                latitude: 0,
                longitude: 0
            }

            return new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    userCoords.latitude =coords.latitude
                    userCoords.longitude = coords.longitude

                    this.userPosition.lat = coords.latitude
                    this.userPosition.lng = coords.longitude

                    resolve()
                })
            })
        }

        return Promise.resolve(null)
    }

    createMap() {
        const script = document.createElement('script')
        script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js'
        document.body.appendChild(script)
        script.async = true
        script.onload = this.onLoadMap
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