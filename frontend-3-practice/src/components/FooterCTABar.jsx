export default function FooterCTABar({ timeOutput, onNext }) {


  return (
    <>
      <div className="footer-cta-bar">
        <div className="selected-time-output">{timeOutput}</div>
        <button
          className="button-primary"
          disabled={timeOutput == ""}
          onClick={onNext}
        >
          Далее &rarr;
        </button>
      </div>
    </>
  );
}
