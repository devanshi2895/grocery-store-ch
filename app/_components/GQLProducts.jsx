"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import ProductItemCH from "./ProductItemCH";
import { GET_GROCERRY_PRODUCTS } from "../_utils/graphql-pcm";

const GQLProducts = () => {
  const { loading, error, data } = useQuery(GET_GROCERRY_PRODUCTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (
    data?.allM_PCM_ProductFamily?.results != undefined &&
    data.allM_PCM_ProductFamily.results.length > 0
  ) {
    const allProducts = data.allM_PCM_ProductFamily.results.flatMap(
      (family) => family.pCMProductFamilyToProduct.results
    );

    return (
      <div className="mt-5">
        <h2 className="text-green-600 font-bold text-2xl">
          Our Popoular Products from CH
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
          {allProducts.map(
            (product, index) => (
              // product.someCondition ? (
              <ProductItemCH key={index} product={product} />
            )
            // ) : null
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>No Products </p>
      </div>
    );
  }

  // if (
  //   data?.allM_PCM_ProductFamily?.results != undefined &&
  //   data.allM_PCM_ProductFamily.results.length > 0
  // ) {
  //   return (
  //     <div className="mt-5">
  //       <h2 className="text-green-600 font-bold text-2xl">
  //         Our Popoular Products from CH
  //       </h2>
  //       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
  //         {data?.allM_PCM_ProductFamily?.results.map((product, index) => (
  //           <ProductItemCH key={index} product={product} />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <p>No Products </p>
  //     </div>
  //   );
  // }
};

export default GQLProducts;
