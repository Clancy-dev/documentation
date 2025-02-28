import { Search, Sidebar } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <Search className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight">No Concept Selected</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        Please search for a concept and select it from the sidebar to view its details and related information.
      </p>
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Sidebar className="h-4 w-4" />
        <span>Use the sidebar to browse available concepts</span>
      </div>
    </div>
  )
}

