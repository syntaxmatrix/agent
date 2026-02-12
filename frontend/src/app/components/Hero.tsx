// app/components/Hero.tsx
import React from "react";
import { HeroData } from "../data/landingData";

interface HeroProps {
  data: HeroData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <main className="py-16 md:py-24 lg:py-32 flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
      
      <div className="grid grid-cols-2">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight w-max">
            {data.title}
            <span className="text-cyan-300 block">{data.highlight}</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
            {data.description}
          </p>
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
                  className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-colors text-center ml-4"
                >
                  {btn.text}
                </a>
              )
            )}

          </div>
        </div>
        {/* separation */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative ml-70">
            <div className="relative">
              <img
                src="https://placehold.co/400x250/333/ffffff?text=AI+Agent+Workflow"
                alt="AI Agent Workflow"
                className="rounded-xl shadow-2xl transform rotate-3 z-10"
              />
              <img
                src="https://placehold.co/400x250/222/ffffff?text=AI+Code+Generation"
                alt="AI Code Generation"
                className="rounded-xl shadow-2xl absolute top-1/2 left-1/2 -ml-12 -mt-12 transform -rotate-6 z-20"
              />
              <div className="absolute top-1/2 right-0 -mr-16 mt-20 p-6 bg-gray-800 rounded-lg shadow-xl z-30 w-56">
                <div className="flex items-center space-x-2 text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Live Agent Status</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="text-xl font-semibold">2,847</div>
                  <div className="text-sm text-gray-400">Active Agents</div>
                  <div className="text-xl font-semibold">1.2M+</div>
                  <div className="text-sm text-gray-400">Tasks Completed</div>
                  <div className="text-xl font-semibold">99.7%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </main>
  );
};

export default Hero;
