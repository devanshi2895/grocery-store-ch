"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle, LoaderIcon, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

const ProductItemDetailCH = ({ productDetail }) => {
  const [quantity, setQuantity] = useState(1);

  const [loader, setLoader] = useState(false);

  const productLabel = productDetail.productLabel["en-US"];
  const productDescr = productDetail.productLongDescription["en-US"];
  const assetResults = productDetail.pCMProductToMasterAsset?.results;
  const imageUrl =
    assetResults.length > 0 && assetResults[0].urls
      ? assetResults[0]?.urls[Object.keys(assetResults[0]?.urls)[0]]?.url
      : ""; // Safely access the URL
  const productPrice = productDetail.productPrice;
  const familyLabel =
    productDetail.pCMProductFamilyToProduct.results[0].productFamilyLabel[
      "en-US"
    ];
  const sellingPrice = productDetail.marketingNote;
  const [productTotalPrice, setProductTotalPrice] = useState(
    sellingPrice ? sellingPrice : productDetail.productPrice
  );

  const quantityNote = productDetail.productNumber;

  const quantityNumber = quantityNote.replace(/\D/g, "");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      {imageUrl != undefined && (
        <Image
          src={imageUrl}
          alt={productLabel}
          height={300}
          width={300}
          className="bg-slate-200 h-[320px] w-[300px] object-contain rounded-lg"
        />
      )}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{productLabel}</h2>
        <h2
          className="text-sm text-gray-500"
          dangerouslySetInnerHTML={{ __html: productDescr }}
        />

        <div className="flex gap-3">
          {sellingPrice && (
            <h2 className="font-bold text-2xl">${sellingPrice}</h2>
          )}
          <h2
            className={`font-bold text-2xl ${
              sellingPrice && "line-through  text-gray-500"
            }`}
          >
            ${productPrice}
          </h2>
        </div>
        <h2 className="font-medium text-lg">Quantity ({quantityNote})</h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex gap-10 items-center px-5">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className=" text-2xl font-bold">
              = ${(quantity * productTotalPrice).toFixed(2)}
            </h2>
          </div>

          <Button
            className="flex gap-3"
            onClick={() => addToCart()}
            disabled={loader}
          >
            <ShoppingBasket />
            {loader ? <LoaderCircle className="animate-spin" /> : "Add To Cart"}
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category: </span>
          {familyLabel}
        </h2>
      </div>
    </div>
  );
};

export default ProductItemDetailCH;
