"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React from "react";
import TopCategoryListCH from "../_components/TopCategoryListCH";
import ProductListCH from "@/app/_components/ProductListCH";
import { useQuery, gql } from "@apollo/client";
import { GET_GROCERRY_PRODUCTFAMALIES } from "@/app/_utils/graphql-pcm";

function ProductCategory({ params }) {
  const { loading, error, data } = useQuery(GET_GROCERRY_PRODUCTFAMALIES);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (
    data?.allM_PCM_ProductFamily?.results != undefined &&
    data.allM_PCM_ProductFamily.results.length > 0
  ) {
    const categories = data.allM_PCM_ProductFamily.results;
    const selectedCategoryDetail = categories.filter((cat) => {
      return cat.productFamilyName === params?.categoryName;
    });

    return (
      <div>
        <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
          {selectedCategoryDetail[0]?.productFamilyLabel["en-US"]}
        </h2>
        <TopCategoryListCH
          categories={categories}
          selectedCategory={params?.categoryName}
        />
        <div className="p-5 md:p-10">
          <ProductListCH selectedCategory={params?.categoryName} />
        </div>
      </div>
    );
  }
}

export default ProductCategory;
