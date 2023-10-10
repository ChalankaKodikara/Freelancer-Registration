import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";

function Jobtable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("http://localhost:5000/api/auth/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Job Details</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        {/* <th className="border-0">ID</th> */}
                        <th className="border-0">freelancer Name</th>
                        <th className="border-0">Job Title</th>
                        <th className="border-0">Email</th>
                        <th className="border-0">Job Categories</th>
                        <th className="border-0">Job Discription</th>
                        <th className="border-0">Status</th>
                        <th className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((jobs) => (
                        <tr key={jobs._id}>
                          {/* <td>{jobs._id}</td> */}
                          <td>{jobs.freelancerName}</td>
                          <td>{jobs.jobTitle}</td>
                          <td>{jobs.email}</td>
                          <td>{jobs.jobCategories}</td>
                          <td>{jobs.jobDescription}</td>
                          <div class="dropdown">
                            <button
                              class="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Status{" "}
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a class="dropdown-item" href="#">
                                  Approved
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  DenieD
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* <button type="button" class="btn btn-outline-primary">
                            View job
                          </button> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Jobtable;
