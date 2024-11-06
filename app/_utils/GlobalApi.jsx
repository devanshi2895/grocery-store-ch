const { default: axios } = require("axios");
const axiosClient = axios.create({
  //baseURL: "https://inspiring-actor-5fe41d2def.strapiapp.com/api",
  baseURL: "http://localhost:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSlider = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => {
    return resp.data.data;
  });

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProductList = () =>
  axiosClient.get("/products?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((resp) => {
      return resp.data.data;
    });

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const signinUser = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userid, jwt) =>
  axiosClient
    .get(
      "/user-carts?filters[userid][$eq]=" +
        userid +
        "&[populate][products][populate][images][populate][0]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;

      const cartItemsList = data.map((item, index) => ({
        name: item.attributes.products?.data[0].attributes.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image:
          item.attributes.products?.data[0].attributes.images.data[0].attributes
            .url,
        actualPrice: item.attributes.products?.data[0].attributes.mrp,
        id: item.id,
        product: item.attributes.products?.data[0].id,
      }));
      return cartItemsList;
    });

const deleteCartItem = (id, jwt) =>
  axiosClient.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getMyOrders = (userid, jwt) =>
  axiosClient
    .get(
      "/orders?filters[userid][$eq]=" +
        userid +
        "&populate[orderItemList][populate][product][populate][images]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      const orderList = data.map((item, index) => ({
        id: item.id,
        totalOrderAmount: item.attributes.totalOrderAmount,
        paymentis: item.attributes.paymentid,
        createdat: item.attributes.createdAt,
        orderItemList: item.attributes.orderItemList,
        status: item.attributes.status,
      }));
      return orderList;
    });

// const getCartItems = (userid, jwt) =>
//   axiosClient
//     .get("/user-carts?filters[userid][$eq]=" + userid + "&populate=*", {
//       headers: {
//         Authorization: "Bearer " + jwt,
//       },
//     })
//     .then((resp) => {
//       return resp.data.data;
//     });

export default {
  getCategory,
  getSlider,
  getCategoryList,
  getProductList,
  getProductsByCategory,
  registerUser,
  signinUser,
  addToCart,
  getCartItems,
  deleteCartItem,
  createOrder,
  getMyOrders,
};
