// app/components/Hero.tsx
import React from "react";
import { HeroData } from "../data/landingData";

interface HeroProps {
  data: HeroData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <header className="py-16 md:py-24 lg:py-32 flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          {data.title}
          <span className="text-cyan-300 block">{data.highlight}</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
          {data.description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              {data.buttons.map((btn, i) =>
                 btn.type === "primary" ? (
                  <button
                      key={i}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
                    >
                      {btn.text}
                    </button>
                  ) : (
                    <a
                      key={i}
                      href="https://github.com/syntaxmatrix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-colors text-center"
                    >
                        {btn.text}
                   </a>
                )
              )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
