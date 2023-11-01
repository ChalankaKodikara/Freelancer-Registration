import React, { useEffect, useState } from "react";
import axios from "axios";
import Model from "./Model";
import Cookies from "js-cookie";

function Card() {
  const [jobData, setJobData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const useremail = Cookies.get("useremail");

  useEffect(() => {
    axios
      .get("https://backfreelance.tfdatamaster.com/api/auth/jobs")
      .then((response) => {
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

  const filteredJobs = jobData.filter((job) => job.email === useremail);

  return (
    <div className="row">
      {filteredJobs.map((job, index) => (
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

              <div>
                <strong>Status: </strong>
                {job.status}
              </div>

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
