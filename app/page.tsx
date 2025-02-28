import { fetchTopics } from '@/actions/Topic'
import Home from '@/components/Home'
import React from 'react'

export default async function page() {
  const fetchedTopics = await fetchTopics() || []
  console.log(fetchedTopics)
  return (
    <div>
      <Home topicz={fetchedTopics}/>
    </div>
  )
}
