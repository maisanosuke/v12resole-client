import axios from 'axios';
const serverUrl = 'https://v12resole-api.onrender.com'//'http://localhost:3001/';

const axiosBase = axios.create({
    baseURL: serverUrl,
})

export const sendPostSignup = (data) => axiosBase.post('user/signup', data);
export const sendPostLogin = (data) => axiosBase.post('user/login', data);
export const sendPostForgotPassword = (data) => axiosBase.post('user/forgot-password', data);
export const sendPatchUpdateUser = (data) => axiosBase.patch('user/update', data);

export const sendPostCheckout = (items) => axiosBase.post('/checkout', items);

export const getStripeSession = (id) => axiosBase.get(`/order/${id}`);

export const sendPostOrder = (session_id, user_id, items) => axiosBase.post(`/order/${session_id}`, {user_id: user_id, items: items});
// {
//     console.log(`before sending: sessionId: ${session_id}, user_id: ${user_id} items received in server: ${items}`);
//     return axiosBase.post(`/order/${session_id}`, {user_id: user_id, items: items})
// };

export const getOrderHistory = (id) => axiosBase.get(`/order-history/${id}`);

export const sendPostEmailSignup = (data) => axiosBase.post('/', data);

export const sendContactUsEmail = (data) => axiosBase.post('/message', data);


    //   fetch("http://localhost:3001/checkout", {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({items: cartItems}),
    //   })
    //   .then(res =>{
    //     if(!res.ok) return res.json.then(json => Promise.reject(json));//if res.ok === false, fail the promise so it can catch error
    //     else return res.json();
    //   })
    //   .then(jsonData => window.location.href = jsonData.url)
    //   .catch(e => {
    //     console.log(e);
    //   })