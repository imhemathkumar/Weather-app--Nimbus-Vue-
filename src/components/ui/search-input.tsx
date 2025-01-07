'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChangeAction: (value: string) => void
  onSearchAction: () => void
}

export function SearchInput({ value, onChangeAction, onSearchAction }: Readonly<SearchInputProps>) {
  return (
    <div className="relative">
      <Input 
        value={value}
        onChange={(e) => onChangeAction(e.target.value)}
        placeholder="Search location..." 
        className="w-full bg-gray-800/60 border-none text-white placeholder:text-white/70 pr-10"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearchAction()
          }
        }}
      />
      <button
        onClick={onSearchAction}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  )
}