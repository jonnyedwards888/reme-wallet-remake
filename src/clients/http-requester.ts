import axios, { Method } from 'axios'

const executeRequest = async function (type: string, url: string, data: any, headers: any = {}) {
    try {
        const result = await axios({
            method: type as Method,
            headers,
            url,
            data
        })

        return result.data
    } catch (error) {
        const err = new Error()

        // err.message = error.message
        // if (error.response && error.response.data) {
        //     err.message = JSON.stringify(error.response.data)
        // }

        throw err
    }
}

export class HTTPRequester {

    public static async get (url: string, headers: any = {}) {
        return executeRequest('GET', url, {}, headers)
    }

    public static async post (url: string, data: any, headers: any = {}) {
        return executeRequest('POST', url, data, headers)
    }

    public static async put (url: string, data: any, headers: any = {}) {
        return executeRequest('PUT', url, data, headers)
    }
}
