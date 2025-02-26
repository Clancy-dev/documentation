
import { Topic } from "@/app/types/Topic"

interface SidebarProps {
  topics: Topic[]
  selectedTopic: Topic
  onSelectTopic: (topic: Topic) => void
}

export default function Sidebar({ topics, selectedTopic, onSelectTopic }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li 
            key={topic.id} 
            className={`cursor-pointer p-2 rounded ${
              topic.id === selectedTopic.id ? 'bg-gray-500 text-white' : 'hover:bg-gray-200'
            }`}
            onClick={() => onSelectTopic(topic)}
          >
            {topic.title}
          </li>
        ))}
      </ul>
    </aside>
  )
}