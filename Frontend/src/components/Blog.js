import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";

const Blog = ({ title, description, imageUrl, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/delete/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = (e) => {
    deleteRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  return (
    <Card
      sx={{
        width: "50%",
        height: "90%",
        margin: "auto",
        mb: 5,
        mt: 5,
        padding: 2,
        boxShadow: "10px 10px 20px #acc",
        ":hover": {
          boxShadow: "20px 20px 40px #acc",
        },
      }}
    >
      {isUser && (
        <Box display="flex">
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleEdit}>
            <EditIcon color="warning" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="blog">
            {userName}
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={title}
      />
      <CardMedia component="img" height="194" image={imageUrl} alt="image" />
      <hr />
      <br />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b> {userName} </b> {":"}
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Blog;
