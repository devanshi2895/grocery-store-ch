import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

async function ProductCategory({ params }) {
  const productList = await GlobalApi.getProductsByCategory(
    params?.categoryName
  );

  const categories = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {params.categoryName}
      </h2>
      <TopCategoryList
        categories={categories}
        selectedCategory={params?.categoryName}
      />
      <div className="p-5 md:p-10">
        <ProductList products={productList} />
      </div>
    </div>
  );
}

export default ProductCategory;
