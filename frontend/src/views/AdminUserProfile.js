import React, { useState } from "react";
import Cookies from "js-cookie";
import { Card, Form, Container, Row, Col, Button } from "react-bootstrap";

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

  const [errors, setErrors] = useState({
    freelancerName: "",
    jobTitle: "",
    location: "",
    contact: "",
    jobCategories: "",
    jobDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error when the user starts typing in the field
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Check for required fields
    for (const key in formData) {
      if (formData[key].trim() === "") {
        newErrors[key] = "This field is required.";
      }
    }

    // Validate the 'contact' field to only allow numbers and symbols
    const contactPattern = /^[0-9\s+\-()]+$/;
    if (!contactPattern.test(formData.contact)) {
      newErrors.contact = "Invalid characters in the contact field.";
    }

    // You can add more specific validation for other fields, like 'location' and 'jobCategories'

    // If there are errors, set them in the state and don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit the form as the data is valid
      try {
        const response = await fetch(
          "https://backfreelance.tfdatamaster.com/api/auth/jobs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.status === 201) {
          alert("Job request submitted successfully!");
          setFormData({ ...initialFormData });
        } else {
          alert("Error submitting job request.");
        }
      } catch (error) {
        console.error("Error submitting job request:", error);
        alert("Error submitting job request. Please try again later.");
      }
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
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <Form.Label>Freelancer Name</Form.Label>
                      <Form.Control
                        name="freelancerName"
                        value={formData.freelancerName}
                        onChange={handleChange}
                        placeholder="Enter Your Name"
                        type="text"
                      />
                      <Form.Text className="text-danger">
                        {errors.freelancerName}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Enter Your Job Title"
                        type="text"
                      />
                      <Form.Text className="text-danger">
                        {errors.jobTitle}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter Your Location or Country"
                        type="text"
                      />
                      <Form.Text className="text-danger">
                        {errors.location}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>Contact</Form.Label>
                      <Form.Control
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Enter Your Contact Details"
                        type="text"
                      />
                      <Form.Text className="text-danger">
                        {errors.contact}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Job Categories</Form.Label>
                  <Form.Control
                    name="jobCategories"
                    value={formData.jobCategories}
                    onChange={handleChange}
                    placeholder="Enter Your Job Categories"
                    type="text"
                  />
                  <Form.Text className="text-danger">
                    {errors.jobCategories}
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    placeholder="Here can be your job description"
                    as="textarea"
                    rows="4"
                  />
                  <Form.Text className="text-danger">
                    {errors.jobDescription}
                  </Form.Text>
                </Form.Group>
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                >
                  Send Job Request
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default User;
