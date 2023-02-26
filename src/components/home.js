import { Container , Row , Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Post from "./post";
import db from "../lib/firebase";
import Navbar from "./navbar";


const Home = () => {
//    const navigate =  useNavigate();
  const [posts, setPosts] = useState([]);
 
  useEffect(() => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _posts = [];

        querySnapshot.forEach((doc) => {
          _posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setPosts(_posts);
      });
  }, []);

  // useEffect(() => {
  //   // Hook to handle the initial fetching of posts

  //   db.collection("posts")
  //     .orderBy("createdAt", "desc")
  //     .get()
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       setPosts(data);
  //     });
  // }, []);

  return (
    <>
    <Navbar/>
      <Container className="d-flex flex-column all-post-container">
          {posts.map((post) => (
      <Row>
           <Col className="d-flex justify-content-center "><Post post={post} key={post.id} /></Col>
      </Row>
          ))}
      </Container>
    </>
  );
};

export default Home;