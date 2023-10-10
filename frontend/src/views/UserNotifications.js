import React, { useEffect, useState } from "react";
import NotificationAlert from "react-notification-alert";
import { Card, Container, Row, Col, Modal, Button } from "react-bootstrap";
import Axios from "axios";

function UserNotifications() {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationAlertRef = React.useRef(null);

  // Function to fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await Axios.get("/api/notifications"); // Replace with your actual backend API endpoint
      const fetchedNotifications = response.data; // Assuming your API returns notifications in the response

      // Set the notifications in state
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Call the fetchNotifications function when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Function to display a notification
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Light Bootstrap Dashboard React</b> - a beautiful
            freebie for every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Notifications</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="6">
                <h5>
                  <small>Nothing yet ttt</small>
                </h5>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <div className="places-buttons">
              {/* Render notifications */}
              {notifications.map((notification, index) => (
                <Alert key={index} variant={notification.type}>
                  {notification.message}
                </Alert>
              ))}
            </div>
          </Card.Body>
        </Card>
        <Modal
          className="modal-mini modal-primary"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-bulb-63"></i>
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Always have an access to your profile</p>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Back
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
      </Container>
    </>
  );
}

export default UserNotifications;
