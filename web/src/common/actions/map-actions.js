import createCrudActions from '../http-helper'

export const GET_PARKING_SPOTS_RESOURCE_NAME = 'MAP_POINTS_ACTION'
const GET_PARKING_POINTS_RESOURCE_PATH = '/parking-spots'

export const getSpotsActions = createCrudActions(GET_PARKING_POINTS_RESOURCE_PATH)

export const getMapPoints = (data) => ({
    data, type: GET_PARKING_SPOTS_RESOURCE_NAME
})
