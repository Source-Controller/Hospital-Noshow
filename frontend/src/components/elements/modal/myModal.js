import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTired, faSadTear, faMeh, faSmile, faGrinStars } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement("#root");

const CustomModal = ({ isOpen, closeModal, user }) => {
  // const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [rate, setRate] = useState("");
  const username = user.username;

  const handleSend = async () => {
    const data = {
      rate,
      msg,
      username
    };
    console.log(data);
    try{
      const response = await axios.post("http://127.0.0.1:8000/user/feedback/", data)
      console.log("Success:", response.data);
      alert("Success!");
    }
    catch(error){
      console.error("Error:",error);
      alert("Error");
    }
    // await axios.post("http://127.0.0.1:8000/user/feedback/", data)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //     alert("Sucess!", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     alert('Error',error)
    //   });
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Custom Modal"
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
      <h4>How satisfied are you with the product?</h4>
      <span>Give it a smile rating: {rate}</span>
      <div className="emojies">
        <a
          href="#"
          onClick={() => {
            setRate("Very Bad");
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-face-tired" />
        </a>
        <a
          href="#"
          onClick={() => {
            setRate("Bad");
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-face-sad-tear" />
        </a>
        <a
          href="#"
          onClick={() => {
            setRate("Normal");
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-face-meh" />
        </a>
        <a
          href="#"
          onClick={() => {
            setRate("Good");
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-face-smile" />
        </a>
        <a
          href="#"
          onClick={() => {
            setRate("Very Good");
          }}
        >
          <FontAwesomeIcon icon={"fa-solid fa-face-grin-stars"} />
        </a>
      </div>
      {/* <input
        id="mInput"
        type="text"
        placeholder="Email Address"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      /> */}
      <textarea
        id="mTxtarea"
        placeholder="Feedback!"
        onChange={(e) => {
          setMsg(e.target.value);
        }}
        value={msg}
      />
      <div className="modal-btn">
        <button id="mClose" onClick={closeModal}>
          Close
        </button>
        <button id="mSend" onClick={handleSend}>
          Send
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
