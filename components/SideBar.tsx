import type { Topic } from "@prisma/client"

interface SidebarProps {
  topicz: Topic[]
  selectedTopic: Topic | null
  onSelectTopic: (topic: Topic | null) => void
}

export default function Sidebar({ topicz, selectedTopic, onSelectTopic }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Topics</h2>
      {topicz.length > 0 ? (
        <ul className="max-h-[calc(100vh-100px)] overflow-y-auto">
          {topicz.map((topic) => (
            <li
              key={topic.id}
              className={`cursor-pointer p-2 rounded mb-1 ${
                topic.id === selectedTopic?.id ? "bg-gray-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => onSelectTopic(topic)}
            >
              {topic.title}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p>The concept you have searched for is not yet available</p>
          
        </div>
      )}
    </aside>
  )
}

