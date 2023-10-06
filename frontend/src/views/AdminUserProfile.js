import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Cookies from "js-cookie";

const useremail = Cookies.get("useremail");

function User() {
  const [formData, setFormData] = useState({
    freelancerName: "",
    jobTitle: "",
    email: useremail,
    location: "",
    contact: "",
    jobCategories: "",
    jobDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        alert("Job request submitted successfully!");
        setFormData({ ...formData, ...initialFormData });
      } else {
        alert("Error submitting job request.");
      }
    } catch (error) {
      console.error("Error submitting job request:", error);
      alert("Error submitting job request. Please try again later.");
    }
  };

  const initialFormData = {
    freelancerName: "",
    jobTitle: "",
    email: "",
    location: "",
    contact: "",
    jobCategories: "",
    jobDescription: "",
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">JOB </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Freelancer Name </label>
                        <Form.Control
                          name="freelancerName"
                          value={formData.freelancerName}
                          onChange={handleChange}
                          placeholder="Enter Your Name"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Job Title</label>
                        <Form.Control
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleChange}
                          placeholder=" Your Job Title"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      {/* <Form.Group>
                        <label>Email address</label>
                        <Form.Control
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter Your Email Address"
                          type="email"
                          disabled
                        />
                      </Form.Group> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Location</label>
                        <Form.Control
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Enter Your Location or Country"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Contact</label>
                        <Form.Control
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                          placeholder="Enter Your Contact Details"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Job Categories</label>
                        <Form.Control
                          name="jobCategories"
                          value={formData.jobCategories}
                          onChange={handleChange}
                          placeholder="Enter Your Job Categories"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Job Description</label>
                        <Form.Control
                          name="jobDescription"
                          value={formData.jobDescription}
                          onChange={handleChange}
                          placeholder="Here can be your job description"
                          as="textarea"
                          rows="4"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Send Job Request
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
