import {get, post} from "./utils";

export function authenticate(email) {
    return post(`authenticate`, {email});
}

export function allBooks(){
    return get("books");
}

export function getSingleBook(bookId) {
    return get(`books/${bookId}`);
}

export function getBookReviews(bookId) {
    return get(`books/${bookId}/reviews`);
}

export function createOrder(userId = 1, orderItems) {
    return post(`users/${userId}/orders`, {"order_items": orderItems});
}
