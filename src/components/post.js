import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import VoteButtons from "./vote-buttons";
import React from "react";

const Post = ({ post }) => {
  return (
   
    <div key={post.id} className="d-flex  each-post-container">
     <VoteButtons post={post} />
     <div className="d-flex align-items-center ms-4">
         {post.title}
    </div>   
    </div>
    
  );
};

export default Post;