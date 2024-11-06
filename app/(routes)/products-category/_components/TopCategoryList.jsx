import Link from "next/link";
import Image from "next/image";
import React from "react";

const TopCategoryList = ({ categories, selectedCategory }) => {
  return (
    <div className=" flex gap-5 p-3 overflow-auto mx-7 md:mx-20 justify-center">
      {categories.map((cat, index) => (
        <Link
          href={"/products-category/" + cat.attributes.name}
          key={index}
          className={`flex flex-col items-center bg-green-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-green-600 w-[150px] min-w-[100px] ${
            selectedCategory == cat.attributes.name && "bg-green-600 text-white"
          }`}
        >
          <Image
            src={cat?.attributes?.icon?.data?.attributes?.url}
            unoptimized={true}
            alt="icon"
            width={50}
            height={50}
            className="group-hover:scale-125 transition-all ease-in-out"
          />
          <h2
            className={`text-green-800 group-hover:text-white ${
              selectedCategory == cat.attributes.name && "text-white"
            }`}
          >
            {cat.attributes.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default TopCategoryList;
