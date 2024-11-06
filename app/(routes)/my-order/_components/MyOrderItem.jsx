import Image from "next/image";
import React from "react";

const MyOrderItem = ({ orderItem }) => {
  return (
    <div className=" w-[50%]">
      <div className="grid grid-cols-4 mt-3 items-center">
        <Image
          src={
            orderItem.product.data.attributes?.images?.data[0].attributes?.url
          }
          unoptimized={true}
          alt="image"
          width={80}
          height={80}
          className="bg-gray-100 p-5 rounded-md border"
        />
        <div className="">
          <h2>{orderItem.product.data.attributes.name}</h2>
          <h2>Item Price : {orderItem.product.data.attributes.sellingPrice}</h2>
        </div>
        <h2>Quantity : {orderItem.quantity}</h2>
        <h2>Price : {orderItem.amount}</h2>
      </div>
      <hr className="mt-3"></hr>
    </div>
  );
};

export default MyOrderItem;
