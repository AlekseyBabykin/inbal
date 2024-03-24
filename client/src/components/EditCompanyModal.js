import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchUpdateCompany } from "../features/Business/apiSliceBusiness.js";

const EditCompanyModal = ({ company, show, onHide }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(company ? company.name : "");
  const [info, setInfo] = useState(company ? company.info : "");

  const handleSaveChanges = () => {
    dispatch(fetchUpdateCompany({ companyId: company, name, info }));
    onHide();
    setName(" ");
    setInfo(" ");
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="companyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="companyDescription">
            <Form.Label>Company Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCompanyModal;
