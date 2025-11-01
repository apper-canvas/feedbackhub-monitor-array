import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-full p-6 mb-6">
        <ApperIcon name="AlertCircle" className="h-12 w-12 text-red-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {message}. Please try again or contact support if the problem persists.
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
        >
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  )
}

export default Error