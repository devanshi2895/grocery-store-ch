"use client";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import ProductItemCH from "./ProductItemCH";

const ProductListCH = ({ selectedCategory }) => {
  const GET_GROCERRY_BYPRODUCTFAMALY = gql`
    query GetProd($familyName: String!) {
      allM_PCM_ProductFamily(
        where: { productFamilyName_contains: $familyName }
      ) {
        results {
          productFamilyName
          productFamilyLabel
          pCMProductFamilyToProduct {
            results {
              productLabel
              productShortDescription
              productLongDescription
              productNumber
              productPrice
              marketingNote
              pCMProductToMasterAsset {
                results {
                  urls
                }
              }
              pCMProductFamilyToProduct {
                results {
                  productFamilyLabel
                }
              }
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_GROCERRY_BYPRODUCTFAMALY, {
    variables: { familyName: selectedCategory },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (
    data?.allM_PCM_ProductFamily?.results != undefined &&
    data.allM_PCM_ProductFamily.results.length > 0
  ) {
    const products = data.allM_PCM_ProductFamily.results.flatMap(
      (family) => family.pCMProductFamilyToProduct.results
    );
    return (
      <div className="mt-5">
        <h2 className="text-green-600 font-bold text-2xl">
          Our Popoular Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
          {products.map((product, index) => (
            <ProductItemCH key={index} product={product} />
          ))}
        </div>
      </div>
    );
  }
};

export default ProductListCH;
