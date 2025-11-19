'use client'

import { useState, useEffect } from 'react'

export interface Flashcard {
  id: string
  question: string
  answer: string
  difficulty: 'Basic' | 'Intermediate' | 'Advanced'
  type: 'definition' | 'recognition' | 'application' | 'scenario' | 'assessment'
  tags: string[]
  chapterNumber: number
  chapterTitle: string
  category: string
}

export interface FlashcardResponse {
  success: boolean
  data: Flashcard[]
  count: number
  error?: string
}

export interface BrowseData {
  stats: {
    totalCards: number
    totalCategories: number
    totalChapters: number
    difficultyBreakdown: Array<{ difficulty: string; count: number }>
    typeBreakdown: Array<{ type: string; count: number }>
  }
  categories: Array<{
    id: number
    name: string
    description: string | null
    color: string
    cardCount: number
  }>
  chapters: Array<{
    id: number
    number: number
    title: string
    description: string | null
    cardCount: number
  }>
}

export function useFlashcards(options: {
  category?: number
  chapter?: number
  limit?: number
} = {}) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFlashcards = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const params = new URLSearchParams()
        if (options.category) params.append('category', options.category.toString())
        if (options.chapter) params.append('chapter', options.chapter.toString())
        if (options.limit) params.append('limit', options.limit.toString())
        
        const response = await fetch(`/api/flashcards?${params}`)
        const data: FlashcardResponse = await response.json()
        
        if (data.success) {
          setFlashcards(data.data)
        } else {
          setError(data.error || 'Failed to fetch flashcards')
        }
      } catch (err) {
        setError('Network error occurred')
        console.error('Error fetching flashcards:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFlashcards()
  }, [options.category, options.chapter, options.limit])

  return { flashcards, loading, error, refetch: () => {
    const fetchFlashcards = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const params = new URLSearchParams()
        if (options.category) params.append('category', options.category.toString())
        if (options.chapter) params.append('chapter', options.chapter.toString())
        if (options.limit) params.append('limit', options.limit.toString())
        
        const response = await fetch(`/api/flashcards?${params}`)
        const data: FlashcardResponse = await response.json()
        
        if (data.success) {
          setFlashcards(data.data)
        } else {
          setError(data.error || 'Failed to fetch flashcards')
        }
      } catch (err) {
        setError('Network error occurred')
        console.error('Error fetching flashcards:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFlashcards()
  }}
}

export function useBrowseData() {
  const [browseData, setBrowseData] = useState<BrowseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBrowseData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch('/api/browse')
        const data = await response.json()
        
        if (data.success) {
          setBrowseData(data.data)
        } else {
          setError(data.error || 'Failed to fetch browse data')
        }
      } catch (err) {
        setError('Network error occurred')
        console.error('Error fetching browse data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBrowseData()
  }, [])

  return { browseData, loading, error }
}