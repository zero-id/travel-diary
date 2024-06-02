import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Text,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { SET_LOGOUT } from "../../store/slice/auth";
import { FaUserCircle } from "react-icons/fa";

const AvatarComponenet = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  return (
    <Menu colorScheme="transparent">
      <MenuButton bgColor={"transparent"} colorScheme="transparent" as={Button}>
        {/* <Avatar p={1} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" /> */}

        {user?.avatar ? (
          <Avatar p={1} name="Dan Abrahmov" src={user?.avatar} />
        ) : (
          <FaUserCircle size={40} color="black" />
        )}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => navigate("/new-journey")}>
          New Journey
        </MenuItem>
        <MenuItem onClick={() => navigate("/bookmark")}>BookMark</MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(SET_LOGOUT());
            navigate("/");
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarComponenet;
