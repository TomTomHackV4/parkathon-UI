export const GET_MAP_POINTS_ACTION_NAME = 'MAP_POINTS_ACTION'

export const getMapPoints = () => ({
    data: generateRandomPoints(),
    type: GET_MAP_POINTS_ACTION_NAME
})

function generateRandomPoints () {
    const arrayOfPositions = []
    for (let i = 0; i < 800; i++) {
        arrayOfPositions.push({
            lat: i * 4321,
            long: i * 1234
        })
    }

    return arrayOfPositions
}
