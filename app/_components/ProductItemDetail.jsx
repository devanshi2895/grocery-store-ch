"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle, LoaderIcon, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

const ProductItemDetail = ({ productDetail }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState("");
  // const jwt = sessionStorage.getItem("jwt");
  // const user = JSON.parse(sessionStorage.getItem("user"));
  const [productTotalPrice, setProductTotalPrice] = useState(
    productDetail.attributes.sellingPrice
      ? productDetail.attributes.sellingPrice
      : productDetail.attributes.mrp
  );

  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const addToCart = () => {
    setLoader(true);
    if (!jwt) {
      router.push("/signin");
      setLoader(false);
      return;
    }
    const data = {
      data: {
        quantity: quantity,
        amount: quantity * productTotalPrice,
        products: productDetail?.id,
        users_permissions_user: user?.id,
        userid: user?.id,
      },
    };

    GlobalApi.addToCart(data, jwt).then(
      (resp) => {
        toast("Added to cart");
        setUpdateCart(!updateCart);
        setLoader(false);
      },
      (e) => {
        console.log(e);
        toast("Error while adding into the cart");
        setLoader(false);
      }
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      setUser(storedUser);
      const storedJwt = sessionStorage.getItem("jwt");
      setJwt(storedJwt);
    }
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={productDetail?.attributes?.images?.data[0]?.attributes?.url}
        alt={productDetail?.attributes?.name}
        height={300}
        width={300}
        className="bg-slate-200 h-[320px] w-[300px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">
          {productDetail?.attributes?.name}
        </h2>
        <h2 className="text-sm text-gray-500">
          {productDetail?.attributes?.description}
        </h2>
        <div className="flex gap-3">
          {productDetail?.attributes?.sellingPrice && (
            <h2 className="font-bold text-2xl">
              ${productDetail?.attributes?.sellingPrice}
            </h2>
          )}
          <h2
            className={`font-bold text-2xl ${
              productDetail?.attributes?.sellingPrice &&
              "line-through  text-gray-500"
            }`}
          >
            ${productDetail?.attributes?.mrp}
          </h2>
        </div>
        <h2 className="font-medium text-lg">
          Quantity ({productDetail?.attributes?.itemQuantityType})
        </h2>
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
          {productDetail?.attributes?.categories?.data[0]?.attributes?.name}
        </h2>
      </div>
    </div>
  );
};

export default ProductItemDetail;
