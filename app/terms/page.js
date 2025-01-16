import Navigation from "@/components/Navigation"

export default function Terms() {
  return (
    <main>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-16 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-gray-600">
                Permission is granted to temporarily download one copy of the materials (information or software) on Your Company's website for personal, non-commercial transitory viewing only.
              </p>
              <p className="mt-4 text-gray-600">This license shall automatically terminate if you violate any of these restrictions and may be terminated by Your Company at any time.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Account</h2>
              <p className="text-gray-600">
                If you create an account on our website, you are responsible for:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>Maintaining the confidentiality of your account and password</li>
                <li>Restricting access to your computer or mobile device</li>
                <li>Accepting responsibility for all activities that occur under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Service Description</h2>
              <p className="text-gray-600">
                We provide users with access to our platform and services as described on our website. You understand and agree that the service is provided "as-is" and that we assume no responsibility for the timeliness, deletion, mis-delivery, or failure to store any user communications or personalization settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
              <p className="text-gray-600">
                If you purchase any services or products, you agree to:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>Provide current, complete, and accurate purchase information</li>
                <li>Promptly update account and payment information</li>
                <li>Pay all charges at the prices then in effect for your purchases</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
              <p className="text-gray-600">
                The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Limitations</h2>
              <p className="text-gray-600">
                In no event shall Your Company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
              <p className="text-gray-600">
                These terms and conditions are governed by and construed in accordance with the laws of [Your Country/State] and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms and conditions at any time. We do so by posting and drawing attention to the updated terms on the site. Your decision to continue to visit and make use of the site after such changes have been made constitutes your formal acceptance of the new Terms of Use.
              </p>
              <p className="mt-4 text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="mt-2 text-gray-600">
                <p>Email: legal@yourcompany.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Legal Street, New York, NY 10001</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
} 