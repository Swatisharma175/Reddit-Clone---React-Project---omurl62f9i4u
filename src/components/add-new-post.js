import {
    Button,
    Modal,
    Form
  } from "react-bootstrap";
  import React, { useState, useEffect } from "react";
  import db from "../lib/firebase";
  
  const AddNewPost = () => {
    const [title, setTitle] = useState("");
    const [isSaving, setSaving] = useState(false);
    const [show, setShow] = useState(false);
    const [validTitle, setValidTitle] = useState(true);
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handleSubmit = async () => {
      if(title.trim()){
        setValidTitle(true);
        const date = new Date();
        await db.collection("posts").add({
          title,
          upVotesCount: 0,
          downVotesCount: 0,
          createdAt: date.toUTCString(),
          updatedAt: date.toUTCString(),
        });
        
        setTitle("");
        handleClose();
      }else{
        setValidTitle(false);
    }
    };
  
    return (
      <>
        <Button variant="light" onClick={handleShow}>
          Add new post
        </Button>

        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>    <Form id="post-title">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Post title</Form.Label>
        <Form.Control type="text" placeholder="..."  value={title} 
        onChange={(e) => setTitle((e.target.value))}/>
        {(validTitle) ? "" :
        <Form.Text className="text-muted">
         title cannot be empty
        </Form.Text>
  }
      </Form.Group>
    </Form>
</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancle
          </Button>
          <Button variant="primary" onClick={handleSubmit} 
         >
            Save Post
          </Button>
        </Modal.Footer>
      </Modal>
        
      </>
    );
  };
  
  export default AddNewPost;