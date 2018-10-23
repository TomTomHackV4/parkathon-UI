import React, { Component } from 'react';
import './main-view.css';
import { MapView } from '../../map';

class MainView extends Component {
    render() {
        return (
            <div className="App">
                <div className="app-header">
                    <h1>Parkathon App</h1>
                </div>
                <div className="map">
                    <MapView />
                </div>
            </div>
        )
    }
}

export default MainView;