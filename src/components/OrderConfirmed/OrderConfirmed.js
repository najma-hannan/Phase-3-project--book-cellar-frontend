import { Box, Button, Container, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { formatMoney } from "../../utils";

function OrderConfirmed() {
    const location = useLocation();
    const order = location.state;

    if (!order) {
        return <Navigate to={"/"} />
    }

    return (
        <Container bgColor={"white"} rounded="md" shadow="md" mt="8" maxW="4xl" p="8">
            <Heading as="h2">Order Confirmed #{order.id}:</Heading>

            <UnorderedList mt="4">
                {
                    order.order_items.map(item => (
                        <ListItem key={item.id}>
                            {item.book.title} {" "} Qty: {item.quantity} @ {" "} {formatMoney(item.price)}
                        </ListItem>
                    ))
                }
            </UnorderedList>

            <Box mt="8">
                <Button as={Link} to="/" variant="solid">Continue Shopping</Button>
            </Box>
        </Container>
    );

}

export default OrderConfirmed;
