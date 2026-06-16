import { create } from "zustand";
import type { ProductState } from "@/types/store";
import productService from "@/services/productServices";
import { toast } from "sonner";

const useProductStore = create<ProductState>((set, get) => ({
  loading: false,
  products: [],

  getProduct: async () => {
    try {
      set({ loading: true });

      const products = await productService.getProduct();

      set({ products });
      toast.success("Lấy sản phẩm thành công");

      console.log("abc", get().products);
    } catch (error) {
      console.error(error);
      toast.error("Lấy sản phẩm không thành công");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;
