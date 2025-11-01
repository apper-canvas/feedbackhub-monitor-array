import { NavLink, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const navigation = [
    {
      name: "Feedback",
      href: "/feedback",
      icon: "MessageSquare",
      description: "View and manage feedback"
    },
    {
      name: "Roadmap",
      href: "/roadmap",
      icon: "Map",
      description: "Track feature development"
    },
    {
      name: "Changelog",
      href: "/changelog",
      icon: "FileText",
      description: "Product updates and releases"
    }
  ]

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:block w-60 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href === "/feedback" && location.pathname === "/")
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-primary border-l-4 border-primary shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <ApperIcon 
                  name={item.icon} 
                  className={cn(
                    "h-5 w-5 mr-3 transition-colors duration-200",
                    isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
                  )} 
                />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {item.description}
                  </div>
                </div>
              </NavLink>
            )
          })}
        </nav>
      </div>
    </div>
  )

  // Mobile sidebar
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        className={cn(
          "lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-primary to-accent w-10 h-10 rounded-xl flex items-center justify-center mr-3">
                <ApperIcon name="MessageSquare" className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gradient">
                FeedbackHub
              </h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name="X" className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || (item.href === "/feedback" && location.pathname === "/")
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-primary border-l-4 border-primary shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <ApperIcon 
                    name={item.icon} 
                    className={cn(
                      "h-5 w-5 mr-3 transition-colors duration-200",
                      isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
                    )} 
                  />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </NavLink>
              )
            })}
          </nav>
        </div>
      </motion.div>
    </>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}

export default Sidebar