import createCrudActions from '../http-helper'

export const GET_PARKING_SPOTS_RESOURCE_NAME = 'MAP_POINTS_ACTION'
const GET_PARKING_POINTS_RESOURCE_PATH = '/parking-spots'
const UPDATE_LOCATIONS_PATH_START = '/park-start'
const UPDATE_LOCATIONS_PATH_STOP = '/park-stop'

export const getSpotsActions = createCrudActions(GET_PARKING_POINTS_RESOURCE_PATH)
export const updateLocationActionsStart = createCrudActions(UPDATE_LOCATIONS_PATH_START)
export const updateLocationActionsStop = createCrudActions(UPDATE_LOCATIONS_PATH_STOP)

export const getMapPoints = (data) => ({
    data, type: GET_PARKING_SPOTS_RESOURCE_NAME
})
