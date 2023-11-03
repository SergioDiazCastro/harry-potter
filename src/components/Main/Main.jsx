import { useEffect, useState } from 'react';


export const Main = () => {

  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);



  /*modal*/
  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };
  /* cierre modal */


  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmPurchase = () => {
    alert("compra realizada")
    emptyCart();
    setIsConfirmationModalOpen(false);
  };

  //funcion para vaciar el carrito
  const emptyCart = () => {
    setCart([]);
  };

  useEffect(() => {
    fetch("https://fathomless-falls-16151-f2ccead2eed5.herokuapp.com/api/books")
      .then(response => response.json())
      .then(data => setBooks(data))
  }, [])

  const addToCart = (book) => {
  if (book.stock > 0) {
    setCart([...cart, book]);
    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks];
      const bookIndex = updatedBooks.findIndex((b) => b.id === book.id);
      if (bookIndex !== -1) {
        updatedBooks[bookIndex].stock -= 1;
      }
      if (book.stock == 0) {
        updatedBooks[bookIndex].stock = "prodcuto agotado"
      }
      return updatedBooks;
    });
  }

  };

  const calculateCartTotal = (cart) => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  //funcion para eliminar libros
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); 
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  useEffect(() => {
    setCartTotal(calculateCartTotal(cart));
  }, [cart]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex gap-36 mb-5 justify-center w-full h-14 items-center bg-[#1E6FD9]">
          <h1 className="text-white">Libros disponibles</h1>
          <button className='text-white' onClick={openCartModal}><img className='w-[35px]' src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" /></button>

        </div>
        {books.map((book) => (
          <div className="bg-[#010326] border-4 rounded-xl border-[#020F59] flex mb-4 h-[280px] w-[50%] gap-2 p-2" key={book.id}>
            <div className="self-center">
              <img className="w-[150px]" src={book.image} alt={book.name} />
            </div>
            <div className="p-4 flex flex-col gap-4">
              <h1 className="text-white">{book.name}</h1>
              <p className="text-white">Precio: {book.price}</p>
              <p className="text-white">Stock: {book.stock}</p>
              <div className="flex gap-4">
                <p className="text-white">Agregar al carrito</p>
                <button className="bg-white p-[1px] rounded-sm" onClick={() => addToCart(book)}>Agregar</button>
              </div>
            </div>
          </div>
        ))}

        {/* modal */}
        {isCartModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center ">
            <div className="bg-[#03178C] p-[5px] rounded-xl ">
              <button className='text-white font-bold p-1' onClick={closeCartModal}>Cerrar</button>
              {/* Contenido del carrito */}
              <div className='bg-[#010326] p-2 overflow-y-auto h-[500px] max-h-[400px]'>
                <h2 className='text-[#6783e9]'>Carrito de compras</h2>
                <hr />
                <ul>
                  {cart.map((item, index) => (
                    <li className='text-white flex justify-between' key={index}>
                      {item.name} - ${item.price}
                      <button className='ml-4 text-red-700' onClick={() => handleRemoveFromCart(index)}>
                        <img className='w-[20px]' src="https://cdn-icons-png.flaticon.com/512/216/216658.png" alt="" /> </button>
                    </li>
                  ))}
                </ul>
                <p className='text-[#6783e9]'>Total del carrito: ${calculateCartTotal(cart)}</p>
                <button className='text-white font-extrabold mt-3' onClick={handleOpenConfirmationModal}>Confirmar Compra</button>

                {/* Modal de confirmación */}
                {isConfirmationModalOpen && (
                  <div className="mt-2">
                    <div className="flex flex-col ">
                      <p className='text-white'>¿Estás seguro de que deseas confirmar la compra?</p>
                      <button className='text-green-500' onClick={handleConfirmPurchase}>Confirmar</button>
                      <button className='text-red-600' onClick={handleCloseConfirmationModal}>Cancelar</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};




