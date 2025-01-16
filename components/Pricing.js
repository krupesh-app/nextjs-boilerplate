'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

export default function Pricing() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successPlan, setSuccessPlan] = useState(null);

  const faqs = [
    {
      question: "What's the difference between Basic and Pro plans?",
      answer: "The main differences are the number of users, storage capacity, and level of support. The Pro plan offers unlimited users, more storage, and priority support."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Yes, you can upgrade from the Basic to the Pro plan at any time. We'll prorate the cost based on your remaining time on the Basic plan."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service within the first 30 days, we'll provide a full refund."
    },
    {
      question: "What kind of support do you offer?",
      answer: "Basic plan users receive email support with a 48-hour response time. Pro plan users get priority support with a 24-hour response time and access to phone support."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, the prices you see are all-inclusive. There are no hidden fees or additional charges."
    }
  ];

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (planName, amount) => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    try {
      setLoading(true);

      const res = await loadRazorpay();
      if (!res) {
        alert('Razorpay SDK failed to load');
        return;
      }

      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          planName,
        }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.error || 'Something went wrong');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Your Company Name',
        description: `${planName} Plan Purchase`,
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const verificationResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                planName: planName,
                amount: amount
              }),
            });

            const verificationData = await verificationResponse.json();

            if (verificationResponse.status === 200) {
              setSuccessPlan(planName);
              setShowSuccessModal(true);
              router.refresh();
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: session?.user?.name || '',
          email: session?.user?.email || '',
        },
        theme: {
          color: '#2563EB',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Error initiating payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600">Choose the perfect plan for your needs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Basic Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold">Basic Plan</h3>
                <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">Popular</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for small projects</p>
              <p className="text-4xl font-bold mb-6">$99<span className="text-lg font-normal text-gray-600">/one-time</span></p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  <span>Up to 5 users</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  <span>10GB storage</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  <span>Basic support</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50">
              <button
                onClick={() => handlePayment('Basic', 99)}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full px-4 py-3 hover:from-blue-600 hover:to-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Get Started with Basic'}
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border-2 border-purple-500">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold">Pro Plan</h3>
                <span className="px-3 py-1 text-sm text-purple-600 bg-purple-100 rounded-full">Best Value</span>
              </div>
              <p className="text-gray-600 mb-6">For larger applications</p>
              <p className="text-4xl font-bold mb-6">$299<span className="text-lg font-normal text-gray-600">/one-time</span></p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Unlimited users</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>100GB storage</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50">
              <button
                onClick={() => handlePayment('Pro', 299)}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full px-4 py-3 hover:from-purple-600 hover:to-purple-700 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Get Started with Pro'}
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Features</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600">Basic Plan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-600">Pro Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">Users</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">Up to 5 users</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-sm text-purple-600 bg-purple-100 rounded-full">Unlimited</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">Storage</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">10GB</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-sm text-purple-600 bg-purple-100 rounded-full">100GB</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">Support Level</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    <span>Basic support</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Priority support</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">Updates</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    <span>1 year</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Lifetime</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-6 h-6 transition-transform duration-200 ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="bg-white p-4 rounded-b-lg shadow mt-1">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* New CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Join thousands of satisfied customers who have transformed their projects with our solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-colors duration-200">
                  Schedule Demo
                </button>
              </div>
              <p className="text-sm text-white/80 mt-6">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Easy Setup</h3>
                  <p className="text-white/80">Get started in minutes with our simple onboarding process</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Secure Platform</h3>
                  <p className="text-white/80">Enterprise-grade security for your peace of mind</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">24/7 Support</h3>
                  <p className="text-white/80">Our team is here to help you succeed anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="container mx-auto px-4 mt-16">
          <div className="text-center">
            <p className="text-gray-500 mb-6">Trusted by leading companies worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              {/* Replace with actual company logos */}
              <div className="h-8 w-24 bg-gray-400 rounded"></div>
              <div className="h-8 w-24 bg-gray-400 rounded"></div>
              <div className="h-8 w-24 bg-gray-400 rounded"></div>
              <div className="h-8 w-24 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        planName={successPlan}
      />
    </section>
  )
} 