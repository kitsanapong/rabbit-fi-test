import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useLocations = () => {
  const [locations, setLocations] = useState([])
  useEffect(() => {
    console.log('load useLocations')
    axios.get('https://5efabb3a80d8170016f758ee.mockapi.io/locations')
    .then((res) => {
      setLocations(res.data)
    })
    .catch((e) => {
      console.log(e)
    })
  }, [])
  return locations
}

export default useLocations