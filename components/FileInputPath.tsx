import { useState } from 'react'
import { Folder, File, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface FilePathInputProps {
  value: string
  onChange: (value: string) => void
}

export default function FilePathInput({ value, onChange }: FilePathInputProps) {
  const [isEditing, setIsEditing] = useState(false)
  const parts = value.split('/')

  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Input 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          placeholder="e.g. components/Counter.tsx"
        />
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      className="h-auto p-2 hover:bg-gray-100"
      onClick={() => setIsEditing(true)}
    >
      <div className="flex items-center gap-1 text-sm text-gray-600">
        {parts.map((part, index) => (
          <div key={index} className="flex items-center">
            {index === parts.length - 1 ? (
              <>
                <File className="w-4 h-4 mr-1" />
                {part}
              </>
            ) : (
              <>
                <Folder className="w-4 h-4 mr-1" />
                {part}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </div>
        ))}
      </div>
    </Button>
  )
}