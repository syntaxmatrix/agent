// app/components/Features.tsx
import React from "react";
import { FeatureItem } from "../data/landingData";

interface FeaturesProps {
  data: FeatureItem[];
}

const Features: React.FC<FeaturesProps> = ({ data }) => {
  return (
    <section className="py-24">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Powerful AI Features
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Everything you need to build, deploy, and scale autonomous AI agents
          that work 24/7
        </p>
      </div>

      {/* Features + Image */}
      <div className="mt-16 flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0">
        {/* Left Column: Features */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
          {data.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full ${feature.iconBg} flex items-center justify-center`}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6 10a4 4 0 118 0 4 4 0 01-8 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-1 text-gray-400 max-w-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <img
            src="https://placehold.co/500x300/222/ffffff?text=Powerful+Features"
            alt="Powerful Features"
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
