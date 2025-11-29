#!/usr/bin/env tsx
/**
 * Fix Flashcard Data Issues
 * - Add default tags to cards missing tags
 * - Remove HTML tags from content
 * - Validate all fixes
 */

import fs from 'fs'
import path from 'path'

const FLASHCARDS_PATH = path.join(__dirname, '../src/data/flashcards-export.json')

interface FlashcardData {
  id: string
  question: string
  answer: string
  difficulty: string
  type: string
  tags: string[]
  chapterNumber?: number
  chapterTitle?: string
}

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
}

function log(color: keyof typeof colors, message: string) {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

/**
 * Generate appropriate tags based on card content and chapter
 */
function generateDefaultTags(card: FlashcardData): string[] {
  const tags: string[] = []
  
  // Add chapter-based tag
  if (card.chapterNumber) {
    tags.push(`chapter-${card.chapterNumber}`)
  }
  
  // Add type-based tag
  if (card.type) {
    tags.push(card.type)
  }
  
  // Add difficulty-based tag
  if (card.difficulty) {
    tags.push(card.difficulty.toLowerCase())
  }
  
  // Scan content for common EMT topics
  const content = `${card.question} ${card.answer}`.toLowerCase()
  
  // Medical topics
  if (content.match(/\b(airway|breathing|ventilation|oxygen|respiratory)\b/)) {
    tags.push('airway')
  }
  if (content.match(/\b(cardiac|heart|pulse|circulation|blood pressure|cpr)\b/)) {
    tags.push('cardiac')
  }
  if (content.match(/\b(trauma|fracture|injury|bleeding|wound|shock)\b/)) {
    tags.push('trauma')
  }
  if (content.match(/\b(medical|illness|disease|condition|symptom)\b/)) {
    tags.push('medical')
  }
  if (content.match(/\b(pediatric|child|infant|baby)\b/)) {
    tags.push('pediatric')
  }
  if (content.match(/\b(obstetric|pregnancy|birth|labor|delivery)\b/)) {
    tags.push('obstetric')
  }
  if (content.match(/\b(geriatric|elderly|older adult)\b/)) {
    tags.push('geriatric')
  }
  
  // Assessment topics
  if (content.match(/\b(assessment|evaluate|examine|check|vital signs)\b/)) {
    tags.push('assessment')
  }
  if (content.match(/\b(history|sample|opqrst|chief complaint)\b/)) {
    tags.push('patient-history')
  }
  
  // Treatment topics
  if (content.match(/\b(treatment|care|intervention|procedure)\b/)) {
    tags.push('treatment')
  }
  if (content.match(/\b(medication|drug|epinephrine|aspirin|nitroglycerin)\b/)) {
    tags.push('medication')
  }
  if (content.match(/\b(splint|immobilization|bandage|dressing)\b/)) {
    tags.push('immobilization')
  }
  
  // Operations topics
  if (content.match(/\b(scene|safety|hazard|danger|bsi)\b/)) {
    tags.push('scene-safety')
  }
  if (content.match(/\b(communication|report|radio|documentation)\b/)) {
    tags.push('communication')
  }
  if (content.match(/\b(transport|ambulance|move|transfer)\b/)) {
    tags.push('transport')
  }
  if (content.match(/\b(equipment|device|tool|apparatus)\b/)) {
    tags.push('equipment')
  }
  
  // Legal/ethical topics
  if (content.match(/\b(consent|refusal|legal|liability|negligence)\b/)) {
    tags.push('legal')
  }
  if (content.match(/\b(protocol|standard|scope|guideline)\b/)) {
    tags.push('protocol')
  }
  
  // If no specific tags found, add generic ones
  if (tags.length === 3) { // Only has chapter, type, difficulty
    tags.push('emt-basic')
    tags.push('core-knowledge')
  }
  
  // Remove duplicates and return
  return Array.from(new Set(tags))
}

/**
 * Remove HTML tags from text
 */
function stripHtmlTags(text: string): string {
  return text.replace(/<[^>]+>/g, '')
}

/**
 * Fix all flashcard issues
 */
function fixFlashcards() {
  log('bold', '\n╔════════════════════════════════════════════════════════════╗')
  log('bold', '║          ChapterFlashEMT - Flashcard Data Fixer           ║')
  log('bold', '╚════════════════════════════════════════════════════════════╝\n')

  try {
    // Load flashcards
    log('cyan', '📥 Loading flashcards...')
    const rawData = fs.readFileSync(FLASHCARDS_PATH, 'utf-8')
    const jsonData = JSON.parse(rawData)
    
    // Extract cards from the data structure
    const mainCards: FlashcardData[] = jsonData.data?.mainFlashcards || []
    const chapterCards: FlashcardData[] = []
    
    if (jsonData.data?.chapterCollections && Array.isArray(jsonData.data.chapterCollections)) {
      jsonData.data.chapterCollections.forEach((collection: any) => {
        if (collection.flashcards && Array.isArray(collection.flashcards)) {
          chapterCards.push(...collection.flashcards)
        }
      })
    }
    
    const cards = [...mainCards, ...chapterCards]
    log('green', `✓ Loaded ${cards.length} flashcards (${mainCards.length} main + ${chapterCards.length} chapter)\n`)

    let fixedTagsCount = 0
    let fixedHtmlCount = 0
    let totalChanges = 0

    // Fix each card
    cards.forEach((card, index) => {
      let cardChanged = false

      // Fix missing or empty tags
      if (!card.tags || card.tags.length === 0) {
        card.tags = generateDefaultTags(card)
        fixedTagsCount++
        cardChanged = true
      }

      // Strip HTML from question
      const cleanQuestion = stripHtmlTags(card.question)
      if (cleanQuestion !== card.question) {
        log('yellow', `  Removing HTML from question in card: ${card.id}`)
        card.question = cleanQuestion
        fixedHtmlCount++
        cardChanged = true
      }

      // Strip HTML from answer
      const cleanAnswer = stripHtmlTags(card.answer)
      if (cleanAnswer !== card.answer) {
        log('yellow', `  Removing HTML from answer in card: ${card.id}`)
        card.answer = cleanAnswer
        fixedHtmlCount++
        cardChanged = true
      }

      if (cardChanged) {
        totalChanges++
      }
    })

    // Save fixed flashcards
    log('cyan', '\n💾 Saving fixed flashcards...')
    
    // Rebuild the data structure
    jsonData.data.mainFlashcards = cards.slice(0, mainCards.length)
    
    if (jsonData.data.chapterCollections && Array.isArray(jsonData.data.chapterCollections)) {
      let chapterIndex = mainCards.length
      jsonData.data.chapterCollections.forEach((collection: any) => {
        const chapterLength = collection.flashcards.length
        collection.flashcards = cards.slice(chapterIndex, chapterIndex + chapterLength)
        chapterIndex += chapterLength
      })
    }
    
    fs.writeFileSync(FLASHCARDS_PATH, JSON.stringify(jsonData, null, 2), 'utf-8')
    log('green', `✓ Saved ${cards.length} flashcards\n`)

    // Print summary
    log('bold', '╔════════════════════════════════════════════════════════════╗')
    log('bold', '║                       FIX SUMMARY                          ║')
    log('bold', '╚════════════════════════════════════════════════════════════╝\n')
    
    log('blue', `  Total cards processed:     ${cards.length}`)
    log('green', `  Cards with tags added:     ${fixedTagsCount}`)
    log('green', `  Cards with HTML removed:   ${fixedHtmlCount}`)
    log('green', `  Total cards modified:      ${totalChanges}`)
    
    if (totalChanges > 0) {
      log('green', '\n✅ All issues fixed successfully!')
      log('cyan', '\nRun `npm run test:cards` to verify the fixes.')
    } else {
      log('green', '\n✅ No issues found. All flashcards are valid.')
    }

  } catch (error) {
    log('yellow', '\n❌ Error fixing flashcards:')
    console.error(error)
    process.exit(1)
  }
}

// Run the fixer
fixFlashcards()
