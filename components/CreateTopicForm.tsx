'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import PreviewTab from './form-tabs/PreviewTab'
import CodeTab from './form-tabs/CodeTab'
import ContentTab from './form-tabs/ContentTab'
import BasicInfoTab from './form-tabs/BasicInfoTab'


type FormData = {
  title: string
  category: string
  image: string
  explanation: string
  code: string
  language: string
}

interface CreateTopicFormProps {
  onSubmit: (data: FormData) => Promise<void>
  isSubmitting: boolean
}

export default function CreateTopicForm({ onSubmit, isSubmitting }: CreateTopicFormProps) {
  const [activeTab, setActiveTab] = useState('basic-info')
  const methods = useForm<FormData>()

  const handleSubmit = methods.handleSubmit(async (data) => {
    await onSubmit(data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="basic-info">
            <BasicInfoTab />
          </TabsContent>
          <TabsContent value="content">
            <ContentTab />
          </TabsContent>
          <TabsContent value="code">
            <CodeTab />
          </TabsContent>
          <TabsContent value="preview">
            <PreviewTab />
          </TabsContent>
        </Tabs>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const currentIndex = ['basic-info', 'content', 'code', 'preview'].indexOf(activeTab)
              if (currentIndex > 0) {
                setActiveTab(['basic-info', 'content', 'code', 'preview'][currentIndex - 1])
              }
            }}
            disabled={activeTab === 'basic-info'}
          >
            Previous
          </Button>
          {activeTab !== 'preview' ? (
            <Button
              type="button"
              onClick={() => {
                const currentIndex = ['basic-info', 'content', 'code', 'preview'].indexOf(activeTab)
                if (currentIndex < 3) {
                  setActiveTab(['basic-info', 'content', 'code', 'preview'][currentIndex + 1])
                }
              }}
            >
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Topic'}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}