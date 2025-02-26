export type CodeSection = {
  title: string
  location: string
  code: string
  language: 'react' | 'css'
}

export interface Topic {
  id: number
  title: string
  preview?: string
  explanation?: string
  codeSections: CodeSection[]
}