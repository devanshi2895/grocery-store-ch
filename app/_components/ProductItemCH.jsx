import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductItemDetailCH from "./ProductItemDetailCH";

const ProductItemCH = ({ product }) => {
  const productLabel = product.productLabel["en-US"];

  const assetResults = product.pCMProductToMasterAsset.results;
  const imageUrl =
    assetResults.length > 0 && assetResults[0].urls
      ? assetResults[0]?.urls[Object.keys(assetResults[0]?.urls)[0]]?.url
      : ""; // Safely access the URL

  const productPrice = product.productPrice;
  const quantityNote = product.productNumber;
  const sellingPrice = product.marketingNote;
  const quantityNumber = quantityNote.replace(/\D/g, "");
  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-md transition-all ease-in-out">
      {imageUrl != undefined && (
        <Image
          src={imageUrl}
          alt={productLabel}
          height={200}
          width={500}
          className="h-[200px] w-[200px] object-contain"
        />
      )}

      <h2 className="font-bold text-lg ">{productLabel}</h2>

      <div className="flex gap-3">
        {sellingPrice && <h2 className="font-bold text-lg">${sellingPrice}</h2>}
        <h2
          className={`font-bold text-lg ${
            sellingPrice && "line-through  text-gray-500"
          }`}
        >
          ${productPrice}
        </h2>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary"
          >
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add items to cart</DialogTitle>
            <DialogDescription>
              <ProductItemDetailCH productDetail={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItemCH;
