import React from 'react';

const Cart = ({ cart, calculateCartTotal }) => {
  return (
    <div className="bg-slate-400">
      <h2>Carrito de compras</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <p>Total del carrito: ${calculateCartTotal(cart)}</p> {/* Utiliza la función directamente */}
    </div>
)};

export default Cart;
