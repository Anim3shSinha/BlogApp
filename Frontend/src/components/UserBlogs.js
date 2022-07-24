import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const id = localStorage.getItem("userId");

  const [user, setUser] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios
        .get(`http://localhost:5000/api/blog/user/${id}`)
        .catch((err) => console.log(err));

      const data = await res.data;
      return data;
    };

    sendRequest().then((data) => setUser(data.user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
