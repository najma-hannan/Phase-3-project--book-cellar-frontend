
const API_URL = process.env.REACT_APP_API_URL

if(!API_URL) {
    console.error("You need to provide the REACT_APP_API_URL env variable.")
}

export function get(url, options = {}) {
    return fetch(`${API_URL}/${url}`, {
        method: "GET",
        ...options
    })
}
