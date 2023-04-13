import { Box, Link, Flex, Heading, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { CartContext } from "../../CartProvider";

function CartButton() {
    const {cart} = React.useContext(CartContext);

    return (
        <Button as={RouterLink} variant={"solid"} colorScheme="whiteAlpha" to="cart">
            <Text as="span" fontSize="lg" fontWeight={"semibold"}>Cart</Text>
            <Text ml="1" as="span" fontSize={"xs"}>({cart.length})</Text>
        </Button>
    )
}

function Root() {
    return (<div>
        <Box as="header" bg="gray.800" >
            <Flex justifyContent={"space-between"} alignItems={"center"} maxW="7xl" mx="auto" p="8">
                <Link as={RouterLink} to="/">
                    <Heading as="h1" display={"inline-block"} size="lg" color="white">Book Cellar</Heading>
                </Link>

                <CartButton />
            </Flex>
        </Box>
        <main>
            <Outlet />
        </main>
    </div>)
}

export default Root;
