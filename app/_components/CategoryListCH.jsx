"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GET_GROCERRY_PRODUCTFAMALIES } from "../_utils/graphql-pcm";
import { useQuery } from "@apollo/client";

const CategoryListCH = () => {
  const { loading, error, data } = useQuery(GET_GROCERRY_PRODUCTFAMALIES);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (
    data?.allM_PCM_ProductFamily?.results != undefined &&
    data.allM_PCM_ProductFamily.results.length > 0
  ) {
    const categories = data.allM_PCM_ProductFamily.results;
    //console.log(categories);
    return (
      <div className="mt-5">
        <h2 className="text-green-600 font-bold text-2xl">
          Shop By Category CH
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 p-3">
          {categories.map((cat, index) => (
            <Link
              href={"/products-category/" + cat.productFamilyName}
              key={index}
              className="flex flex-col items-center bg-green-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-green-200"
            >
              <Image
                src={
                  cat.pCMProductFamilyToMasterAsset?.results[0]?.urls[
                    Object.keys(
                      cat.pCMProductFamilyToMasterAsset?.results[0]?.urls
                    )[0]
                  ]?.url
                }
                //src="https://res.cloudinary.com/dvytn4u6i/image/upload/v1710678972/004_vegetables_5494192878.png"
                unoptimized={true}
                alt="icon"
                width={50}
                height={50}
                className="group-hover:scale-125 transition-all ease-in-out"
              />
              <h2 className="text-green-800">
                {cat.productFamilyLabel["en-US"]}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // return (
  //   <div className="mt-5">
  //     <h2 className="text-green-600 font-bold text-2xl">Shop By Category</h2>
  //     <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 p-3">
  //       {categories.map((cat, index) => (
  //         <Link
  //           href={"/products-category/" + cat.attributes.name}
  //           key={index}
  //           className="flex flex-col items-center bg-green-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-green-200"
  //         >
  //           <Image
  //             src={cat?.attributes?.icon?.data?.attributes?.url}
  //             unoptimized={true}
  //             alt="icon"
  //             width={50}
  //             height={50}
  //             className="group-hover:scale-125 transition-all ease-in-out"
  //           />
  //           <h2 className="text-green-800">{cat.attributes.name}</h2>
  //         </Link>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default CategoryListCH;
