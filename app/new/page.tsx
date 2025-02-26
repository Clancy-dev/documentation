'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CreateTopicForm from '@/components/CreateTopicForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NewTopicPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    // Here you would typically send the data to your backend
    console.log(data)
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    // Navigate back to the main page after successful submission
    router.push('/')
  }

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="ghost"
        onClick={() => router.push('/')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
      </Button>
      <h1 className="text-3xl font-bold mb-6">Create New Topic</h1>
      <CreateTopicForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}