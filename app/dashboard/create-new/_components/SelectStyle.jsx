"use client";
import Image from "next/image";
import React, { useState } from "react";

const SelectStyle = ({onUserSelect}) => {
  const styleOptions = [
    {
      name: "Realistic",
      image: "/real.jpg",
    },
    {
      name: "Cartoon",
      image: "/cartoon.jpg",
    },
    {
      name: "Comic",
      image: "/comic.jpg",
    },
    {
      name: "WaterColor",
      image: "/watercolor.jpg",
    },
    {
      name: "GTA",
      image: "/gta.png",
    },
  ];

  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="mt-8 bg-gradient-to-r from-blue-50/50 to-teal-50/50 dark:from-blue-900/10 dark:to-teal-900/10 p-6 rounded-lg">
      <h2 className="font-bold text-xl text-teal-600 dark:text-teal-400 flex items-center">
        <span className="bg-teal-100 dark:bg-teal-800/30 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-600 dark:text-teal-400">2</span>
        Style
      </h2>
      <p className="text-gray-600 dark:text-gray-400 ml-10">Select your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-4">
        {styleOptions.map((item, index) => (
          <div
            key={index}
            className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl shadow-sm overflow-hidden ${
              selectedOption == item.name ? "ring-4 ring-teal-400 dark:ring-teal-500 transform scale-105" : "hover:shadow-md"
            }`}
          >
            <Image
              src={item.image}
              height={100}
              width={100}
              alt={item.name}
              className="h-40 object-cover rounded-lg w-full"
              onClick={() => {
                setSelectedOption(item.name);
                onUserSelect('imageStyle', item.name)
              }}
            />
            <div className="absolute p-2 bg-gradient-to-t from-black/80 to-transparent bottom-0 w-full text-white text-center">
              <span className="font-medium">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
