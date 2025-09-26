// app/components/FeatureCards.tsx
import React from "react";
import { CategoryItem } from "../data/categoryData";

interface FeatureCardsProps {
  data: CategoryItem[];
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ data }) => {
  return (
    <section className="py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-8 text-center sm:text-left"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full rounded-xl mb-6"
            />
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-gray-400">{item.description}</p>
            <a
              href="#"
              className="mt-4 inline-block text-cyan-300 hover:text-cyan-400 transition-colors"
            >
              Learn more &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
