'use client'

import { CloudSunRain } from 'lucide-react'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SearchInput } from './ui/search-input'

interface HeaderProps {
  searchQuery: string
  onSearchChangeAction: (value: string) => void
  onSearchAction: () => void
}


export function Header({ searchQuery, onSearchChangeAction, onSearchAction }: Readonly<HeaderProps>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <header className="w-full flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
      {isMounted && (
      <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="text-primary"
                    >
        <CloudSunRain className="h-6 w-6 text-yellow-600 hover:text-cyan-500" />
      </motion.div>
      )}
        <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}>
        <Link href={'/'} >
        <button className="text-xl font-semibold text-sky-400 hover:text-yellow-400">Nimbus</button></Link></motion.div><span className="text-xl font-semibold text-yellow-400" >Vue</span>
      </div>
    
      <div className="flex-1 max-w-md mx-auto">
        <SearchInput
          value={searchQuery}
          onChangeAction={onSearchChangeAction}
          onSearchAction={onSearchAction}
        />
      </div>
    </header>
  )
}
