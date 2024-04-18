import React, { useState, useEffect } from "react";
import "../PostList.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const onSelectPost = (id) => {
    navigate(`/comments/${id}`)
  }

  return (
    <Navbar>
    <div className="post-list-container">
      <h2>Post List</h2>
      <div className="post-list">
        {posts?.posts?.map((post) => (
          <div
            className="post"
            key={post.id}
            onClick={() => onSelectPost(post.id)}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
    </Navbar>
  );
};

export default PostList;
