import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface FlashcardWithRelations {
  id: string
  question: string
  answer: string
  difficulty: 'Basic' | 'Intermediate' | 'Advanced'
  type: 'definition' | 'recognition' | 'application' | 'scenario' | 'assessment'
  tags: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  category: {
    id: number
    name: string
    description: string | null
    color: string
  } | null
  chapter: {
    id: number
    number: number
    title: string
    description: string | null
  } | null
}

export interface CategoryWithStats {
  id: number
  name: string
  description: string | null
  color: string
  cardCount: number
  flashcards: FlashcardWithRelations[]
}

export interface ChapterWithStats {
  id: number
  number: number
  title: string
  description: string | null
  cardCount: number
  flashcards: FlashcardWithRelations[]
}

export class FlashcardService {
  
  // Get all active flashcards with relations
  static async getAllFlashcards(): Promise<FlashcardWithRelations[]> {
    try {
      const flashcards = await prisma.flashcard.findMany({
        where: {
          isActive: true
        },
        include: {
          category: true,
          chapter: true
        },
        orderBy: [
          { chapter: { number: 'asc' } },
          { createdAt: 'asc' }
        ]
      })

      return flashcards.map(card => ({
        ...card,
        difficulty: card.difficulty as 'Basic' | 'Intermediate' | 'Advanced',
        type: card.type as 'definition' | 'recognition' | 'application' | 'scenario' | 'assessment'
      }))
    } catch (error) {
      console.error('Error fetching flashcards:', error)
      return []
    }
  }

  // Get flashcards by category
  static async getFlashcardsByCategory(categoryId: number): Promise<FlashcardWithRelations[]> {
    try {
      const flashcards = await prisma.flashcard.findMany({
        where: {
          categoryId: categoryId,
          isActive: true
        },
        include: {
          category: true,
          chapter: true
        },
        orderBy: [
          { chapter: { number: 'asc' } },
          { createdAt: 'asc' }
        ]
      })

      return flashcards.map(card => ({
        ...card,
        difficulty: card.difficulty as 'Basic' | 'Intermediate' | 'Advanced',
        type: card.type as 'definition' | 'recognition' | 'application' | 'scenario' | 'assessment'
      }))
    } catch (error) {
      console.error('Error fetching flashcards by category:', error)
      return []
    }
  }

  // Get flashcards by chapter
  static async getFlashcardsByChapter(chapterNumber: number): Promise<FlashcardWithRelations[]> {
    try {
      const flashcards = await prisma.flashcard.findMany({
        where: {
          chapterNumber: chapterNumber,
          isActive: true
        },
        include: {
          category: true,
          chapter: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      })

      return flashcards.map(card => ({
        ...card,
        difficulty: card.difficulty as 'Basic' | 'Intermediate' | 'Advanced',
        type: card.type as 'definition' | 'recognition' | 'application' | 'scenario' | 'assessment'
      }))
    } catch (error) {
      console.error('Error fetching flashcards by chapter:', error)
      return []
    }
  }

  // Get all categories with card counts
  static async getCategoriesWithStats(): Promise<CategoryWithStats[]> {
    try {
      const categories = await prisma.category.findMany({
        include: {
          flashcards: {
            where: {
              isActive: true
            },
            include: {
              category: true,
              chapter: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      })

      return categories.map(category => ({
        ...category,
        cardCount: category.flashcards.length,
        flashcards: category.flashcards.map(card => ({
          ...card,
          difficulty: card.difficulty as 'Basic' | 'Intermediate' | 'Advanced',
          type: card.type as 'definition' | 'recognition' | 'application' | 'scenario' | 'assessment'
        }))
      }))
    } catch (error) {
      console.error('Error fetching categories with stats:', error)
      return []
    }
  }

  // Get all chapters with card counts
  static async getChaptersWithStats(): Promise<ChapterWithStats[]> {
    try {
      const chapters = await prisma.chapter.findMany({
        include: {
          flashcards: {
            where: {
              isActive: true
            },
            include: {
              category: true,
              chapter: true
            }
          }
        },
        orderBy: {
          number: 'asc'
        }
      })

      return chapters.map(chapter => ({
        ...chapter,
        cardCount: chapter.flashcards.length,
        flashcards: chapter.flashcards.map(card => ({
          ...card,
          difficulty: card.difficulty as 'Basic' | 'Intermediate' | 'Advanced',
          type: card.type as 'definition' | 'recognition' | 'application' | 'scenario' | 'assessment'
        }))
      }))
    } catch (error) {
      console.error('Error fetching chapters with stats:', error)
      return []
    }
  }

  // Get database statistics
  static async getDatabaseStats() {
    try {
      const [
        totalCards,
        totalCategories,
        totalChapters,
        difficultyStats,
        typeStats
      ] = await Promise.all([
        prisma.flashcard.count({ where: { isActive: true } }),
        prisma.category.count(),
        prisma.chapter.count(),
        prisma.flashcard.groupBy({
          by: ['difficulty'],
          where: { isActive: true },
          _count: { difficulty: true }
        }),
        prisma.flashcard.groupBy({
          by: ['type'],
          where: { isActive: true },
          _count: { type: true }
        })
      ])

      return {
        totalCards,
        totalCategories,
        totalChapters,
        difficultyBreakdown: difficultyStats.map(stat => ({
          difficulty: stat.difficulty,
          count: stat._count.difficulty
        })),
        typeBreakdown: typeStats.map(stat => ({
          type: stat.type,
          count: stat._count.type
        }))
      }
    } catch (error) {
      console.error('Error fetching database stats:', error)
      return {
        totalCards: 0,
        totalCategories: 0,
        totalChapters: 0,
        difficultyBreakdown: [],
        typeBreakdown: []
      }
    }
  }
}

export default FlashcardService