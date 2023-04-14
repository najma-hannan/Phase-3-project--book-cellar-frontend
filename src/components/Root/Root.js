import { Box, Link, Flex, Heading, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, Outlet, useLoaderData } from "react-router-dom";
import { CartContext } from "../../CartProvider";
import { profile as getProfile } from "../../api";

export async function loader() {
    if (!window.localStorage.getItem("auth_token")) {
        return null;
    }

    const response = await getProfile();

    if (!response.ok) {
        console.error(response);
        return null;
    }

    return await response.json();
}

function CartButton() {
    const { cartCount } = React.useContext(CartContext);

    return (
        <Button as={RouterLink} variant={"solid"} colorScheme="whiteAlpha" to="cart">
            <Text as="span" fontSize="lg" fontWeight={"semibold"}>Cart</Text>
            <Text ml="1" as="span" fontSize={"xs"}>({cartCount})</Text>
        </Button>
    )
}

function Root() {
    const user = useLoaderData();

    return (<Flex flexDir={"column"} minH="100vh">
        <Box as="header" bg="gray.800" >
            <Flex justifyContent={"space-between"} alignItems={"center"} maxW="7xl" mx="auto" p="8">
                <Link as={RouterLink} to="/">
                    <Heading as="h1" display={"inline-block"} size="lg" color="white">Book Cellar</Heading>
                </Link>

                <div>
                    {
                        user ? <>
                            <Text mr="4" color="white" fontWeight={"semibold"} display={"inline-block"}>Hello, {user.name}</Text>
                        </>
                            :
                            <Button mr="4" as={RouterLink} to={"/login"} colorScheme="green">Login</Button>
                    }
                    <CartButton />
                </div>
            </Flex>
        </Box>
        <Box flex="1" as="main" bgColor={"gray.100"}>
            <Outlet />
        </Box>
    </Flex>)
}

export default Root;
