import React, { useState, useEffect } from "react";
import { Container, Row, Card, Col, Table, Dropdown } from "react-bootstrap";
import axios from "axios";

function Jobtable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("https://backfreelance.tfdatamaster.com/api/auth/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (jobId, newStatus) => {
    const token = localStorage.getItem("authToken");

    axios
      .put(
        `https://backfreelance.tfdatamaster.com/api/auth/jobs/${jobId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const updatedJob = response.data;
        setData((prevData) =>
          prevData.map((job) => (job._id === updatedJob._id ? updatedJob : job))
        );
      })
      .catch((error) => {
        console.error("Error updating job status:", error);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">User Details</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Freelancer Name</th>
                      <th>Job Title</th>
                      <th>Email</th>
                      <th>Job Categories</th>
                      <th>Job Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="6">Loading...</td>
                      </tr>
                    ) : (
                      data.map((job) => (
                        <tr key={job._id}>
                          <td>{job.freelancerName}</td>
                          <td>{job.jobTitle}</td>
                          <td>{job.email}</td>
                          <td>{job.jobCategories}</td>
                          <td>{job.jobDescription}</td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="info"
                                id="dropdown-basic"
                              >
                                {job.status}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleStatusChange(job._id, "Approved")
                                  }
                                >
                                  Approved
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleStatusChange(job._id, "Denied")
                                  }
                                >
                                  Denied
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleStatusChange(job._id, "Pending")
                                  }
                                >
                                  Pending
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Jobtable;
