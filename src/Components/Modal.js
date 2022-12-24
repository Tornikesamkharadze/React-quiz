import React from "react";
import { useGlobalContext } from "../Global/context";

const Modal = () => {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();
  return (
    <div
      className={`${
        isModalOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content">
        <h1>{`${correct ? "congrats" : "You should learn more :)"}`}</h1>
        <p>
          you answered {((correct / questions.length) * 100).toFixed(0)}%
          questions correctly
        </p>
        <button onClick={() => closeModal()} className="close-btn">
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
