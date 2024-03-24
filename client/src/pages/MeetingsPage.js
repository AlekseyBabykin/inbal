import React, { useEffect, useState } from "react";
import { Button, Form, ListGroup, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyInfo } from "../features/Business/apiSliceBusiness";
import {
  fetchDeleteMeeting,
  fetchMeetingCreate,
  fetchMeetingsInfo,
} from "../features/Mettings/apiSliceMeetings";
import EditMeetingModal from "../components/EditMeetingModal";

const MeetingsPage = () => {
  const [selectedBusinessCompanyId, setSelectedBusinessCompanyId] =
    useState("");
  const [newDetails, setNewDetails] = useState("");
  const [newMeetingDate, setNewMeetingDate] = useState("");
  const [newMeetingLocation, setNewMeetingLocation] = useState("");
  const [newMeetingSummary, setNewMeetingSummary] = useState("");
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);
  const meetings = useSelector((state) => state.meeting.meetings);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMeetingIndex, setSelectedMeetingIndex] = useState(null);

  const handleAddMeeting = () => {
    const BusinessCompany = companies.find(
      (company) => company.id === parseInt(selectedBusinessCompanyId, 10)
    );
    console.log(selectedBusinessCompanyId);
    console.log(companies);
    console.log(BusinessCompany);
    dispatch(
      fetchMeetingCreate({
        details: newDetails,
        date: newMeetingDate,
        location: newMeetingLocation,
        business_name: BusinessCompany?.name,
        summary: newMeetingSummary,
        companyBusinessId: BusinessCompany?.id,
      })
    );
    setNewMeetingDate("");
    setNewMeetingLocation("");
    setNewDetails("");
    setNewMeetingSummary("");
    setSelectedBusinessCompanyId("");
  };

  const handleDeleteMeeting = (index) => {
    dispatch(fetchDeleteMeeting(meetings[index].id));
  };
  const handleEditMeeting = (index) => {
    setSelectedMeetingIndex(index);
    setShowEditModal(true);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchCompanyInfo());
      dispatch(fetchMeetingsInfo());
    }
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h1>Meetings Page</h1>
      <div className="mb-4">
        <h2>List of All Meetings</h2>
        <ListGroup>
          {meetings.length ? (
            meetings.map((meeting, index) => (
              <Row key={index}>
                <ListGroup.Item className="d-flex justify-content-between align-items-center m-1">
                  <Col xs={2}>
                    <h5>{meeting.business_name}</h5>
                  </Col>
                  <Col xs={2}>
                    <p>{meeting.details}</p>
                  </Col>
                  <Col xs={4}>
                    <p>{meeting.summary}</p>
                  </Col>
                  <Col xs={1}>
                    <p>{meeting.location}</p>
                  </Col>
                  <Col xs={1}>
                    <p>{meeting.date}</p>
                  </Col>
                  <Col xs={2} className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditMeeting(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteMeeting(index)}
                    >
                      Delete
                    </Button>
                  </Col>
                </ListGroup.Item>
              </Row>
            ))
          ) : (
            <p>There are no scheduled meetings</p>
          )}
        </ListGroup>
        <EditMeetingModal
          meeting={meetings[selectedMeetingIndex]}
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
        />
      </div>

      <div>
        <h2>Add New Meeting Summary Form</h2>
        <Form>
          <Form.Group className="mb-3" controlId="meetingBusinessName">
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              as="select"
              value={selectedBusinessCompanyId}
              onChange={(e) => setSelectedBusinessCompanyId(e.target.value)}
            >
              <option value="">Select your company</option>
              {companies.length > 0 ? (
                companies.map((business) => (
                  <option key={business?.id} value={business?.id}>
                    {business?.name}
                  </option>
                ))
              ) : (
                <option>No companies available</option>
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="meetingLocation">
            <Form.Label>Details</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter meeting location"
              value={newDetails}
              onChange={(e) => setNewDetails(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="meetingDate">
            <Form.Label>Date</Form.Label>
            <br />
            <DatePicker
              selected={newMeetingDate}
              onChange={(date) => setNewMeetingDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select date"
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="meetingLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter meeting location"
              value={newMeetingLocation}
              onChange={(e) => setNewMeetingLocation(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="meetingSummary">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter meeting summary"
              value={newMeetingSummary}
              onChange={(e) => setNewMeetingSummary(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddMeeting}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default MeetingsPage;
