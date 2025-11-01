import Select from "@/components/atoms/Select"

const SortControl = ({ value, onChange, className = "" }) => {
  const sortOptions = [
    { value: "votes", label: "Most Voted" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" }
  ]

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      {sortOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}

export default SortControl