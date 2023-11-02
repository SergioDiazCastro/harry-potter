import { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';

export const Main = () =>{

    const[books, setBooks] = useState([]);
    const[cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        fetch("https://fathomless-falls-16151-f2ccead2eed5.herokuapp.com/api/books")
        .then(response => response.json())
        .then(data => setBooks(data))
    }, [])

    const addToCart = (book) => {
        setCart([...cart, book]);
      };

    const calculateCartTotal = (cart) => {
        return cart.reduce((total, item) => total + item.price, 0);
      };

      useEffect(() => {
        setCartTotal(calculateCartTotal(cart)); // Actualiza el total del carrito
      }, [cart]);

      return (
        <>
          <div className="flex flex-col items-center">
        <div className="flex gap-20 m-6">
          <h1 className="text-white">Libros disponibles</h1>
        </div>
        {books.map((book) => (
          <div className="bg-gray-900 flex mb-4 h-[350px] w-[50%] gap-2 p-2" key={book.id}>
            <div className="self-center">
              <img className="w-[200px]" src={book.image} alt={book.name} />
            </div>
            <div className="p-4 flex flex-col gap-4">
              <h1 className="text-white">{book.name}</h1>
              <p className="text-white">Precio: {book.price}</p>
              <p className="text-white">Stock: {book.stock}</p>
              <div className="flex gap-4">
                <p className="text-white">Agregar al carrito</p>
                <button className="bg-slate-100" onClick={() => addToCart(book)}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
        <Cart cart={cart} calculateCartTotal={calculateCartTotal} /> {/* Pasa el carrito y la función addToCart al componente Cart */}
      </div>
        </>
      );
    };




