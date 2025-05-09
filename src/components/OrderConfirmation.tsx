import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="container">
      <h1>Potwierdzenie Zamówienia</h1>
      <p style={{ fontSize: '1.2rem', color: '#1a202c', marginBottom: '2rem' }}>
        Dziękujemy za złożenie zamówienia! Otrzymasz potwierdzenie wkrótce.
      </p>
      <Link to="/" className="button btn-blue">
        Wróć do listy produktów
      </Link>
    </div>
  );
};

export default OrderConfirmation;