const Loading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48"></div>
        <div className="h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-32"></div>
      </div>
      
      <div className="grid gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 mb-3"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3"></div>
              </div>
              <div className="ml-4">
                <div className="h-12 w-16 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-6 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full w-20"></div>
                <div className="h-6 bg-gradient-to-r from-green-200 to-green-300 rounded-full w-24"></div>
              </div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading