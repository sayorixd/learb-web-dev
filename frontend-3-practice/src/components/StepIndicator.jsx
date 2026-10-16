export default function StepIndicator() {
  return (
    <section className="step-indicator">
      <div className="step">
        <div className="circle">
          <span>1</span>
        </div>
        <span className="step-label">Мастер</span>
        <div className="step-line"></div>
      </div>
      <div className="step">
        <div className="circle">
          <span>2</span>
        </div>
        <span className="step-label">Услуга</span>
        <div className="step-line"></div>
      </div>
      <div className="step active">
        <div className="circle">
          <span>3</span>
        </div>
        <span className="step-label">Календарь</span>
        <div className="step-line"></div>
      </div>
      <div className="step">
        <div className="circle">
          <span>4</span>
        </div>
        <span className="step-label">Контакты</span>
        <div className="step-line"></div>
      </div>
      <div className="step">
        <div className="circle">
          <span>5</span>
        </div>
        <span className="step-label">Оформление</span>
      </div>
    </section>
  );
}
