import {destroy, get, post} from "./utils";

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

export function addReview(bookId, data) {
    return post(`books/${bookId}/reviews`, data);
}

export function deleteReview(bookId, reviewId) {
    return destroy(`books/${bookId}/reviews/${reviewId}`);
}

export function createOrder(userId, orderItems) {
    return post(`users/${userId}/orders`, {"order_items": orderItems});
}
