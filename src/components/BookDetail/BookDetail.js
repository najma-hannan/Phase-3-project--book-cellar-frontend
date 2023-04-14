import { useLoaderData, Link as RouterLink, useRevalidator } from "react-router-dom"
import { deleteReview, getBookReviews, getSingleBook } from "../../api";
import { Box, Button, Container, Flex, Heading, Stack, Text, Link, UnorderedList, ListItem } from "@chakra-ui/react";
import React from "react";
import { CartContext } from "../../CartProvider";
import { formatMoney, joinWithAnd, pluralize } from "../../utils";
import ReviewForm from "../ReviewForm/ReviewForm";

export async function loader({ params }) {
    const [bookResponse, reviewsResponse] = await Promise.all([
        getSingleBook(params["bookId"]),
        getBookReviews(params["bookId"]),
    ]);

    if (!bookResponse.ok) {
        throw new Error(bookResponse)
    }
    if (!reviewsResponse.ok) {
        throw new Error(reviewsResponse)
    }

    return await Promise.all([
        bookResponse.json(),
        reviewsResponse.json(),
    ])
}


function BookDetail() {
    const revalidator = useRevalidator();

    const [book, reviews] = useLoaderData();

    const { addToCart } = React.useContext(CartContext);

    async function deleteReviewEvent(bookId, reviewId) {

        if(!window.confirm("Are you sure?")) {
            return;
        }

        const response = await deleteReview(bookId, reviewId);

        if(!response.ok) {
            console.error(response);
            throw new Error(response);
        }

        revalidator.revalidate();
    }

    return (
        <Container maxW="4xl" px={{ base: "4", md: "6", lg: "8" }} pt="8" pb="20">
            <Link as={RouterLink} to="/" variant="link" color="gray.700" fontWeight={"semibold"}>&larr; Back to Library</Link>

            <Stack mt="3" spacing="8">
                <Box bgColor={"white"} rounded="md" shadow={"sm"} p={{ base: "4", md: "6", lg: "8" }}>
                    <Heading as="h2" size="xl" fontWeight={"semibold"}>{book.title}</Heading>

                    <Stack spacing="2" mt="2">
                        <Box>
                            <Text as="span" fontWeight={"semibold"}>Written by:</Text>
                            <Text ml="1" as="span" color="gray.700">{joinWithAnd(book.authors.map(author => author.name))}</Text>
                        </Box>
                        <Box>
                            <Text as="span" fontWeight={"semibold"}>Published On:</Text>
                            {" "} {book.date_of_publication}
                        </Box>

                        <Flex gap={2}>
                            <Text as="span" fontWeight={"semibold"}>Price: {" "}</Text>{formatMoney(book.price)}
                            <Text as="span" fontWeight={"semibold"}>Qty: {" "}</Text>{book.quantity}
                        </Flex>
                        <div>
                            <Button onClick={() => addToCart(book)} mt="1" size="sm">Add to Cart</Button>
                        </div>
                    </Stack>
                </Box>

                <Box bgColor={"white"} overflow={"hidden"} rounded="md" shadow={"sm"}>
                    <Box px={8} pt={4} pb={8}>
                        <Heading as="h2" size="md" color="gray.700" fontWeight={"semibold"} >Reviews</Heading>
                        {
                            reviews.length > 0 ?
                                <UnorderedList mt="4" listStyleType={"none"} spacing="4" marginStart={0}>
                                    { reviews.map(review => (
                                        <ListItem key={review.id} border="1px" p="2" rounded="sm" >
                                            <p>Reviewer: {review.user.name}</p>
                                            <p>{review.comment}</p>
                                            <Text color="blue.700" fontSize="sm">Rated {review.rating} {" "} {pluralize(review.rating, "star", "stars")}</Text>

                                            <Button onClick={() => deleteReviewEvent(book.id, review.id)} mt="2" variant="link" colorScheme="red" size="sm">Delete</Button>
                                        </ListItem>
                                    )) }
                                </UnorderedList> :
                                <Box mt="4" rounded="md" p="4" border="1px" borderStyle={"dashed"}>
                                    No reviews posted
                                </Box>
                        }
                    </Box>

                    <Box bgColor="gray.50" p={[4, 8]}>
                        <ReviewForm bookId={book.id}/>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
}

export default BookDetail;
