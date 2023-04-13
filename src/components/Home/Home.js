import { Button, Container, Flex, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { allBooks } from "../../api/books";
import { formatMoney } from "../../utils";
import React from "react";
import { CartContext } from "../../CartProvider";

export async function loader() {
    const response = await allBooks();
    const data = await response.json();

    if (!response.ok) {
        throw new Error(response)
    }

    return data;
}

function Home() {
    const books = useLoaderData();

    const {addToCart} = React.useContext(CartContext);

    return (
        <Container maxW="7xl" p="8">
            <Heading as="h2" size="md">Library Collection</Heading>

            <UnorderedList mt="2" spacing={4}>
                {
                    books.length > 0 ?
                        books.map(book => (<ListItem key={book.id}>
                            <Text as="span" fontWeight={"semibold"}>{book.title}</Text> by {"  "}
                            <Flex display={"inline-flex"} gap={2}>
                                {book.authors.map(author => <p key={author.id}>{author.name}</p>)}
                            </Flex>
                            <Flex gap={2}>
                                <Text as="span">Price: {formatMoney(book.price)}</Text>
                                <Text as="span">Qty: {book.quantity}</Text>
                            </Flex>
                            <Button onClick={() => addToCart(book)} mt="1" size="sm">Add to Cart</Button>
                        </ListItem>))
                        : <p>We don't have books in the library yet. Come back later.</p>
                }
            </UnorderedList>
        </Container>
    )

}

export default Home;
