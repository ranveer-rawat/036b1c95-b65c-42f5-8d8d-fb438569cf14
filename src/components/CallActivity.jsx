import { useEffect, useState } from "react";
import { IoMdArchive } from "react-icons/io";
import { MdUnarchive } from "react-icons/md";
import { withRouter } from "react-router-dom";
import { fetchCalls, updateCallArchiveStatus } from "../api/api";
import Footer from "./CallFooter.jsx";
// import "../css/callActivity.css";

const CallActivity = ({ history }) => {
  const [calls, setCalls] = useState([]);
  const [showArchived, setShowArchived] = useState(false);

  console.log(calls.length, "archive");
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

  const handleArchiveCall = async (callId, isArchived) => {
    try {
      await updateCallArchiveStatus(callId, isArchived);
      loadCalls();
    } catch (error) {
      console.error("Error updating call archive status:", error);
    }
  };

  const handleArchiveAll = async () => {
    try {
      await Promise.all(
        calls
          .filter((call) => !call.is_archived)
          .map((call) => updateCallArchiveStatus(call.id, true))
      );
      loadCalls();
    } catch (error) {
      console.error("Error archiving calls:", error);
    }
  };

  const handleUnarchiveAll = async () => {
    try {
      await Promise.all(
        calls
          .filter((call) => call.is_archived)
          .map((call) => updateCallArchiveStatus(call.id, false))
      );
      loadCalls();
    } catch (error) {
      console.error("Error unarchiving calls:", error);
    }
  };

  const handleCallSelect = async (call) => {
    try {
      history.push(`/call/${call.id}`);
    } catch (error) {
      console.error("Error fetching call details:", error);
    }
  };

  return (
    <div className="mid-container">
      {/* Header */}
      <div className="header">
        <h2 className="title">Activity</h2>
        <div className="tabs">
          <span
            className={!showArchived ? "active-tab" : ""}
            onClick={() => setShowArchived(false)}
          >
            Inbox ({calls.filter((call) => !call.is_archived).length})
          </span>
          <span
            className={showArchived ? "active-tab" : ""}
            onClick={() => setShowArchived(true)}
          >
            Archived ({calls.filter((call) => call.is_archived).length})
          </span>
        </div>
      </div>
      {!showArchived ? (
        <button onClick={handleArchiveAll} className="archive-button">
          <IoMdArchive className="archive-icon" /> Archive all calls
        </button>
      ) : (
        <button onClick={handleUnarchiveAll} className="unarchive-button">
          <MdUnarchive className="unarchive-icon" /> Unarchive all calls
        </button>
      )}

      <div className="call-list">
        {calls
          .filter((call) => call.is_archived === showArchived)
          .map((call) => (
            <div className="call-entry" key={call.id}>
              <p className="date">
                {new Date(call.created_at).toLocaleDateString()}
              </p>
              <div className="details">
                <div onClick={() => handleCallSelect(call)}>
                  <p className="phone">
                    {call.from}{" "}
                    {call.direction === "missed" && (
                      <span className="badge">Missed</span>
                    )}
                  </p>
                  <p className="subtext">tried to call {call.to}</p>
                </div>
                <p className="time">
                  {new Date(call.created_at).toLocaleTimeString()}
                </p>
                <button
                  onClick={() => handleArchiveCall(call.id, !call.is_archived)}
                  className="archive-single-button"
                >
                  {call.is_archived ? (
                    <MdUnarchive className="unarchive-icon" />
                  ) : (
                    <IoMdArchive className="archive-icon" />
                  )}
                </button>
              </div>
            </div>
          ))}
      </div>
      {/* <div className="footer">
        <span className="icon phone">
          <FaPhoneAlt />
          <span className="phone-badge">12</span>
        </span>
        <FaUser className="icon" />
        <div className="grid-button">
          <FaTh />
        </div>
        <FaCog className="icon" />
        <span className="status circle">
          <FaCircle className="status-icon" />
        </span>
      </div> */}
      <Footer />
    </div>
  );
};

export default withRouter(CallActivity);
