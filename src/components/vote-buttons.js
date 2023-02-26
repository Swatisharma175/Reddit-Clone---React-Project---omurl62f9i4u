
import { Container, Button } from "react-bootstrap";
import React, { useState ,useEffect } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import db from "../lib/firebase";
import  {Link, useNavigate} from 'react-router-dom';

const VoteButtons = ({ post }) => {
  const [isVoting, setVoting] = useState(false);
  const [votedPosts, setVotedPosts] = useState([]);
  const isLogin = localStorage.getItem("login");
  const navigate = useNavigate();
  useEffect(() => {
   
    // Fetch the previously voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse" and update the item on localStorage. Return "true" if the user has already voted the post.
    const votesFromLocalStorage = localStorage.getItem("votes") || [];
    let previousVotes = [];

    try {
      // Parse the value of the item from localStorage. If the value of the
      // items isn't an array, then JS will throw an error.
      previousVotes = JSON.parse(votesFromLocalStorage);
    } catch (error) {
      console.error(error);
    }

    setVotedPosts(previousVotes);
  }, []);
    
  const handleDisablingOfVoting = (postId) => {
    // This function is responsible for disabling the voting button after a
    // user has voted. Fetch the previously voted items from localStorage. See
    // https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse"
    // and update the item on localStorage.
    const previousVotes = votedPosts;
    previousVotes.push(postId);

    setVotedPosts(previousVotes);

    // Update the voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.stringify" and update the item on localStorage.
    localStorage.setItem("votes", JSON.stringify(votedPosts));
  };

  const handleClick = async (type) => {
    if(!isLogin){
      navigate("/login");
     }else{
    if(!checkIfPostIsAlreadyVoted()){
    setVoting(true);
    // Do calculation to save the vote.
    let upVotesCount = post.upVotesCount;
    let downVotesCount = post.downVotesCount;

    const date = new Date();

    if (type === "upvote") {
      upVotesCount = upVotesCount + 1;
    } else {
      downVotesCount = downVotesCount + 1;
    }

    await db.collection("posts").doc(post.id).set({
      title: post.title,
      upVotesCount,
      downVotesCount,
      createdAt: post.createdAt,
      updatedAt: date.toUTCString(),
    });

    handleDisablingOfVoting(post.id);
    setVoting(true);
  }
}
  };
  const checkIfPostIsAlreadyVoted = () => {
    if (votedPosts.indexOf(post.id) > -1) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <div>
        {checkIfPostIsAlreadyVoted()?  <Button
          className="m-1"
          size="lg"
          aria-label="Upvote"
          disabled
          ><FiArrowUp /></Button>:  <Button
          className="m-1"
          size="lg"
          aria-label="Upvote"
          onClick={() => handleClick("upvote")}
          ><FiArrowUp /></Button>}
       
        <p>
          {post.upVotesCount}
        </p>
      </div>
      <div>
      {checkIfPostIsAlreadyVoted()?  <Button
          className="m-1"
          size="lg"
          aria-label="Upvote"
          disabled
          ><FiArrowUp /></Button>:  <Button
          className="m-1"
          size="lg"
          aria-label="Upvote"
          onClick={() => handleClick("downvote")}
          ><FiArrowUp /></Button>}
        <p>
          {post.downVotesCount}
        </p>
      </div>
    </>
  );
};

export default VoteButtons;