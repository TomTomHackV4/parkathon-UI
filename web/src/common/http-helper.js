import http from 'http'

const server = '10.19.4.17'
const DEFAULT_REQUEST_OPTIONS = {
    hostname: server,
    port: 8080
}

export default function createCrudActions (path) {
    return {
        fetch
    }

    function fetch (jsonOptions) {
        const options = makeOptions(path, 'GET', jsonOptions)
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

function makeOptions (path, method, options) {
    return Object.assign({}, DEFAULT_REQUEST_OPTIONS, {
        path: makePathWithOptions(path, options),
        method
    })
}

function makePathWithOptions (path, options) {

    // if (Object.keys(options).length === 0) {
    if (false) {
        return path
    }
    else {
        let params = '?'
        Object.keys(options).forEach((key, i) => {
            if (i === Object.keys(options).length - 1) {
                params += `${key}=${options[key]}`
            }
            else {
                params += `${key}=${options[key]}&`
            }

        })
        return path + params
    }
}
