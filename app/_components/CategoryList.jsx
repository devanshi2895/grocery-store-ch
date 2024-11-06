import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryList = ({ categories }) => {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl">Shop By Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 p-3">
        {categories.map((cat, index) => (
          <Link
            href={"/products-category/" + cat.attributes.name}
            key={index}
            className="flex flex-col items-center bg-green-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-green-200"
          >
            <Image
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                cat?.attributes?.icon?.data?.attributes?.url
              }
              unoptimized={true}
              alt="icon"
              width={50}
              height={50}
              className="group-hover:scale-125 transition-all ease-in-out"
            />
            <h2 className="text-green-800">{cat.attributes.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
