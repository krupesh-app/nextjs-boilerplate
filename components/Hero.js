export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between py-20 lg:py-32">
          {/* Hero Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Welcome to Your Next.js Boilerplate
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A powerful starting point for your next project with Next.js, NextAuth, 
              and MongoDB. Build scalable applications with modern tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="rounded-full bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors">
                Get Started
              </button>
              <button className="rounded-full border border-black px-8 py-3 hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="w-full h-[400px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg">
                {/* You can replace this div with an actual image */}
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 