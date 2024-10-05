import React from 'react'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-green-900">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-8">The page you are looking for does not exist or an error occurred.</p>
      <a href="/" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Go back to Homepage
      </a>
    </div>
  )
}

export default ErrorPage