import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Product, CartItem } from '../types';
import productsData from '../data/products.json';


const basePath = process.env.PUBLIC_URL || '';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const cartIconRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    
    const updatedProducts = productsData.map((product) => ({
      ...product,
      image: `${basePath}${product.image}`,
    }));
    setProducts(updatedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });

   
    if (cartIconRef.current) {
      cartIconRef.current.classList.add('pulse');
      setTimeout(() => {
        cartIconRef.current?.classList.remove('pulse');
      }, 300);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    const priceA = a.price.main + a.price.fractional / 100;
    const priceB = b.price.main + b.price.fractional / 100;
    return priceA - priceB;
  });

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, productName: string) => {
    console.error(`Failed to load image for ${productName}: ${e.currentTarget.src}`);
    e.currentTarget.src = `${basePath}/assets/images/placeholder.jpg`;
  };

  return (
    <div className="container">
      <h1>Lista Produktów</h1>
      <Link to="cart" className="cart-icon" ref={cartIconRef}>
        <i className="fas fa-shopping-cart"></i>
        {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
      </Link>
      <div className="filters">
        <div>
          <label>Sortuj: </label>
          <select onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}>
            <option value="name">Nazwa</option>
            <option value="price">Cena</option>
          </select>
        </div>
      </div>
      <div className="product-grid">
        {sortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => handleImageError(e, product.name)}
            />
            <h2>{product.name}</h2>
            <p>
              Cena: {product.price.main},{product.price.fractional.toString().padStart(2, '0')} PLN
            </p>
            <button
              onClick={() => addToCart(product)}
              className="button btn-green"
            >
              Dodaj do koszyka
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;