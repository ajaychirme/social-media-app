import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

const PostsWidget = ({ userId, isProfile = false }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const neutralLight = theme.palette.neutral.light;
  const [searchText, setsearchText] = useState("");
  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  function calling(text){
console.log(text)
  };
  const handleInput = (e) => {
    setsearchText(e.target.value.toLowerCase());
   // console.log("Text is ==> ",searchText);
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isNonMobileScreens && (
        <FlexBetween
          sx={{
            backgroundColor: "white",
            color: "red",
            p: "0.6rem",
            mt: "21px",
            mb: "-9px",
            border: "solid 2px blue",
          }}
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase
            onChange={handleInput}
            placeholder="Search posts..."
            value={searchText}
          />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      )}
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          ((firstName.toLowerCase().includes(searchText)) ||(lastName.toLowerCase().includes(searchText))) && <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
