import {
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { API } from "../../libs/api";

const FormSearch = ({
  setSearch,
  handleSubmit,
}: {
  setSearch: any;
  handleSubmit: any;
}) => {
  return (
    <FormControl px={8}>
      <InputGroup>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          bg={"white"}
          type="text"
        />
        <InputRightElement w={"4.5rem"}>
          <Button
            onClick={handleSubmit}
            type="submit"
            color={"white"}
            bg={"blue.400"}
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default FormSearch;
