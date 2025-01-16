import Navigation from "@/components/Navigation"

export default function About() {
  return (
    <main>
      <Navigation />
      <div className="container mx-auto px-4 py-16 mt-16">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At [Your Company Name], our mission is to empower developers with cutting-edge tools and technologies. We believe in creating robust, scalable, and user-friendly applications that make a difference in people's lives.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              We envision a world where technology seamlessly integrates into everyday life, enhancing productivity and fostering innovation. Our goal is to be at the forefront of this technological revolution, providing solutions that shape the future of web development.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-gray-600 mb-6">
              Our team consists of passionate developers, designers, and innovators who are committed to excellence. With diverse backgrounds and expertise, we collaborate to push the boundaries of what's possible in web development.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Innovation: We constantly seek new and better ways to solve problems.</li>
              <li>Quality: We are committed to delivering high-quality products and services.</li>
              <li>Collaboration: We believe in the power of teamwork and open communication.</li>
              <li>User-Centric: Our users' needs and experiences are at the heart of everything we do.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
} 