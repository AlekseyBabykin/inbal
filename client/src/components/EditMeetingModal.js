import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchUpdateMeeting } from "../features/Mettings/apiSliceMeetings";

const EditMeetingModal = ({ meeting, show, onHide }) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState(meeting ? meeting.details : "");
  const [date, setDate] = useState(meeting ? meeting.date : "");
  const [location, setLocation] = useState(meeting ? meeting.location : "");
  const [summary, setSummary] = useState(meeting ? meeting.summary : "");

  const SaveChanges = () => {
    dispatch(
      fetchUpdateMeeting({
        meetingId: meeting.id,
        details,
        date,
        location,
        summary,
      })
    );
    onHide();
    setDetails("");
    setDate("");
    setLocation("");
    setSummary("");
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="meetingDetails">
            <Form.Label>Details</Form.Label>
            <Form.Control
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="meetingDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="meetingLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="meetingSummary">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={SaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditMeetingModal;
