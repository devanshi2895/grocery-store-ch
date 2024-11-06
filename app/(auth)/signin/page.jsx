"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import React, { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loader, setLoader] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwt = sessionStorage.getItem("jwt");

      if (jwt) router.push("/");
    }
  }, []);

  const onSignin = () => {
    setLoader(true);
    GlobalApi.signinUser(email, password).then(
      (resp) => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("user", JSON.stringify(resp.data.user));
          sessionStorage.setItem("jwt", resp.data.jwt);
          toast("Login successfully!");
          router.push("/");
        }

        setLoader(false);
      },
      (e) => {
        toast(e?.response?.data?.error?.message);
        setLoader(false);
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
        <h2 className="font-bold text-3xl">Sign in to Account</h2>
        <h2 className="text-gray-500">
          Enter your Email and Password to sign in
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            type="email"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => onSignin()} disabled={!(email || password)}>
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign In"}
          </Button>
        </div>
        <p className="mt-3 font-bold">
          Dont have an Account ?
          <Link className="text-blue-500" href="/create-account">
            Click here to create new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
