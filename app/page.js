import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import Pricing from "@/components/Pricing"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <Navigation />
      <Hero />
      <Pricing />

      {/* Pros and Cons Section */}
      <section className="mt-16 mb-24 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make an informed decision by understanding what we offer and where we can improve
          </p>
        </div>

        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 transform -skew-y-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl"></div>

          <div className="relative grid md:grid-cols-2 gap-8 p-8">
            {/* Pros Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Advantages</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Intuitive Interface</span>
                    <p className="text-gray-500 text-sm mt-1">Easy to navigate and user-friendly design for all skill levels</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">24/7 Support</span>
                    <p className="text-gray-500 text-sm mt-1">Round-the-clock customer support to assist you anytime</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Regular Updates</span>
                    <p className="text-gray-500 text-sm mt-1">Continuous improvements and new features added regularly</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Cons Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Limitations</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Learning Curve</span>
                    <p className="text-gray-500 text-sm mt-1">Initial setup might require some time to understand fully</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Premium Features</span>
                    <p className="text-gray-500 text-sm mt-1">Some advanced features are only available in paid plans</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Mobile App</span>
                    <p className="text-gray-500 text-sm mt-1">Mobile application still in development phase</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
