import React from 'react';
import { House } from 'lucide-react'; // Icon


// Navbar Component
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-4 flex justify-between items-center shadow-md z-50">
      {/* Brand / Logo */}
      <h1 className="text-2xl font-bold tracking-wide">AGENT</h1>

      {/* Navigation Links + Login + Register */}
      <div className="flex items-center space-x-8">
        <ul className="flex space-x-6 items-center">
          <li>
            <a href="#" className="hover:text-[#00b894] flex items-center transition">
              <House className="mr-1" />
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#00b894] transition">Agents</a>
          </li>
        </ul>

        {/* Login Button */}
        <button className="bg-white text-[#302b63] px-4 py-1 rounded hover:bg-gray-100 transition">
          Login
        </button>

        {/* Register Button */}
        <button className="bg-[#00b894] text-white px-4 py-1 rounded hover:bg-green-600 transition">
          Register
        </button>
      </div>
    </nav>
  );
}


// Gradient Hero Section
function GradientHero() {
  return (
    <section className="hero-section bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-12 py-24 font-poppins min-h-screen flex flex-col justify-center">
      {/* Sub-heading */}
      <h5 className="text-sm font-semibold tracking-wider text-[#ff4ecd] uppercase mb-2">
        Sub Heading
      </h5>

      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-white mb-5">
        Hero Heading
      </h1>

      {/* Paragraph */}
      <p className="text-lg leading-relaxed text-[#cfcfcf] max-w-md">
        This is a paragraph with supporting information about the hero section. 
        It uses Tailwind utilities instead of custom CSS.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button className="bg-gradient-to-br from-[#8e2de2] to-[#4a00e0] text-white font-bold py-3 px-7 rounded-full shadow-md transition-transform duration-300 hover:from-[#ff4ecd] hover:to-[#7a00ff] hover:-translate-y-1">
          Primary Button
        </button>
        <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-7 rounded-full transition-colors duration-300 hover:bg-white hover:text-[#24243e]">
          Secondary Button
        </button>
      </div>

      {/* Neon Glow Text */}
      <h2 className="mt-8 text-[#00f7ff] drop-shadow-[0_0_10px_#00f7ff,0_0_20px_#00f7ff]">
        Neon Glow Effect
      </h2>
    </section>
  );
}


// Footer Component
function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center mt-auto">
      {/* Left-most Agent Brand + Tagline */}
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <h1 className="text-2xl font-bold">AGENT</h1>
        <p className="text-sm text-gray-300">Empowering Intelligent Applications</p>
      </div>

      {/* Middle Section - All Rights Reserved */}
      <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">FAQ's</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
         {/* Contact Us */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>JO BHI LIKHANA HOGA ,<br />SAB KOI SUGGEST KAREGA </li>
            <li>PHIR YEHA LIKHA JAYEGA </li>
          </ul>
        </div>
        {/* Quick Link */}
        <div>
          <h2 className="text-white font-semibold mb-4">Quick Link</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Style Guide</a></li>
            <li><a href="#">Career</a></li>
            <li><a href="#">Help Text</a></li>
          </ul>
        </div>
  
    </footer>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero takes remaining space */}
      <div className="flex-grow">
        <GradientHero />
      </div>
      <Footer />
    </div>
  );
}
