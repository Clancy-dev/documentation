'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor'
import { Copy, Check, Folder, File, Pencil, Trash } from 'lucide-react'
import { CodeSection, Topic } from '@prisma/client'
import { StdioNull } from 'child_process'
import Link from 'next/link'
import { deleteTopic } from '@/actions/Topic'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


interface TopicViewProps {
  topic: Topic & { codeSections: CodeSection[] } 
  onDelete: (topicId: string) => void
}

export default function TopicView({ topic, onDelete }: TopicViewProps) {
  const [activeTab, setActiveTab] = useState('previewTab')
  const [activeCodeSection, setActiveCodeSection] = useState(topic.codeSections[0]?.title || '')
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({})

  const handleCopy = (code: string, sectionTitle: string) => {
    navigator.clipboard.writeText(code)
    setCopiedStates({ ...copiedStates, [sectionTitle]: true })
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [sectionTitle]: false })
    }, 2000)
  }

  const renderFileTree = (location: string) => {
    const parts = location.split('/')
    return (
      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
        {parts.map((part, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="mx-1">/</span>}
            {index === parts.length - 1 ? (
              <><File className="w-4 h-4 mr-1" />{part}</>
            ) : (
              <><Folder className="w-4 h-4 mr-1" />{part}</>
            )}
          </div>
        ))}
      </div>
    )
  }
  const router = useRouter()

  async function handleDelete(id: string) {
    try {
      await deleteTopic(id)
      toast.success("Concept Successfully Deleted")
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Failed to Delete the Concept")
    }
  }
  

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{topic.title}</h2>
        <div className="flex space-x-2">
          <Link href={`/edit/${topic.slug}`}>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
           <Pencil className="w-4 h-4" /> Edit
          </Button>
          </Link>          
          <Button variant="outline" size="sm" onClick={() => handleDelete} className="flex items-center gap-2">
          <Trash className="w-4 h-4" /> Delete
          </Button>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {topic.previewTab && <TabsTrigger value="previewTab">Preview</TabsTrigger>}
          {topic.explanationTab && <TabsTrigger value="explanationTab">Explanation</TabsTrigger>}
          {topic.codeSections.length > 0 && <TabsTrigger value="code">Code</TabsTrigger>}
        </TabsList>
        {topic.previewTab && (
          <TabsContent value="previewTab">
            <div className="aspect-video relative">
              <Image 
                src={topic.image || "/placeholder.svg"}
                alt={topic.title}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </TabsContent>
        )}
        {topic.explanationTab && (
          <TabsContent value="explanationTab">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: topic.explanation }} />
          </TabsContent>
        )}
        {topic.codeSections.length > 0 && (
          <TabsContent value="code">
            <Tabs value={activeCodeSection} onValueChange={setActiveCodeSection}>
              <TabsList>
                {topic.codeSections.map((section) => (
                  <TabsTrigger key={section.title} value={section.title}>
                    {section.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {topic.codeSections.map((section) => (
                <TabsContent key={section.title} value={section.title}>
                  {renderFileTree(section.location)}
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => handleCopy(section.code, section.title)}
                    >
                      {copiedStates[section.title] ? (
                        <><Check className="w-4 h-4 mr-2" /> Copied</>
                      ) : (
                        <><Copy className="w-4 h-4 mr-2" /> Copy</>
                      )}
                    </Button>
            
                    <CodeEditor
                      code={(section.code)} 
                      language={section.language}
                      readOnly
                    />
                             
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}