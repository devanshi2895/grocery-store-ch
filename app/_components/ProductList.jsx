import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl">
        Our Popoular Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
