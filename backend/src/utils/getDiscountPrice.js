const getDiscountPrice = (isSale, price, discountPercent) => {
  return isSale && discountPercent > 0
    ? price - (price * discountPercent) / 100
    : price;
};

export default getDiscountPrice;
