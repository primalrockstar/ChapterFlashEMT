#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyChapters() {
  try {
    console.log('📚 Detailed Chapter Analysis...\n')
    
    // Get all chapters with card counts
    const chapters = await prisma.chapter.findMany({
      include: {
        flashcards: {
          where: {
            isActive: true
          }
        }
      },
      orderBy: {
        number: 'asc'
      }
    })
    
    console.log(`📊 Found ${chapters.length} chapters:\n`)
    
    chapters.forEach((chapter, index) => {
      console.log(`${(index + 1).toString().padStart(2, ' ')}. Chapter ${chapter.number.toString().padStart(2, ' ')}: ${chapter.title}`)
      console.log(`    💳 ${chapter.flashcards.length} flashcards`)
      console.log('')
    })
    
    // Verify we have chapters 1-45
    const missingChapters = []
    for (let i = 1; i <= 45; i++) {
      const chapterExists = chapters.find(ch => ch.number === i)
      if (!chapterExists) {
        missingChapters.push(i)
      }
    }
    
    if (missingChapters.length === 0) {
      console.log('✅ All 45 EMT-B chapters are present!')
    } else {
      console.log(`❌ Missing chapters: ${missingChapters.join(', ')}`)
    }
    
    // Calculate total cards
    const totalCards = chapters.reduce((sum, ch) => sum + ch.flashcards.length, 0)
    console.log(`\n📈 Total flashcards across all chapters: ${totalCards}`)
    
    // Find chapters with no cards
    const emptyChapters = chapters.filter(ch => ch.flashcards.length === 0)
    if (emptyChapters.length > 0) {
      console.log(`\n⚠️  Chapters with no flashcards:`)
      emptyChapters.forEach(ch => {
        console.log(`   Chapter ${ch.number}: ${ch.title}`)
      })
    }
    
    // Show chapters with most/least cards
    const sortedByCards = [...chapters].sort((a, b) => b.flashcards.length - a.flashcards.length)
    console.log(`\n🔝 Most cards: Chapter ${sortedByCards[0].number} - ${sortedByCards[0].title} (${sortedByCards[0].flashcards.length} cards)`)
    console.log(`🔻 Least cards: Chapter ${sortedByCards[sortedByCards.length - 1].number} - ${sortedByCards[sortedByCards.length - 1].title} (${sortedByCards[sortedByCards.length - 1].flashcards.length} cards)`)
    
  } catch (error) {
    console.error('❌ Error verifying chapters:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyChapters()