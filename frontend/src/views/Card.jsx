import React, { useEffect, useState } from "react";
import { TERipple } from "tw-elements-react";
import axios from "axios";
import "./Card.css";

function Card() {
  const [jobData, setJobData] = useState([]);

  // Fetch job details from the API when the component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/jobs").then((response) => {
      setJobData(response.data); // Assuming the job data is an array
    });
  }, []);

  return (
    <div>
      {jobData.map((job, index) => (
        <div className="card" key={index}>
          <TERipple>
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={job.imageURL} // Make sure "imageURL" matches the field name from your API response
                alt=""
              />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
          </TERipple>
          <div className="card-content">
            <h5 className="card-title">{job.jobTitle}</h5>
            <p className="card-text">{job.jobDescription}</p>
            <TERipple>
              <button type="button" className="btn">
                Button
              </button>
            </TERipple>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
