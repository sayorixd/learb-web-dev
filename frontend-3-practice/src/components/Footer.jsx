export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-info">
        <div className="footer-cols">
          <div className="footer-col">
            <div className="logo">Barber Shop</div>
            <div className="footer-description">Дружелюбное описание</div>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">
              <b>Контакты</b>
            </div>
            <div className="footer-col-info">
              <div className="footer-col-info-line">
                <i className="fa fa-map-marker"></i>
                ул. Садовая, 15, Москва
              </div>
              <div className="footer-col-info-line">
                <i className="fa fa-phone"></i>
                +7 (495) 123-45-67
              </div>
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">
              <b>Режим работы</b>
            </div>
            <div className="footer-col-info">
              <div>Пн-Пт: 9:00 - 21:00</div>
              <div>Сб-Вс: 10:00 - 19:00</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; 2026. Все права защищены.</p>
          <a className="footer-link" href="#">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
