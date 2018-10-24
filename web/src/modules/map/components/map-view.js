import React, { Component } from 'react'
import './map-view.css'

class MapView extends Component {
    constructor(props) {
        super(props)
        this.onLoadMap = this.onLoadMap.bind(this)
        this.updateMap = this.updateMap.bind(this)
        this.parseDestination = this.parseDestination.bind(this)
        this.fetchAndPrintMap = this.fetchAndPrintMap.bind(this)

        this.map = null
        this.routeCordinates = null
        this.parseDestination()
        this.routeOnMapView = null
        this.userPositionMarker = null
        this.userPosition = {
            lat: 0,
            lng: 0
        }
    }

    componentDidMount () {
        this.getUserPositionIfPossible().then(() => {
            this.fetchAndPrintMap()
        })
    }

    componentWillUpdate (nextProps) {
        if (this.routeOnMapView) {
            this.routeOnMapView.clear()
        }
        if (this.userPositionMarker) {
            this.userPositionMarker.addTo(this.map)
        }

        if (nextProps.destinationMarker) {

            if (this.userPositionMarker) {
                this.userPositionMarker.remove()
            }

            this.drawRoute(this.userPosition, nextProps.destinationMarker)
        }

        if (nextProps.destinationMarker) {
            setTimeout(() => this.updateMap(), 2000)
            //setInterval(() => 
            //        this.updateMap(), 500)
        }
    }

    render() {
        return <div id='map'></div>
    }

    parseDestination() {
        if (this.props.destinationMarker) {
            const { latitude, longitude } = this.props.destinationMarker
            this.destination = { lat: latitude, lng: longitude }
        }
        else {
            this.destination = null
        }
    }

    fetchAndPrintMap() {
        // this.parseDestination()
        this.createMap()

        /*if (this.navigate && this.destination) {
            setInterval(() => this.setState({
                time:
                    this.updateMap()
            }), 500)
        }*/
    }

    onLoadMap () {
        const mapConfig = {
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
        }

        // Define TT Map
        this.map = window.tomtom.L.map('map', mapConfig)

        // Define center marker
        this.userPositionMarker = window.tomtom.L.marker([this.userPosition.lat, this.userPosition.lng], {
            title: 'Your position',
            icon: window.tomtom.L.icon({
                iconUrl: 'icons/ic_user_location.svg'
            })
        })
        this.userPositionMarker.addTo(this.map)

        this.loadMarkers(this.props.freeParkingSpots)
    }

    loadMarkers (spotsArray) {
        if (this.map) {
            const icon = window.tomtom.L.icon({
                iconUrl: 'icons/ic_parking_spot.svg',
                iconSize: [32, 32]
            })

            if (spotsArray && Array.isArray(spotsArray)) {
                spotsArray.forEach(({ location }) => {
                    const { latitude, longitude } = location
                    window.tomtom.L.marker([latitude, longitude], { icon })
                        .on('click', () => this.props.onMarkerClicked(location))
                        .addTo(this.map)
                })
            }
        }
    }

    getUserPositionIfPossible () {
        if (navigator.geolocation) {
            return new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    this.userPosition.lat = coords.latitude
                    this.userPosition.lng = coords.longitude

                    // Suscribe usr position to main window object to acces from main-view.js
                    window.userPosition = this.userPosition
                    resolve()
                })
            })
        }

        return Promise.resolve(null)
    }

    createMap () {
        const script = document.createElement('script')
        script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js'
        document.body.appendChild(script)
        script.async = true
        script.onload = this.onLoadMap
    }

    updateMap () {
        if(this.props.destinationMarker && this.props.navigate){

            if (this.routeOnMapView === null) {
                return
            }
            if (this.routeCordinates === null ||
                this.routeCordinates.length === 1) {
                return
            }
            this.routeCordinates.shift()
            console.log(this.routeCordinates.length)
            var startPoint = [this.routeCordinates[0][1], this.routeCordinates[0][0]]
            this.userPosition = {lat: startPoint[0], lng: startPoint[1]}
            
            this.userPositionMarker = window.tomtom.L.marker([this.userPosition.lat, this.userPosition.lng], {
                title: 'Your position',
                icon: window.tomtom.L.icon({
                    iconUrl: 'icons/ic_user_location.svg'
                })
            })

            this.routeOnMapView.clear()
            this.routeOnMapView.drawRoute([startPoint, this.props.destinationMarker])
            //this.drawRoute(this.userPosition, this.props.destinationMarker)
            this.map.setMaxZoom(15)
            this.map.setZoom(15)
            setTimeout(() => this.updateMap(), 500)
        }
    }

    drawRoute (start, finish) {
        window.tomtom.routing().locations([start, finish]).go().then((routeJson) => {
            this.routeCordinates = routeJson.features[0].geometry.coordinates
        });

        this.routeOnMapView = window.tomtom.routeOnMap().addTo(this.map)
        this.routeOnMapView.draw([start, finish])
    }
}

export default MapView