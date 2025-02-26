import React, { Component, ErrorInfo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

// We need to wrap the button in a function component because hooks can't be used in class components
const ReloadButton = () => {
  const navigate = useNavigate();

  const handleReload = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <motion.button
      onClick={handleReload}
      className="px-6 py-3 mt-6 text-white bg-gradient-to-r from-blue-600 to-blue-700 
                 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 
                 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Return to Home & Reload
    </motion.button>
  );
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mb-6"
            >
              <svg
                className="w-24 h-24 mx-auto text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              Oops! Something went wrong
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6"
            >
              We apologize for the inconvenience. Our team has been notified of this issue.
              Please try returning to the home page and reloading the application.
            </motion.p>
            <ReloadButton />
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 