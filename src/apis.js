import axios from 'axios'
function summitCart() {
  axios({
    method: 'post',
    url: 'https://5efabb3a80d8170016f758ee.mockapi.io/cart',
    data: {
      date: "2020-07-30",
      product: 2,
      locations: [
        {
          id: 3,
          quantity: 750
        },
        {
          id: 6,
          quantity: 1250
        }
      ]
    }
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