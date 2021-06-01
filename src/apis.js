import axios from 'axios'
function summitCart(payload) {
  axios({
    method: 'post',
    url: 'https://5efabb3a80d8170016f758ee.mockapi.io/cart',
    data: payload,
  })
  .then((res) => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  }) 
}

export default {
  summitCart,
}