"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment/moment";
import { Item } from "@radix-ui/react-dropdown-menu";
import MyOrderItem from "./_components/MyOrderItem";

const MyOrders = () => {
  //const user = JSON.parse(sessionStorage.getItem("user"));
  // const jwt = sessionStorage.getItem("jwt");
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      setUser(storedUser);
      const storedJwt = sessionStorage.getItem("jwt");
      setJwt(storedJwt);
      if (!storedJwt) {
        router.replace("/");
      }
      getMyOrders(storedUser?.id, storedJwt);
    }
  }, []);

  const getMyOrders = async (id, jwt) => {
    const orderList_ = await GlobalApi.getMyOrders(id, jwt);
    setOrderList(orderList_);
  };

  return (
    <div>
      <h2 className=" p-3 bg-primary text-xl font-bold text-center">
        My Orders
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-primary">Order History</h2>
      </div>
      <div className="py-8 mx-7 md:mx-20">
        {orderList.length == 0 ? (
          <h2>
            No order history found for <b>{user?.username}</b>
          </h2>
        ) : (
          orderList.map((order, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger>
                <div className="border p-2 bg-slate-100 flex justify-evenly gap-16">
                  <h2>
                    <span className="font-bold mr-2"> Order Date:</span>
                    {moment(order.createdat).format("MMMM Do YYYY")}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Total Amount :</span> $
                    {order.totalOrderAmount}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Status :</span>
                    {order.status}
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {order.orderItemList.map((orderLineItem, i) => (
                  <MyOrderItem orderItem={orderLineItem} key={i} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
