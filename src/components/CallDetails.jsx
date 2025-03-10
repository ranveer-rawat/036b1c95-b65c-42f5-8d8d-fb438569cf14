import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { withRouter } from "react-router-dom";
import { fetchCallDetails } from "../api/api";
// import "../css/callActivity.css";
import Footer from "./CallFooter.jsx";

const CallDetails = ({ match, history }) => {
  const { id } = match.params;
  const [callDetails, setCallDetails] = useState(null);
  const [calls, setCalls] = useState([]);
  useEffect(() => {
    loadCalls();
  }, []);

  const loadCalls = async () => {
    try {
      const data = await fetchCalls();
      setCalls(data);
    } catch (error) {
      console.error("Error fetching calls:", error);
    }
  };

  const handleCallSelect = async () => {
    try {
      const details = await fetchCallDetails(id);
      setCallDetails(details);
    } catch (error) {
      console.error("Error fetching call details:", error);
    }
  };

  useEffect(() => {
    handleCallSelect();
  }, [id]);

  return (
    <>
      <div className="call-details">
        <span className="call-details-header">
          <button className="back-button">
            <FaArrowLeftLong
              onClick={() => history.goBack()}
              className="back-btn-icon"
            />
          </button>
          <h2 className="call-details-heading">Call Details</h2>
        </span>
        <p className="call-details-info">
          <strong>From:</strong> {callDetails?.from}
        </p>
        <p className="call-details-info">
          <strong>To:</strong> {callDetails?.to}
        </p>
        <p className="call-details-info">
          <strong>Direction:</strong> {callDetails?.direction}
        </p>
        <p className="call-details-info">
          <strong>Duration:</strong> {callDetails?.duration} seconds
        </p>
        <p className="call-details-info">
          <strong>Call Type:</strong> {callDetails?.call_type}
        </p>
        <p className="call-details-info">
          <strong>Via:</strong> {callDetails?.via}
        </p>
        <p className="call-details-info">
          <strong>Date:</strong>{" "}
          {new Date(callDetails?.created_at).toLocaleDateString()}
        </p>
        <p className="call-details-info">
          <strong>Time:</strong>{" "}
          {new Date(callDetails?.created_at).toLocaleTimeString()}
        </p>
      </div>

      <Footer />
    </>
  );
};

export default withRouter(CallDetails);
