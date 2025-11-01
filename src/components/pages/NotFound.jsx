import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
          <ApperIcon name="Search" className="h-16 w-16 text-gray-400" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/")}
            icon="Home"
          >
            Go Home
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            icon="ArrowLeft"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound