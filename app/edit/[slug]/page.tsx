import { fetchSingleTopic } from '@/actions/Topic'
import NewTopicForm from '@/components/NewTopicForm'
import React from 'react'

export default async function page({params}:{params:Promise<{slug:string}>}) {
    const slug = (await params).slug
    const singleTopicFetched = await fetchSingleTopic(slug)
    console.log(singleTopicFetched)
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <NewTopicForm oldData ={singleTopicFetched}/>
      
    </div>
  )
}
