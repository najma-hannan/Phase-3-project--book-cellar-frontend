import { Button, Container, Flex, Heading, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useLoaderData, Link as RouterLink } from "react-router-dom";
import { allBooks } from "../../api";
import { formatMoney, joinWithAnd } from "../../utils";
import React from "react";
import { CartContext } from "../../CartProvider";

export async function loader() {
    const response = await allBooks();

    if (!response.ok) {
        throw new Error(response)
    }

    return await response.json();
}

function Home() {
    const books = useLoaderData();

    const {addToCart} = React.useContext(CartContext);

    return (
        <Container maxW="7xl" p="8">
            <Heading as="h2" size="lg">Library Collection</Heading>

            <UnorderedList mt="2" spacing={4}>
                {
                    books.length > 0 ?
                        books.map(book => (<ListItem key={book.id}>
                            <Link as={RouterLink} to={`/books/${book.id}`} fontWeight={"semibold"}>{book.title}</Link> by
                            <Text ml="1" as="span" color="gray.700">{joinWithAnd(book.authors.map(author => author.name))}</Text>
                            <Flex gap={2}>
                                <Text as="span">Price: {formatMoney(book.price)}</Text>
                                <Text as="span">Qty: {book.quantity}</Text>
                            </Flex>
                            <Button onClick={() => addToCart(book)} variant={"link"} colorScheme="blue" mt="1" size="sm">Add to Cart</Button>
                        </ListItem>))
                        : <p>We don't have books in the library yet. Come back later.</p>
                }
            </UnorderedList>
        </Container>
    )

}

export default Home;
