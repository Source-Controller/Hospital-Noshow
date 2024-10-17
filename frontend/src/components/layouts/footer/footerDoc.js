import React, { useEffect, useState } from "react";
import EduRes from "./eduRes";
import "./footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../elements/modal/myModal";
import FeedbackListModal from "../../elements/modal/feedbackList";
import axios from "axios";

const FooterDoc = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [estimateList, setEstimateList] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
    axios.get('http://127.0.0.1:8000/user/getestimate/')
      .then(res => {
        setEstimateList(res.data.users);
        console.log("estimate",res.data.users);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // useEffect(() => {
  //   fetch('https://127.0.01:8000/user/getestimate')
  //   .then(res => {
  //     setEstimateList(res.data);
  //   })
  //   .catch((err) => {console.log(err)});
  // },[estimateList])

  // useEffect(() => {
    
  // }, [estimateList]);

  return (
    <footer>
      <EduRes />
      <div>
        <p>Site design ©2024 user contributions licensed under CC BY-SA.</p>
        <a href="#" onClick={openModal}>
          <p>Feedback</p>
          <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
        </a>
        <FeedbackListModal isOpen={ modalIsOpen } closeModal={closeModal} estimateList={estimateList} />
      </div>
    </footer>
  );
};

export default FooterDoc;
