import React from "react";
import { FaCircle, FaCog, FaPhoneAlt, FaTh, FaUser } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
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
    </div>
  );
}
