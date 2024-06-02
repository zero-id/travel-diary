import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import useSignUp from "../hook/useSignUp";

const FormRegister = ({
  onClose,
  onOpenLogin,
}: {
  onClose: () => void;
  onOpenLogin: () => void;
}) => {
  const { handleOnChange, handleOnSubmit } = useSignUp();
  return (
    <Box>
      <form
        action=""
        onSubmit={(e: React.FormEvent) => handleOnSubmit({ e, onClose, onOpenLogin })}
      >
        <FormControl display={"flex"} flexDirection={"column"} gap={4}>
          <Box>
            <FormLabel htmlFor="fullname">Full Name</FormLabel>
            <Input
              bg={"#f4f4f4"}
              onChange={handleOnChange}
              name="fullname"
              type="text"
              id="fullname"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              bg={"#f4f4f4"}
              onChange={handleOnChange}
              name="email"
              type="email"
              id="email"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              bg={"#f4f4f4"}
              onChange={handleOnChange}
              name="password"
              type="password"
              id="password"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input
              bg={"#f4f4f4"}
              onChange={handleOnChange}
              name="phone"
              type="text"
              id="phone"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="address">Addres</FormLabel>
            <Textarea bg={"#f4f4f4"} name="address" onChange={handleOnChange} />
          </Box>
          <Button type="submit" w={"100%"} colorScheme="blue">
            Register
          </Button>
        </FormControl>
      </form>
      <Text py={5}>
        already have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "blue", fontStyle: "italic" }}
          onClick={onClose}
        >
          Sign In
        </span>
      </Text>
    </Box>
  );
};

export default FormRegister;
