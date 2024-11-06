import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliders = await GlobalApi.getSlider();
  const categories = await GlobalApi.getCategoryList();
  const products = await GlobalApi.getProductList();

  return (
    <div className="p-5 md:p-10 px-16">
      <Slider sliders={sliders} />
      <CategoryList categories={categories} />
      <ProductList products={products} />
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
