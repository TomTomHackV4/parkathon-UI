import React, { Component } from 'react';
import './main-view.css';
import { MapView } from '../../map';

class MainView extends Component {
    render() {
        return (
            <div className="App">
                <div>
                    <h1>Parkathon App</h1>
                </div>
                <div>
                    <MapView />
                </div>
            </div>
        )
    }
}

export default MainView;