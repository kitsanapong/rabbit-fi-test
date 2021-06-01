import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useProducts = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get('https://5efabb3a80d8170016f758ee.mockapi.io/products')
    .then((res) => {
      setProducts(res.data)
    })
    .catch((e) => {
      console.log(e)
    })
  }, [])
  return products
}

export default useProducts