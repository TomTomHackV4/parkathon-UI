import React, { Component } from 'react'
import './map-view.css'

class MapView extends Component {
    constructor(props) {
        super(props)
        this.onLoadMap = this.onLoadMap.bind(this)
        this.updateMap = this.updateMap.bind(this)

        this.map = null
        this.navigate = false
        this.routeCordinates = null
        this.destination = [52.535244, 13.332137]
        this.routeOnMapView = null
        this.userPosition = {
            lat: 0,
            lng: 0
        }
    }

    componentDidMount() {
      this.getUserPositionIfPossible()
          .then((userCoordinates) => this.createMap(userCoordinates))

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
        console.log(this.userPosition)
        // Define TT Map
        this.map = window.tomtom.L.map('map', {
            source: 'vector',
            key: 'sgqShnAhoEUi2DZq1UGH6GxzNU1IAqHG',
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

        const myIcon = window.tomtom.L.icon({
            iconUrl: 'icons/ic_parking_spot.svg',
            iconSize: [32, 32]
        })

        this.props.freeParkingSpots && Array.isArray(this.props.freeParkingSpots) && this.props.freeParkingSpots.forEach(({location}) => {
            const { latitude, longitude } = location
            window.tomtom.L.marker([latitude, longitude], { icon: myIcon }).addTo(this.map)
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
}

export default MapView