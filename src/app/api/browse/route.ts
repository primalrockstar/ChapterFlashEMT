import { NextResponse } from 'next/server'
import FlashcardService from '@/lib/flashcard-service'

export async function GET() {
  try {
    const [stats, categories, chapters] = await Promise.all([
      FlashcardService.getDatabaseStats(),
      FlashcardService.getCategoriesWithStats(),
      FlashcardService.getChaptersWithStats()
    ])
    
    return NextResponse.json({
      success: true,
      data: {
        stats,
        categories: categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          description: cat.description,
          color: cat.color,
          cardCount: cat.cardCount
        })),
        chapters: chapters.map(ch => ({
          id: ch.id,
          number: ch.number,
          title: ch.title,
          description: ch.description,
          cardCount: ch.cardCount
        }))
      }
    })
    
  } catch (error) {
    console.error('Error fetching browse data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch browse data'
      },
      { status: 500 }
    )
  }
}