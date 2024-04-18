import React, { useState, useEffect } from 'react';
import '../CommentList.css';
import { useParams } from 'react-router-dom';
import { Navbar } from './Navbar';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const {id} = useParams()

  useEffect(() => {
    fetchComments(id);
  }, [id]);

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`https://dummyjson.com/comments/post/${postId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <Navbar>
    <div className="comment-list-container">
      <h2>Comments for Post{id} </h2>
      <div className="comment-list">
        {comments?.comments?.map(comment => (
          <div className="comment" key={comment.id}>
            <p>{comment?.user?.username} : {comment.body}</p>
          </div>
        ))}
      </div>
    </div>
    </Navbar>
  );
};

export default CommentList;
