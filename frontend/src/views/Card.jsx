import React from "react";
import "./Card.css"; // Import the CSS file for styling

function Card() {
  return (
    <div className="card">
      <div className="card-content">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <div className="card-actions">
        <button className="btn btn-primary">Button</button>
      </div>
    </div>
  );
}

export default Card;
