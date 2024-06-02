import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  Image,
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IJourney } from "../../../types/app";
import ButtonBookmark from "../../bookmark/ButtonBookmark";
import ModalDialog from "../../../components/ModalDialog";
import FormSignIn from "../../auth/components/FormSignIn";

interface ICardJourneyProps {
  journey: IJourney;
}

const CardJourney = ({ journey }: ICardJourneyProps) => {
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

  const navigate = useNavigate();
  return (
    <Card cursor={"pointer"} maxW="sm" h={"350px"}>
      <ButtonBookmark journey={journey} />
      <CardBody
        onClick={() =>
          localStorage.token
            ? navigate(`/detail-journey/${journey.id}`)
            : onOpenLogin()
        }
        p={"0"}
      >
        <Image
          src={journey?.image}
          h={"160px"}
          w={"100%"}
          objectFit={"cover"}
          alt="Green double couch with wooden legs"
          borderRadius="md"
        />
        <Stack mt="6" p={"10px"} spacing="3">
          <Heading size="md">{journey?.title}</Heading>
        </Stack>
        <Box p={"10px"}>
          {journey?.description && (
            <p dangerouslySetInnerHTML={{ __html: journey.description }} />
          )}
        </Box>
      </CardBody>
      <ModalDialog
        isOpen={isOpenLogin}
        onClose={onCloseLogin}
        title="Login"
        cildren={<FormSignIn onClose={onCloseLogin} />}
      />
      <Divider />
    </Card>
  );
};

export default CardJourney;
