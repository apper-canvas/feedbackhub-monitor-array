import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import SearchBar from "@/components/molecules/SearchBar"

const Header = ({ onMobileMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query) => {
    setSearchQuery(query)
    // TODO: Implement global search functionality
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 mr-4"
          >
            <ApperIcon name="Menu" className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-primary to-accent w-10 h-10 rounded-xl flex items-center justify-center mr-3">
              <ApperIcon name="MessageSquare" className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">
              FeedbackHub
            </h1>
          </div>
        </div>

        <div className="hidden md:block flex-1 max-w-md mx-8">
          <SearchBar
            placeholder="Search feedback, roadmap items..."
            onSearch={handleSearch}
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <ApperIcon name="Bell" className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <ApperIcon name="Settings" className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="md:hidden mt-4">
        <SearchBar
          placeholder="Search feedback, roadmap items..."
          onSearch={handleSearch}
        />
      </div>
    </header>
  )
}

export default Header