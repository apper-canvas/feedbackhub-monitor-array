import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"

const SearchBar = ({ onSearch, placeholder = "Search...", className = "" }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch?.(query)
  }

  const clearSearch = () => {
    setSearchQuery("")
    onSearch?.("")
  }

  return (
    <div className={`relative ${className}`}>
      <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearch}
        className="pl-10 pr-10"
      />
      {searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ApperIcon name="X" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar