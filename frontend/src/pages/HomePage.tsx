import Logout from "@/components/auth/Logout";
import { Button } from "@/components/ui/button";
import useProductStore from "@/stores/useProductStore";
import { useEffect } from "react";

const HomePage = () => {
  const { products, getProduct } = useProductStore();
  const handleGetProduct = async () => {
    await getProduct();
  };

  useEffect(() => {
    console.log(products);
  }, [products]);
  return (
    <>
      <Logout />
      <Button onClick={handleGetProduct}>Lấy dánh sách sản phẩm</Button>
    </>
  );
};

export default HomePage;
