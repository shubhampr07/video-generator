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

      {/* Demo Videos Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">See AI in Action</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Watch how our AI transforms simple prompts into stunning videos</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Product Showcase",
                description: "A dynamic product demonstration video",
                thumbnail: "/demo1.jpg",
                views: "2.4k"
              },
              {
                title: "Travel Vlog",
                description: "AI-generated travel highlights reel",
                thumbnail: "/demo2.jpg",
                views: "1.8k"
              },
              {
                title: "Educational Content",
                description: "Engaging educational video series",
                thumbnail: "/demo3.jpg",
                views: "3.2k"
              }
            ].map((demo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video relative">
                  <Image
                    src={demo.thumbnail}
                    alt={demo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="ghost" className="text-white border-2 border-white hover:bg-white/20">
                      Watch Demo
                    </Button>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold mb-2">{demo.title}</h3>
                  <p className="text-gray-600 mb-3">{demo.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{demo.views} views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Join Our Creative Community</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">See what creators are making with our AI video generator</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Content Creator",
                avatar: "/avatar2.jpg",
                testimonial: "This tool has revolutionized my content creation process. I can now produce professional videos in minutes!",
                rating: 5
              },
              {
                name: "Mike Chen",
                role: "Digital Marketer",
                avatar: "/avatar1.jpg",
                testimonial: "The AI understands exactly what I need. The quality of videos is outstanding, saving me hours of work.",
                rating: 5
              },
              {
                name: "Emma Davis",
                role: "YouTuber",
                avatar: "/avatar1.jpg",
                testimonial: "Game-changing platform for creating engaging social media content. The variety of styles is impressive!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.testimonial}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Join Our Community
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