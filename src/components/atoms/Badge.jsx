import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    feature: "bg-blue-100 text-blue-800 border-blue-200",
    bug: "bg-red-100 text-red-800 border-red-200",
    improvement: "bg-purple-100 text-purple-800 border-purple-200",
    new: "bg-green-100 text-green-800 border-green-200",
    "in-review": "bg-yellow-100 text-yellow-800 border-yellow-200",
    planned: "bg-blue-100 text-blue-800 border-blue-200",
    "in-progress": "bg-orange-100 text-orange-800 border-orange-200",
    completed: "bg-green-100 text-green-800 border-green-200"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Badge.displayName = "Badge"

export default Badge