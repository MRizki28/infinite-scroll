import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";


interface Products {
  id: number,
  title: string;
}

const App: React.FC = () => {
  const [product, setProduct] = useState<Products[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true);

  const getAllData = async (page: any) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products?skip=${(page - 1) * 30}`)
      setProduct(prevProduct => [...prevProduct, ...response.data.products]);
      setTotal(response.data.total);
      console.log(response)
      setHasMore(response.data.total > page * 30);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllData(page)
  }, [page])


  const fetchMoreData = () => {
    if (product.length >= total) {
      setHasMore(false); 
      return;
    }
    setPage(prevPage => prevPage + 1);
  };


  return (
    <div>
      <h1>Products List</h1>
      <InfiniteScroll
        dataLength={product.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more products</p>}
      >
        <ul>
          {product.map((products, index) => (
            <li key={index}>
              <h3>{index + 1}. {products.title}</h3>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default App