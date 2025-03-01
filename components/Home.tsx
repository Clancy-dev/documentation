'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import TopicView from '@/components/TopicView'
import { sampleTopics } from '@/data/sampleTopics'
// import { Topic, CodeSection } from './types/Topic'
import Sidebar from '@/components/SideBar'
import { CodeSection, Topic } from '@prisma/client'
import { EmptyState } from './EmptyState'


interface HomePageProps {
    topicz:(Topic & { codeSections: CodeSection[] })[];
   
  }

export default function Home({topicz}:HomePageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(topicz.length > 0 ? topicz[0] : null);
    const router = useRouter();
  
    // Filter topics based on search
    const filteredTopics = topicz.filter((topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.explanation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.codeSections.some((section) =>
        section.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  
  
    const handleDelete = (topicId: string) => {
      console.log('Delete topic:', topicId);
    };
  


  

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        
      <Sidebar
          topicz={filteredTopics}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex-1 overflow-auto p-6">
            {selectedTopic ? (
    <TopicView 
      topic={selectedTopic as Topic & { codeSections: CodeSection[] }} 
      onDelete={handleDelete}
    />
  ) : (
    <div><EmptyState/></div> // Optionally show a placeholder if no topic is selected
  )}
          </div>
        </main>
      </div>
    </div>
  )
}