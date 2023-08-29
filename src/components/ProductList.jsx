import React, { useState, useEffect } from "react";
import '../styles/listStyle.css';

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        if (Array.isArray(data)) {
          setProductList(data);
          setTotalPages(Math.ceil(data.length / maxProductCount));
        } else {
          console.error('A resposta da API não contém uma lista de produtos válida:', data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const maxProductCount = 4;
  const startIndex = (currentPage - 1) * maxProductCount;
  const endIndex = startIndex + maxProductCount;

  const displayedProducts = productList.slice(startIndex, endIndex);

  return (
    <>
      <h1 className='mainTitle'>panda shop</h1>
      <div className='productContainer'>
        {displayedProducts.map(product => (
          <div className='productCard' key={product.id}>
            <img className='productImage' src={product.image} alt={product.title} />
            <div className='productSpecs'>
              <h3 className='productTitle'>{product.title}</h3>
              <p className='productPrice'>Preço: R$ {product.price.toFixed(2)}</p>
              <p className='productCategory'>Categoria: {product.category}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='pagination'>
        <button className='button' disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button className='button' disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Próxima</button>
      </div>
    </>
  );
}

export default ProductList;
