"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  // const user = JSON.parse(sessionStorage.getItem("user"));
  // const jwt = sessionStorage.getItem("jwt");
  const [cartItemList, setCartItemList] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const router = useRouter();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      setUser(storedUser);
      const storedJwt = sessionStorage.getItem("jwt");
      setJwt(storedJwt);

      if (!storedJwt) {
        router.push("/signin");
      }

      getCartItems(storedUser?.id, storedJwt);
    }
  }, []);

  const getCartItems = async (id, jwt) => {
    if (id !== undefined) {
      const cartItems = await GlobalApi.getCartItems(id, jwt);
      setCartItemCount(cartItems?.length);
      setCartItemList(cartItems);
    }
  };

  const [totalAmt, setTotalAmt] = useState(0);
  const [paymentTotal, setPaymentTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setTotalAmt(total);
    setPaymentTotal(total * 0.9 + 15);
  }, [cartItemList]);

  const onApprove = () => {
    const payload = {
      data: {
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        totalOrderAmount: paymentTotal,
        userid: user?.id,
        paymentid: (Math.floor(Math.random() * (1000 - 1)) + 1).toString(),
        orderItemList: cartItemList,
      },
    };

    GlobalApi.createOrder(payload, jwt).then((resp) => {
      toast(`Order (trx-id: ${payload?.data.paymentid}) placed successfully!`);
      cartItemList.forEach((item, index) => {
        GlobalApi.deleteCartItem(item.id, jwt).then((r) => {});
      });
      router.replace("/order-confirmation");
    });
  };

  return (
    <div className="">
      <h2 className=" p-3 bg-primary text-xl font-bold text-center">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className="grid grid-rows-2 mt-3">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({cartItemCount})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              SubTotal : <span>${totalAmt}</span>
            </h2>
            <hr></hr>
            <h2 className="flex justify-between">
              Delivery : <span>$15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%): <span>${totalAmt * 0.9}</span>
            </h2>
            <hr></hr>
            <h2 className="font-bold flex justify-between">
              Total : <span>${paymentTotal}</span>
            </h2>
            {totalAmt > 1 && (
              <Button
                onClick={() => onApprove()}
                disabled={!(username && email && zip)}
              >
                Payment <ArrowBigRight />
              </Button>
            )}
            {/* <PayPalButtons
              style={{ layout: "horizontal" }}
              onApprove={() => onApprove}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalAmt * 0.9 + 15,
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
