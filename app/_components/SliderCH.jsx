"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import { GET_GROCERRY_SLIDER } from "../_utils/graphql-pcm";

const SliderCH = () => {
  const { loading, error, data } = useQuery(GET_GROCERRY_SLIDER);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (
    data?.allM_Asset?.results != undefined &&
    data.allM_Asset.results.length > 0
  ) {
    return (
      <div>
        <Carousel>
          <CarouselContent>
            {data.allM_Asset.results.map((sli, index) => (
              <CarouselItem key={index}>
                <Image
                  src={sli?.urls[Object.keys(sli?.urls)[0]]?.url}
                  alt="slider"
                  width={1000}
                  height={400}
                  className="w-full md:h-[400px] object-cover rounded-2xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }
};

export default SliderCH;
