import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

Modal.setAppElement("#root");

const FeedbackListModal = ({ isOpen, closeModal, estimateList }) => {
  
  const headers = ['id','email','username','rate','msg']
  
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="EstimationList Modal"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          height: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: "20px",
          backgroundColor: "#212529",
        },
      }}
    >
      <h4>Estimation of physicians:</h4>
      <table className="estimate-list">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {estimateList &&
            estimateList.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.rate}</td>
                <td>{item.msg}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="modal-btn">
        <button id="mClose" onClick={closeModal}>
          Close
        </button>
        {/* <button id="mSend" onClick={handleSend}>
          Send
        </button> */}
      </div>
      
    </Modal>
  );
};

export default FeedbackListModal;
