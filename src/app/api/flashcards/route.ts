import { NextRequest, NextResponse } from 'next/server'
import FlashcardService from '@/lib/flashcard-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const chapter = searchParams.get('chapter')
    const limit = searchParams.get('limit')
    
    let flashcards
    
    if (category) {
      flashcards = await FlashcardService.getFlashcardsByCategory(parseInt(category))
    } else if (chapter) {
      flashcards = await FlashcardService.getFlashcardsByChapter(parseInt(chapter))
    } else {
      flashcards = await FlashcardService.getAllFlashcards()
    }
    
    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit)
      flashcards = flashcards.slice(0, limitNum)
    }
    
    // Transform to match the expected interface
    const transformedCards = flashcards.map(card => ({
      id: card.id,
      question: card.question,
      answer: card.answer,
      difficulty: card.difficulty,
      type: card.type,
      tags: JSON.parse(card.tags || '[]'),
      chapterNumber: card.chapter?.number || 0,
      chapterTitle: card.chapter?.title || 'Unknown Chapter',
      category: card.category?.name || 'General'
    }))
    
    return NextResponse.json({
      success: true,
      data: transformedCards,
      count: transformedCards.length
    })
    
  } catch (error) {
    console.error('Error fetching flashcards:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch flashcards',
        data: [],
        count: 0
      },
      { status: 500 }
    )
  }
}