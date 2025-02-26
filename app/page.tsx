'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import TopicView from '@/components/TopicView'
import { sampleTopics } from '@/data/sampleTopics'
import { Topic, CodeSection } from './types/Topic'
import Sidebar from '@/components/SideBar'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [topics, setTopics] = useState(sampleTopics)
  const [selectedTopic, setSelectedTopic] = useState(topics[0])
  const router = useRouter()

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.explanation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.codeSections.some((section: CodeSection) => 
      section.code.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const handleEdit = (topic: Topic) => {
    // Implement edit functionality
    console.log('Edit topic:', topic)
  }

  const handleDelete = (topicId: number) => {
    const newTopics = topics.filter(topic => topic.id !== topicId)
    setTopics(newTopics)
    if (selectedTopic.id === topicId) {
      setSelectedTopic(newTopics[0] || null)
    }
  }

  

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          topics={filteredTopics} 
          selectedTopic={selectedTopic} 
          onSelectTopic={setSelectedTopic}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex-1 overflow-auto p-6">
            {selectedTopic && (
              <TopicView 
                topic={selectedTopic} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}