
const API_URL = process.env.REACT_APP_API_URL

if (!API_URL) {
    console.error("You need to provide the REACT_APP_API_URL env variable.")
}

function retrieveAuthToken() {
    return window.localStorage.getItem("auth_token");
}

export function get(url, options = {}) {
    const headers = {};

    const authToken = retrieveAuthToken();

    if(authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
    }

    return fetch(`${API_URL}/${url}`, {
        method: "GET",
        headers,
        ...options,
    });
}


export function post(url, data, options = {}) {
    return fetch(`${API_URL}/${url}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function patch(url, data, options = {}) {
    return fetch(`${API_URL}/${url}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

export function destroy(url, options = {}) {
    return fetch(`${API_URL}/${url}`, {
        ...options,
        method: "DELETE",
    });
}
