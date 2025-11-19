import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface FlashcardSeedData {
  id: string
  question: string
  answer: string
  difficulty: 'Basic' | 'Intermediate' | 'Advanced'
  type: 'definition' | 'recognition' | 'application' | 'scenario' | 'assessment'
  tags: string[]
  chapterNumber: number
  chapterTitle: string
  categoryId?: string
}

export async function seedFlashcards(flashcards: FlashcardSeedData[]) {
  console.log('🌱 Starting flashcard seeding...')
  
  try {
    // First, create categories and chapters
    const categories = new Map<string, number>()
    const chapters = new Map<number, { title: string; id: number }>()
    
    console.log('📚 Creating categories and chapters...')
    
    for (const card of flashcards) {
      // Create category if it doesn't exist
      const mainTag = card.tags[0] || 'general'
      if (!categories.has(mainTag)) {
        const category = await prisma.category.create({
          data: {
            name: mainTag.charAt(0).toUpperCase() + mainTag.slice(1),
            description: `EMT-B ${mainTag} related content`,
            color: getTagColor(mainTag)
          }
        })
        categories.set(mainTag, category.id)
        console.log(`  ✅ Created category: ${category.name}`)
      }
      
      // Create chapter if it doesn't exist
      if (!chapters.has(card.chapterNumber)) {
        const chapter = await prisma.chapter.create({
          data: {
            number: card.chapterNumber,
            title: card.chapterTitle,
            description: `Chapter ${card.chapterNumber}: ${card.chapterTitle}`
          }
        })
        chapters.set(card.chapterNumber, { title: card.chapterTitle, id: chapter.id })
        console.log(`  ✅ Created chapter: ${chapter.number} - ${chapter.title}`)
      }
    }
    
    console.log('🔥 Creating flashcards...')
    let createdCount = 0
    let skippedCount = 0
    
    // Create flashcards in batches for better performance
    const batchSize = 50
    for (let i = 0; i < flashcards.length; i += batchSize) {
      const batch = flashcards.slice(i, i + batchSize)
      
      for (const cardData of batch) {
        try {
          // Check if card already exists
          const existingCard = await prisma.flashcard.findUnique({
            where: { id: cardData.id }
          })
          
          if (existingCard) {
            skippedCount++
            continue
          }
          
          const mainTag = cardData.tags[0] || 'general'
          const categoryId = categories.get(mainTag)
          const chapterId = chapters.get(cardData.chapterNumber)?.id
          
          await prisma.flashcard.create({
            data: {
              id: cardData.id,
              question: cardData.question,
              answer: cardData.answer,
              difficulty: cardData.difficulty,
              type: cardData.type,
              tags: JSON.stringify(cardData.tags), // Store as JSON string for SQLite
              category: {
                connect: { id: categoryId! }
              },
              chapter: {
                connect: { number: cardData.chapterNumber }
              },
              isActive: true
            }
          })
          
          createdCount++
          
          // Progress indicator
          if (createdCount % 25 === 0) {
            console.log(`  📈 Created ${createdCount} flashcards...`)
          }
          
        } catch (error) {
          console.error(`❌ Error creating card ${cardData.id}:`, error)
          skippedCount++
        }
      }
    }
    
    console.log('📊 Seeding Summary:')
    console.log(`  ✅ Created: ${createdCount} flashcards`)
    console.log(`  ⏭️  Skipped: ${skippedCount} flashcards`)
    console.log(`  📁 Categories: ${categories.size}`)
    console.log(`  📚 Chapters: ${chapters.size}`)
    console.log('🎉 Flashcard seeding completed successfully!')
    
    return {
      created: createdCount,
      skipped: skippedCount,
      categories: categories.size,
      chapters: chapters.size
    }
    
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

function getTagColor(tag: string): string {
  const colors: Record<string, string> = {
    'assessment': '#3B82F6', // blue
    'cardiology': '#EF4444', // red
    'respiratory': '#10B981', // emerald
    'trauma': '#F59E0B', // amber
    'pediatric': '#8B5CF6', // violet
    'obstetric': '#EC4899', // pink
    'medical': '#06B6D4', // cyan
    'emergency': '#DC2626', // red-600
    'procedure': '#059669', // emerald-600
    'protocol': '#7C3AED', // violet-600
    'medication': '#DB2777', // pink-600
    'toxicology': '#CA8A04', // yellow-600
    'endocrine': '#2563EB', // blue-600
    'default': '#6B7280' // gray-500
  }
  
  return colors[tag.toLowerCase()] || colors.default
}

export async function clearExistingData() {
  console.log('🧹 Clearing existing flashcard data...')
  
  try {
    await prisma.flashcard.deleteMany({})
    await prisma.category.deleteMany({})
    await prisma.chapter.deleteMany({})
    
    console.log('✅ Cleared all existing data')
  } catch (error) {
    console.error('❌ Error clearing data:', error)
    throw error
  }
}

// Utility function to validate flashcard data
export function validateFlashcardData(cards: any[]): FlashcardSeedData[] {
  console.log(`🔍 Validating ${cards.length} flashcard records...`)
  
  const validCards: FlashcardSeedData[] = []
  const errors: string[] = []
  
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    
    try {
      // Required fields validation
      if (!card.id || typeof card.id !== 'string') {
        throw new Error('Missing or invalid id')
      }
      
      if (!card.question || typeof card.question !== 'string' || card.question.trim().length === 0) {
        throw new Error('Missing or invalid question')
      }
      
      if (!card.answer || typeof card.answer !== 'string' || card.answer.trim().length === 0) {
        throw new Error('Missing or invalid answer')
      }
      
      if (!['Basic', 'Intermediate', 'Advanced'].includes(card.difficulty)) {
        throw new Error(`Invalid difficulty: ${card.difficulty}`)
      }
      
      if (!['definition', 'recognition', 'application', 'scenario', 'assessment'].includes(card.type)) {
        throw new Error(`Invalid type: ${card.type}`)
      }
      
      if (!Array.isArray(card.tags) || card.tags.length === 0) {
        throw new Error('Tags must be a non-empty array')
      }
      
      if (!card.chapterNumber || typeof card.chapterNumber !== 'number' || card.chapterNumber < 1) {
        throw new Error('Missing or invalid chapterNumber')
      }
      
      if (!card.chapterTitle || typeof card.chapterTitle !== 'string' || card.chapterTitle.trim().length === 0) {
        throw new Error('Missing or invalid chapterTitle')
      }
      
      // Create validated card
      const validCard: FlashcardSeedData = {
        id: card.id.trim(),
        question: card.question.trim(),
        answer: card.answer.trim(),
        difficulty: card.difficulty,
        type: card.type,
        tags: card.tags.map((tag: string) => tag.trim().toLowerCase()),
        chapterNumber: card.chapterNumber,
        chapterTitle: card.chapterTitle.trim()
      }
      
      validCards.push(validCard)
      
    } catch (error) {
      errors.push(`Card ${i + 1} (id: ${card?.id || 'unknown'}): ${error}`)
    }
  }
  
  if (errors.length > 0) {
    console.log(`⚠️  Found ${errors.length} validation errors:`)
    errors.slice(0, 10).forEach(error => console.log(`  - ${error}`))
    if (errors.length > 10) {
      console.log(`  ... and ${errors.length - 10} more errors`)
    }
  }
  
  console.log(`✅ Validated ${validCards.length} valid flashcards out of ${cards.length} total`)
  
  return validCards
}