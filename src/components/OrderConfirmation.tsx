import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';

const basePath = process.env.PUBLIC_URL || '';

const OrderSummary = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return [];
    const parsedCart = JSON.parse(savedCart);
    return parsedCart.map((item: CartItem) => ({
      ...item,
      product: {
        ...item.product,
        image: `${basePath}${item.product.image}`,
      },
    }));
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product.price.main + item.product.price.fractional / 100;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  const handleConfirmOrder = () => {
  
    localStorage.setItem('cart', JSON.stringify([])); 
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
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  onError={(e) => e.currentTarget.src = `${basePath}/assets/images/placeholder.jpg`}
                />
                <div className="cart-item-details">
                  <h2>{item.product.name}</h2>
                  <p>
                    Cena jednostkowa: {item.product.price.main},{item.product.price.fractional.toString().padStart(2, '0')} PLN
                  </p>
                  <p>Ilość: {item.quantity}</p>
                  <p>
                    Suma: {((item.product.price.main + item.product.price.fractional / 100) * item.quantity).toFixed(2)} PLN
                  </p>
                </div>
              </div>
            ))}
            <p className="cart-total">Całkowity koszt: {getTotal()} PLN</p>
          </div>
          <Link to="/order-confirmation" className="button btn-blue" onClick={handleConfirmOrder}>
            Potwierdź zamówienie
          </Link>
        </>
      )}
    </div>
  );
};

export default OrderSummary;