import HouseSearchBro from "@/components/HouseSearchBro";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <main className="bg-[#C5E3FC] md:w-4/5 w-full h-[1000px] md:rounded-3xl">
        {/* <h1 className="md:text-3xl sm:text-2xl xs:text-xl lg:text-9xl font-bold text-center text-[#293A48] font-['Konkhmer Sleokchher'] relative w-fit ml-16 mt-8">
          HomeFinder
          <p className="sm:text-md xs:text-sm md:text-2xl font-normal text-center text-[#293A48] absolute right-0 bottom-[-15px]">By Elite Estates</p>
        </h1> */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center text-[#293A48] font-['Konkhmer Sleokchher'] my-8 mx-3">
          HomeFinder
        </h1>
        <div className="flex flex-col md:flex-row justify-center ">
          <HouseSearchBro className="w-[100%] h-[400px] lg:scale-[1.6] xl:scale-[1.8]"/>
          <SearchBar />
        </div>
      </main>
    </div>
  );
}
