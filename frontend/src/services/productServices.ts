import api from "../lib/axios.ts";

const productService = {
  getProduct: async () => {
    const res = await api.get("/products", { withCredentials: true });
    return res.data.products;
  },
};

export default productService;
