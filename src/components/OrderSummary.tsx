import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

const OrderSummary = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product.price.main + item.product.price.fractional / 100;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  const placeOrder = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    navigate('/order-confirmation');
  };

  return (
    <div className="container">
      <h1>Podsumowanie Zamówienia</h1>
      <Link to="/cart" className="button btn-gray">
        Powrót do koszyka
      </Link>
      {cart.length === 0 ? (
        <p>Brak produktów w zamówieniu</p>
      ) : (
        <>
          <div className="cart">
            {cart.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div>
                  <h2>{item.product.name}</h2>
                  <p>Ilość: {item.quantity}</p>
                  <p>
                    Cena jednostkowa: {item.product.price.main},{item.product.price.fractional.toString().padStart(2, '0')} PLN
                  </p>
                  <p>
                    Suma: {((item.product.price.main + item.product.price.fractional / 100) * item.quantity).toFixed(2)} PLN
                  </p>
                </div>
              </div>
            ))}
            <p className="cart-total">Całkowita kwota: {getTotal()} PLN</p>
          </div>
          <button
            onClick={placeOrder}
            className="button btn-green"
          >
            Złóż zamówienie
          </button>
        </>
      )}
    </div>
  );
};

export default OrderSummary;