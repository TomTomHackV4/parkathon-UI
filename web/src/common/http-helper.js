import http from 'http'

const server = '10.19.9.204'
const DEFAULT_REQUEST_OPTIONS = {
    hostname: server,
    port: 8080
}

export default function createCrudActions (path) {
    return {
        fetch
    }

    function fetch () {
        const options = makeOptions(path, 'GET')
        return new Promise((resolve) => {
            http.get(options, (res) => {
                let rawData

                res.setEncoding('utf8')
                res.on('data', (data) => rawData = data)
                res.on('end', () => resolve(JSON.parse(rawData)))
            })
        })
    }
}

function makeOptions (path, method) {
    return Object.assign({}, DEFAULT_REQUEST_OPTIONS, {
        path,
        method
    })
}
