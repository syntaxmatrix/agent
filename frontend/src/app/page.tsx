// app/page.tsx
import React from "react";
import Navbar from "./components/Header";
import Hero from "./components/Hero";
import Features from "@/app/components/Features";
import FeatureCards from "@/app/components/FeatureCards";
import { landingData } from "@/app/data/landingData";
import { categoryData } from "@/app/data/categoryData";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero data={landingData.hero} />
      <Features data={landingData.features} />
      <FeatureCards data={categoryData} />
    </>
  );
}
