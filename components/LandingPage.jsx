"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">
              Create Amazing <span className="text-blue-600">AI Videos</span> in Seconds
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Transform your ideas into captivating short videos with just a prompt. 
              Generate professional 15s, 30s, or 1-minute videos powered by AI.
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105">
                  Get Started
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative w-full h-[400px] md:h-auto"
          >
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/real.jpg" 
                alt="CineAI" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span>AI-Generated Video</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="how-it-works" className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Create stunning videos in three simple steps</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Enter Your Prompt",
              description: "Describe your video idea or topic in a few words",
              icon: "📝",
              image: "/comic.jpg"
            },
            {
              title: "Choose Your Style",
              description: "Select from various visual styles for your video",
              icon: "🎨",
              image: "/cartoon.jpg"
            },
            {
              title: "Generate & Download",
              description: "Our AI creates your video in seconds, ready to share",
              icon: "🚀",
              image: "/gta.png"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-48 relative">
                <Image 
                  src={feature.image} 
                  alt={feature.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Durations Section */}
      <div className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Video Duration</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Perfect for social media and content creation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                duration: "15 Seconds",
                description: "Ideal for TikTok, Instagram Reels, and short attention spans",
                icon: "⚡"
              },
              {
                duration: "30 Seconds",
                description: "Perfect for social media stories and brief explanations",
                icon: "🔥"
              },
              {
                duration: "1 Minute",
                description: "Great for detailed concepts and longer narratives",
                icon: "✨"
              }
            ].map((option, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{option.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{option.duration}</h3>
                <p className="text-gray-600">{option.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105">
                Start Creating Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <Image width={50} height={50} src="/logo.png" alt="Logo" className="rounded-full" />
              <h2 className="font-bold text-xl">AI Content Generator</h2>
            </div>
            <div className="flex gap-6">
              <Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">About</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} AI Content Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;