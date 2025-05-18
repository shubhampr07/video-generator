"use client"
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MobileMenu = ({ isOpen, setIsOpen }) => {
  return (
    <div className="md:hidden fixed top-4 right-4 z-30">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        )}
      </Button>
    </div>
  )
}

export default MobileMenu