import { Box, Button, Container, Flex, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { authenticate } from "../../api";
import { Form, redirect, useActionData } from "react-router-dom";


export async function action({request}) {
    const formData = await request.formData();

    const response = await authenticate(formData.get("email"), formData.get("password"));

    if(!response.ok){
        // throw new Error(response);
        console.error(response);

        return await response.json();
    }

    const user = await response.json();

    console.info(user);

    window.localStorage.setItem("auth_token", user.token);

    return redirect("/");
}

function Login() {
    const actionData = useActionData();
    const errors = actionData?.errors

    return (
        <Container maxW="lg" mt="8" bgColor="white" rounded="md" shadow="md" p="8">
            <Heading as="h2">Login</Heading>

            <Box as={Form} mt="4" method="POST">
                <Stack spacing="2">
                    <div>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input id="email" name="email" type="email" required/>
                        {errors?.email && <Text display={"inline-block"} color="text" fontSize={"sm"}>{errors?.email}</Text>}
                    </div>
                    <div>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input id="password" name="password" type="password" required/>
                    </div>
                </Stack>
                <Flex mt="4" justifyContent={"end"}>
                    <Button type="submit" variant="solid" colorScheme="green">Login</Button>
                </Flex>
            </Box>
        </Container>
    );

}

export default Login;
