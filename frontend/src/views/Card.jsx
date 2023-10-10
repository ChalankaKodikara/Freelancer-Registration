import React, { useEffect, useState } from "react";
import axios from "axios";

function Card() {
  const [jobData, setJobData] = useState([]);

  // Fetch job details from the API when the component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/jobs").then((response) => {
      setJobData(response.data); // Assuming the job data is an array
    });
  }, []);

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

              <button type="button" className="btn btn-primary">
                View More Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
