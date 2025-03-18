import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import Footer from "./_components/Footer";
import GQLProducts from "./_components/GQLProducts";
import CategoryListCH from "./_components/CategoryListCH";
import SliderCH from "./_components/SliderCH";

export default async function Home() {
  // const sliders = await GlobalApi.getSlider();

  return (
    <div className="p-5 md:p-10 px-16">
      {/* <Slider sliders={sliders} /> */}
      <SliderCH />
      <CategoryListCH />
      <GQLProducts />
      {/* Banner */}
      <Image
        src="/banner.png"
        alt="banner"
        height={300}
        width={1000}
        className="w-full h-[400px] object-contain"
      />
      <Footer />
    </div>
  );
}
