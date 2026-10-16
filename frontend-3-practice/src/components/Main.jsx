import { useState } from "react";
import { createPortal } from "react-dom";
import Calendar from "./Calendar";
import FooterCTABar from "./FooterCTABar";
import StepIndicator from "./StepIndicator";
import SuccessModal from "./SuccessModal";

export default function Main() {
  const [timeOutput, setTimeOutput] = useState();
  const [modalInfo, setModalInfo] = useState({ show: false, text: "" });

  function setShowModal(show) {
    setModalInfo((prev) => {
      return { show: show, text: prev.text };
    });
  }
  function setModalText(text) {
    setModalInfo((prev) => {
      return { show: prev.show, text: text };
    })
  }

  return (
    <main className="main">
      <StepIndicator />

      <div className="content">
        <div className="header-row">
          <button className="back-button">← Назад</button>
          <span className="title">Выберите время записи</span>
        </div>

        <Calendar setTimeOutput={setTimeOutput} setModalText={setModalText} />
        <FooterCTABar
          onNext={() => setShowModal(true)}
          timeOutput={timeOutput}
        />
      </div>

      {modalInfo.show &&
        createPortal(
          <SuccessModal
            text={modalInfo.text}
            onClose={() => setShowModal(false)}
          />,
          document.querySelector("#place-modal"),
        )}
    </main>
  );
}
