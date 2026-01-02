import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6 text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Something went wrong.</h2>
          <p className="text-gray-400 mb-6">We're sorry, but the application encountered an unexpected error.</p>
          <button 
            onClick={() => window.location.href = '/'} 
            className="bg-green-500 text-black px-6 py-2 rounded font-bold hover:bg-green-400"
          >
            Go Back Home
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;