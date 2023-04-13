import { Container } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export function loader() {
    return [
        { id: 1, title: "Book 1" },
        { id: 2, title: "Book 2" },
    ]
}

function LibraryGallery() {
    const books = useLoaderData();

    return (
        <Container maxW="7xl" p="8">
            <ul>
                {
                    books.map(book => (<li key={book.id}>{book.title}</li>))
                }
            </ul>
        </Container>
    )

}

export default LibraryGallery;
