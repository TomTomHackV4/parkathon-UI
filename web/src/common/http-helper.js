import axios from 'axios'

const server = '10.19.4.17'
const DEFAULT_REQUEST_OPTIONS = {
    hostname: server,
    port: 8080
}

export default function createCrudActions (path) {
    return {
        fetch,
        post
    }

    function fetch (jsonOptions) {
        const url = 'http://' + server + `:8080` + makePathWithOptions(path, jsonOptions)
        return new Promise((resolve) => {
            axios.get(url).then((res)=> resolve(res.data))
        })
    }

    function post (jsonOptions) {
        const url = 'http://' + server + `:8080` + makePathWithOptions(path, jsonOptions)
        return new Promise((resolve) => {
            axios.post(url, jsonOptions).then((res) => resolve())
        })
    }
}

function makeOptions (path, method, options) {
    return Object.assign({}, DEFAULT_REQUEST_OPTIONS, {
        path: '/' + makePathWithOptions(path, options),
        method
    })
}

function makePathWithOptions (path, options) {
    if (!options || Object.keys(options).length === 0) {
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
