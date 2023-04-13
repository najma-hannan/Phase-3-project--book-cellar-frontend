import { Box, Container, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function Root() {
    return (<div>
        <Box as="header" bg="gray.800" color="white">
            <Container maxW="7xl" p="8">
                <Heading as="h1" size="lg">Book Cellar</Heading>
            </Container>
        </Box>
        <main>
            <Outlet />
        </main>
    </div>)
}

export default Root;
