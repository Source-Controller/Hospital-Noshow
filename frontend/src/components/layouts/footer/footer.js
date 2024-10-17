import React, { useState } from "react";
import EduRes from "./eduRes";
import "./footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../elements/modal/myModal";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const Footer = ({user}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <footer>
      <EduRes />
      <div>
        <p>Site design ©2024 user contributions licensed under CC BY-SA.</p>
        <a href="#" onClick={openModal}>
          <p>Feedback</p>
          <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
        </a>
        <CustomModal isOpen={modalIsOpen} closeModal={closeModal} user={user}/>
      </div>
    </footer>
  );
};

export default Footer;
