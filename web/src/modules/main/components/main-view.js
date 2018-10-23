import React, { Component } from 'react';
import './main-view.css';
import { connect } from 'react-redux'
import { getMapPoints } from '../../../common'

class MainView extends Component {
    render() {
        console.log('Props: ', this.props)
        return (
            <div className="App">
                <h1>Hello World!</h1>
                <button onClick={this.props.chargeMapPoints}>Click me please!</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('MapDispatchToProps', dispatch)
    return {
        chargeMapPoints: () => {
            console.log('Map points changed')
            debugger
            dispatch(getMapPoints())
        }
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state)
    return {
        mapPoints: state.mapPoints
    }
}

const connectedMain = connect(mapStateToProps, mapDispatchToProps)(MainView)
export default connectedMain