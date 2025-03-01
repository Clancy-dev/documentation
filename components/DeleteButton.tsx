'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteTopic } from '@/actions/Topic'
import toast from 'react-hot-toast'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'

interface TopicViewProps {
  topic: { id: string }
}

export default function DeleteButton({ topic }: TopicViewProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete(id: string) {
    console.log("Deleting topic with ID:", id)

    try {
      setLoading(true)
      const response = await deleteTopic(id)
      console.log("Delete response:", response)

      if (response.ok) {
        toast.success("Concept Successfully Deleted")
        router.refresh() // Refresh current data
        router.push('/') // Redirect to home or topics list
      } else {
        throw new Error(response.error || "Failed to delete topic")
      }
    } catch (error) {
      console.error("Delete Error:", error)
      toast.error("Failed to Delete the Concept")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Trash className="w-4 h-4" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this topic and remove it from our system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(topic.id)} disabled={loading}>
            {loading ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
