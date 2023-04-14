import { Button, Container, Flex, Heading, Text, UnorderedList, ListItem, Stack } from "@chakra-ui/react";
import React from "react";
import { CartContext } from "../../CartProvider";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney } from "../../utils";
import { createOrder } from "../../api";

function Cart() {
    const navigate = useNavigate();
    const { cart, clearCart, removeFromCart, cartTotal } = React.useContext(CartContext);

    async function checkOutOrder() {
        // todo: remove fixed user_id
        const userId = 1;
        const orderItems = cart.map(cartItem => ({book_id: cartItem.id, quantity: cartItem.cart_quantity}));
        const response = await createOrder(userId, orderItems);

        if(!response.ok) {
            console.error(response);
            throw new Error(response);
        }

        const newOrder = await response.json();

        clearCart();

        navigate("/order-confirmed", {state: newOrder});
    }

    return (
        <Container maxW="4xl" p="8">
            <Flex justifyContent={"space-between"}>
                <Heading display={"inline-block"} as="h2" size="lg">Cart Items</Heading>

                {cart.length > 0 &&
                    <Button onClick={clearCart} size="sm" variant={"ghost"} colorScheme="red">Clear Cart</Button>}
            </Flex>

            {
                cart.length > 0 ?
                    <Stack spacing={"4"}>
                        <UnorderedList mt="4" spacing="2">
                            {cart.map(cartItem => (<ListItem key={cartItem.id}>
                                <Text as="span" fontWeight={"semibold"}>{cartItem.title}</Text> by
                                <Flex display={"inline-flex"} gap={2}>
                                    {cartItem.authors.map(author => <p key={author.id}>{author.name}</p>)}
                                </Flex>
                                <Flex gap={2}>
                                    <Text as="span">Price: {formatMoney(cartItem.price)}</Text>
                                    <Text as="span">Cart Qty: {cartItem.cart_quantity}</Text>
                                </Flex>
                                <Button onClick={() => removeFromCart(cartItem)} mt="1" colorScheme="red" variant={"link"} size="sm">Remove</Button>
                            </ListItem>))}
                        </UnorderedList>

                        <Text fontWeight={"semibold"} fontSize={"lg"}>Total Price: {formatMoney(cartTotal)}</Text>

                        <div>
                            <Button variant="solid" colorScheme="green" onClick={checkOutOrder}>Checkout Order</Button>
                        </div>
                    </Stack>
                    : <Flex flexDir={"column"} mt="4" rounded={"md"} shadow={"base"} border="1px" alignItems={"center"} justifyContent={"center"} p="8">
                        <Text fontSize="2xl" fontWeight={"semibold"} color={"gray.700"}>No items in the cart</Text>
                        <Button size="sm" variant={"outline"} as={Link} to="/" mt="2">Browse Library</Button>
                    </Flex>
            }

        </Container>)
}

export default Cart;
