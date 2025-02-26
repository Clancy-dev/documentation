import Image from 'next/image'
import { Bell, Settings, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onCreateClick: () => void
}

export default function Header({ onCreateClick }: HeaderProps) {
  return (
    <header className="bg-white text-gray-900 py-4 px-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Clancy Docs Logo" width={32} height={32} />
          <h1 className="text-xl font-bold">Clancy Docs</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onCreateClick}
            className="bg-gray-500 text-white hover:bg-opacity-90"
          >
            <Plus className="w-4 h-4 mr-1 text-white" />
            Create
          </Button>
          <nav className="flex items-center space-x-3">
            <Bell className="w-5 h-5 cursor-pointer hover:text-blue-200 transition-colors" />
            <Settings className="w-5 h-5 cursor-pointer hover:text-blue-200 transition-colors" />
            <Image 
              src="/profile.png" 
              alt="User Profile" 
              width={32} 
              height={32} 
              className="rounded-full"
            />
          </nav>
        </div>
      </div>
    </header>
  )
}