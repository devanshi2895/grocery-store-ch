"use client";
import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  LayoutGrid,
  Search,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";
import { toast } from "sonner";

const Header = () => {
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);

  // const isLogin = sessionStorage.getItem("jwt") ? true : false;
  // const user = JSON.parse(sessionStorage.getItem("user"));
  // const jwt = sessionStorage.getItem("jwt");

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState("");

  const router = useRouter();

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };

  const getCartItems = async () => {
    if (user?.id !== undefined) {
      const cartItems = await GlobalApi.getCartItems(user.id, jwt);

      setCartItemCount(cartItems?.length);
      setCartItemList(cartItems);
      setUpdateCart(!updateCart);
    }
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setTotalAmt(total);
  }, [cartItemList]);

  useEffect(() => {
    getCategoryList();

    if (sessionStorage) {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const storedJwt = sessionStorage.getItem("jwt");
      if (storedUser) setUser(storedUser);
      if (storedJwt) {
        setJwt(storedJwt);
        setIsLogin(true);
      }
    }
  }, []);

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  const onLogout = () => {
    sessionStorage.clear();
    router.push("/signin");
  };

  const deleteCartItem = (id) => {
    const cartitem = GlobalApi.deleteCartItem(id, jwt).then((resp) => {
      toast("Cart item removed!");
      getCartItems();
    });
  };

  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={100}
            className="cursor-pointer"
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 hidden cursor-pointer">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((cat, index) => (
              <Link
                key={index}
                href={"/products-category/" + cat.attributes.name}
              >
                <DropdownMenuItem className="flex gap-4 items-center cursor-pointer">
                  <Image
                    src={cat?.attributes?.icon?.data?.attributes?.url}
                    unoptimized={true}
                    alt="icon"
                    width={23}
                    height={23}
                  />
                  <h2>{cat.attributes.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      {/* <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBasket className="h-7 w-7" />
              <span className="bg-primary text-white px-2 rounded-full">
                {cartItemCount}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2">
                My cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  deleteCartItem={deleteCartItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute w-[90%] bottom-6 flex flex-col">
                <h2 className="text-lg font-bold flex justify-between">
                  Subtotal <span>${totalAmt}</span>
                </h2>
                <Button
                  onClick={() => {
                    router.push(jwt ? "/checkout" : "/signin");
                  }}
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div> */}
    </div>
  );
};

export default Header;
