import { Navbar as Nav ,Container, Button} from "react-bootstrap";
import React from "react";
import AddNewPost from "./add-new-post";
import  {Link, useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("login");
  const logout =() =>{
    console.log("logout")
    localStorage.removeItem("login");
    localStorage.removeItem('favoriteMovieList');
    navigate('/');
  }
  return (
    <Nav fixed="top" bg="danger">
    <Container>

      <Nav.Brand href="#home" id="navbar">{(isLogin) ? "Hi "+ localStorage.getItem("name") + ", Welcome to " : " " } Reddit.com</Nav.Brand>
      <Nav.Toggle />
      <Nav.Collapse className="justify-content-end">
          
          <AddNewPost/>
          {(isLogin) ?
          <Button className="ms-5" onClick={logout}>Logout</Button> : ""
}
      </Nav.Collapse>
    </Container>
  </Nav>
   
    
  );
};

export default Navbar;