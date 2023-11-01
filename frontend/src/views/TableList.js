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

function TableList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("https://backfreelance.tfdatamaster.com/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data); // Access the "users" property
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
                <Card.Title as="h4">User Details</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">First Name</th>
                        <th className="border-0">Last Name</th>
                        <th className="border-0">Country</th>
                        <th className="border-0">Contact Number</th>
                        <th className="border-0">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((user) => (
                        <tr key={user._id}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.country}</td>
                          <td>{user.contactNumber}</td>
                          <td>{user.email}</td>
                          <button type="button" class="btn btn-outline-primary">
                            View job
                          </button>
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

export default TableList;
