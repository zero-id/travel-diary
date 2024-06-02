import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import EditorText from "./EditorText";
import { createJourney } from "../../libs/api/call/journey";
import { useNavigate } from "react-router-dom";
import { LiaCloudUploadAltSolid } from "react-icons/lia";

export interface IValue {
  title: string;
  description: string;
  image: FileList | null;
}

const NewJourney = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [form, setForm] = useState<IValue>({
    title: "",
    description: "",
    image: "" as unknown as FileList,
  });

  const handlePost = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      setIsLoading(true);

      const formData = new FormData();
      if (!form.title) {
        alert("title is required");
        return;
      }
      formData.append("title", form.title);
      if (!form.description) {
        alert("description is required");
        return;
      }
      if (!form.image) {
        alert("image is required");
        return;
      }
      if (form.description) formData.append("description", form.description);
      if (form.image) formData.append("image", form.image[0]);

      await createJourney(formData);

      alert("Journey Created");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Journey Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minHeight={"100vh"} bgColor={"#ededed"} pt={"40px"}>
      <Navbar />
      <Box display={"flex"} flexDirection={"column"} gap={8} p={8}>
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          New Journey
        </Text>
        <form onSubmit={handlePost}>
          <FormControl mb={4}>
            <FormLabel fontWeight={"bold"} htmlFor="title">
              Title
            </FormLabel>
            <Input
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              type="text"
              id="title"
              name="title"
              bg={"#fff"}
            />
          </FormControl>
          <EditorText setForm={setForm} form={form} />
          <FormControl mt={4}>
            {preview ? (
              <FormLabel fontWeight={"bold"} htmlFor="image">
                <Image
                  w={"600px "}
                  mx={"auto"}
                  h={{ lg: "300px", base: "300px" }}
                  objectFit={"cover"}
                  rounded={"2xl"}
                  src={preview}
                />
              </FormLabel>
            ) : (
              <FormLabel cursor={"pointer"} fontWeight={"bold"} htmlFor="image">
                <LiaCloudUploadAltSolid style={{ margin: "auto" }} size={300} />
                <Text textAlign={"center"}>Upload Image</Text>
              </FormLabel>
            )}

            <Input
              name="image"
              id="image"
              display={"none"}
              type="file"
              bg={"#fff"}
              onChange={(e) => {
                setForm({ ...form, image: e.target.files });
                if (e.target.files)
                  setPreview(URL.createObjectURL(e.target.files[0]));

                console.log(preview, "ini preview");
              }}
            />
          </FormControl>

          <Button isLoading={isLoading} type="submit" colorScheme="blue">
            Post
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default NewJourney;
