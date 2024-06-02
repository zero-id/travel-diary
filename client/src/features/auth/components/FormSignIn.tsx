import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import useSignIn from "../hook/useSignIn";

const FormSignIn = ({ onClose }: { onClose: () => void }) => {
  const { handleChange, handleSubmit } = useSignIn();

  return (
    <Box>
      <form
        action=""
        onSubmit={(e: React.FormEvent) => handleSubmit({ e, onClose })}
      >
        <FormControl display={"flex"} flexDirection={"column"} gap={4}>
          <Box>
            <FormLabel fontWeight={"bold"} htmlFor="email">
              Email
            </FormLabel>
            <Input
              bg={"#f4f4f4"}
              onChange={handleChange}
              name="email"
              type="text"
              id="email"
            />
          </Box>
          <Box>
            <FormLabel fontWeight={"bold"} htmlFor="password">
              password
            </FormLabel>
            <Input
              bg={"#f4f4f4"}
              onChange={handleChange}
              name="password"
              type="password"
              id="password"
            />
          </Box>
          <Button type="submit" w={"100%"} colorScheme="blue">
            Login
          </Button>
        </FormControl>
      </form>
      <Text py={5}>
        Don't have an account?
        <span
          style={{ cursor: "pointer", color: "blue", fontStyle: "italic" }}
          onClick={onClose}
        >
          Sign Up!
        </span>
      </Text>
    </Box>
  );
};

export default FormSignIn;
