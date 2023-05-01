import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ count,friendId, name, subtitle, userPicturePath }) => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const posts = useSelector((state) => state.posts);
  
 // console.log(posts)
 
  // let displaynone = {"display":"none"}

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends && friends.find((friend) => friend._id === friendId);

  const patchFriend =  () => {

    let header={headers:{
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
   }}
    axios.patch(`https://share-posts.onrender.com/users/${_id}/${friendId}`, header).then((x)=>{
          return x.json()
         }).then((y)=>{
            console.log("Yis ",y)
           dispatch(setFriends({ friends: y }));
           }).catch((err)=>{
             console.log(err)
           })


    //  fetch(
    //   `https://share-posts.onrender.com/users/${_id}/${friendId}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // ).then((x)=>{
    //   return x.json();
    // }).then((y)=>{
    //   console.log("Yis ",y)
    //   // dispatch(setFriends({ friends: y }));
    // }).catch((err)=>{
    //   console.log(err)
    // })
    //console.log("Res==>",response);
    // let datatemp = response;
    // console.log("datatemp is=>",datatemp);
   // const data = await response.json();
    // console.log("Data in json is =>",data);

    // dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      { (friendId != _id  ) && <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem"
      }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>}
    </FlexBetween>
  );
};

export default Friend;
