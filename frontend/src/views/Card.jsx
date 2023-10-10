import React, { useEffect, useState } from "react";
import axios from "axios";
import Model from "./Model"; // Import the Model component

function Card() {
  const [jobData, setJobData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/jobs").then((response) => {
      setJobData(response.data);
    });
  }, []);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setShowModal(false);
  };

  return (
    <div className="row">
      {jobData.map((job, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div className="card">
            <img src={job.imageURL} className="card-img-top" alt="" />
            <div className="card-body">
              <h4 className="card-title" style={{ fontWeight: "bold" }}>
                {job.jobTitle}
              </h4>
              <h5 className="card-text" style={{ lineHeight: "0.7" }}>
                {job.freelancerName}
              </h5>
              <h5 className="card-text" style={{ lineHeight: "0.7" }}>
                {job.location}
              </h5>
              <p className="card-text" style={{ lineHeight: "0.7" }}>
                {job.jobDescription}
              </p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleViewDetails(job)}
              >
                View More Details
              </button>
            </div>
          </div>
        </div>
      ))}

      {showModal && (
        <Model
          job={selectedJob}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Card;
