import { Box, Button, Flex, FormLabel, Input, Text, Textarea, VisuallyHidden } from "@chakra-ui/react";
import { addReview } from "../../api";
import {useState} from "react";
import { useRevalidator } from "react-router-dom";

function ReviewForm({bookId, user}) {
    const revalidator = useRevalidator();

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    const submitReview = async (event) => {
        event.preventDefault();

        const response = await addReview(bookId, {user_id: user?.id, comment, rating});

        if(!response.ok) {
            // !handle error
            console.error(response);
            throw Error("Couldn't process request");
        }

        setComment("");
        setRating(0);
        revalidator.revalidate();
    };

    return (
        <form onSubmit={submitReview}>
            <Text mb="1" fontWeight={"semibold"} color="gray.800">{user?.name}</Text>
            <VisuallyHidden as="label" htmlFor="comment">Comment</VisuallyHidden>
            <Textarea value={comment} onChange={e => setComment(e.target.value)} id="comment" bgColor="white" placeholder='Add your review' resize={"none"} required/>
            <Box mt="2">
                <FormLabel htmlFor="rating">Rating</FormLabel>
                <Input value={rating} onChange={e => setRating(e.target.value)}  id="rating" type="number" min="1" max="5" w="32" bgColor="white" required/>
            </Box>
            <Flex mt="4" justifyContent={"end"}>
                <Button type="submit" size="sm" variant="solid" colorScheme="teal">Add Review</Button>
            </Flex>
        </form>
    );

}

export default ReviewForm;
