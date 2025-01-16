export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Check your email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          A sign in link has been sent to your email address.
        </p>
        <p className="text-sm text-gray-500">
          If you don't see it, check your spam folder.
        </p>
      </div>
    </div>
  )
} 