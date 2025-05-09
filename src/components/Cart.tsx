import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product.price.main + item.product.price.fractional / 100;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, productName: string) => {
    console.error(`Failed to load image for ${productName}: ${e.currentTarget.src}`);
    e.currentTarget.src = '/assets/images/placeholder.jpg';
  };

  return (
    <div className="container">
      <h1>Koszyk Zakupów</h1>
      <Link to="/" className="button btn-gray">
        Powrót do produktów
      </Link>
      {cart.length === 0 ? (
        <p>Koszyk jest pusty</p>
      ) : (
        <>
          <div className="cart">
            {cart.map((item) => (
              <div key={item.product.id} className="cart-item">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  onError={(e) => handleImageError(e, item.product.name)}
                />
                <div className="cart-item-details">
                  <h2>{item.product.name}</h2>
                  <p>
                    Cena jednostkowa: {item.product.price.main},{item.product.price.fractional.toString().padStart(2, '0')} PLN
                  </p>
                  <p>
                    Suma: {((item.product.price.main + item.product.price.fractional / 100) * item.quantity).toFixed(2)} PLN
                  </p>
                </div>
                <div className="cart-controls">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="button btn-yellow"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="button btn-yellow"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="button btn-red"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
            <p className="cart-total">Całkowity koszt: {getTotal()} PLN</p>
          </div>
          <Link to="/order-summary" className="button btn-blue">
            Przejdź do podsumowania
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;