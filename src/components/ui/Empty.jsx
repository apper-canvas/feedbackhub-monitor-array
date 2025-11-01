import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No items found", 
  description = "Get started by adding your first item.",
  actionText = "Add Item",
  onAction,
  icon = "Inbox"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-full p-8 mb-6">
        <ApperIcon name={icon} className="h-16 w-16 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          {actionText}
        </button>
      )}
    </div>
  )
}

export default Empty