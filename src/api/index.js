
const API_URL = process.env.REACT_APP_API_URL

export function allBooks(){
    return get("books");
}

export function get(url, options = {}) {
    return fetch(`${API_URL}/${url}`, {
        method: "GET",
        ...options
    })
}
