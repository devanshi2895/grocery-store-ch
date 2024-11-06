import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CartItemList = ({ cartItemList, deleteCartItem }) => {
  // const deleteCartItem = () => {};

  return (
    <div>
      <div className="h-[600px] overflow-auto">
        {cartItemList.map((cart, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 mb-5"
          >
            <div className="flex gap-6 items-center">
              <Image
                src={cart.image}
                alt={cart.name}
                width={90}
                height={90}
                className="boarder p-2"
              />
              <div>
                <h2 className="font-bold">{cart.name}</h2>
                <h2>Quantity {cart.quantity}</h2>
                <h2 className="text-lg font-bold">${cart.amount}</h2>
                {/* <h2>${cart.quantity * cart.amount}</h2> */}
              </div>
            </div>
            <TrashIcon
              className="cursor-pointer"
              onClick={() => deleteCartItem(cart.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
