import { GET_PARKING_SPOTS_RESOURCE_NAME } from '../actions'
const DEFAULT_STATE = []

const mapReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_PARKING_SPOTS_RESOURCE_NAME:
            return [{"latitude":52.519735,"longitude":13.337614},{"latitude":52.518735,"longitude":13.338614},{"latitude":52.517735,"longitude":13.339614}];
            // return action.data
        default:
            return state
    }
}

export default mapReducer