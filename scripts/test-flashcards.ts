#!/usr/bin/env tsx
/**
 * Automated Flashcard Testing Suite
 * Tests all 700+ flashcards for bleed-over, rendering issues, and data integrity
 */

import { getAllLocalFlashcards } from '../src/lib/local-flashcards'
import { FlashcardData } from '../src/components/flashcard/Flashcard'

interface TestResult {
  total: number
  passed: number
  failed: number
  issues: Array<{
    cardId: string
    chapter: number
    type: string
    issue: string
  }>
}

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
}

function log(color: keyof typeof colors, message: string) {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

/**
 * Test 1: Data Integrity
 * Ensures all flashcards have required fields
 */
function testDataIntegrity(cards: FlashcardData[]): TestResult {
  log('cyan', '\n🔍 Test 1: Data Integrity')
  log('blue', '─'.repeat(60))
  
  const result: TestResult = {
    total: cards.length,
    passed: 0,
    failed: 0,
    issues: []
  }

  cards.forEach(card => {
    let hasIssue = false
    
    // Check required fields
    if (!card.id || card.id.trim() === '') {
      result.issues.push({
        cardId: card.id || 'UNKNOWN',
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: 'Missing or empty ID'
      })
      hasIssue = true
    }

    if (!card.question || card.question.trim() === '') {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: 'Missing or empty question'
      })
      hasIssue = true
    }

    if (!card.answer || card.answer.trim() === '') {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: 'Missing or empty answer'
      })
      hasIssue = true
    }

    if (!card.difficulty || !['Basic', 'Intermediate', 'Advanced'].includes(card.difficulty)) {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: `Invalid difficulty: ${card.difficulty}`
      })
      hasIssue = true
    }

    if (!card.type || card.type.trim() === '') {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: 'UNKNOWN',
        issue: 'Missing card type'
      })
      hasIssue = true
    }

    if (!Array.isArray(card.tags) || card.tags.length === 0) {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: 'Missing or empty tags array'
      })
      hasIssue = true
    }

    if (hasIssue) {
      result.failed++
    } else {
      result.passed++
    }
  })

  return result
}

/**
 * Test 2: Content Quality
 * Checks for potential rendering issues
 */
function testContentQuality(cards: FlashcardData[]): TestResult {
  log('cyan', '\n📝 Test 2: Content Quality')
  log('blue', '─'.repeat(60))
  
  const result: TestResult = {
    total: cards.length,
    passed: 0,
    failed: 0,
    issues: []
  }

  cards.forEach(card => {
    let hasIssue = false

    // Check for suspiciously short content
    if (card.question.length < 10) {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: `Question too short (${card.question.length} chars): "${card.question}"`
      })
      hasIssue = true
    }

    if (card.answer.length < 10) {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: `Answer too short (${card.answer.length} chars): "${card.answer}"`
      })
      hasIssue = true
    }

    // Check for suspiciously long content (might cause overflow/bleed)
    if (card.question.length > 500) {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: `Question very long (${card.question.length} chars) - may cause rendering issues`
      })
      hasIssue = true
    }

    if (card.answer.length > 1000) {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: `Answer very long (${card.answer.length} chars) - may cause overflow`
      })
      hasIssue = true
    }

    // Check for duplicate content (question == answer)
    if (card.question.toLowerCase().trim() === card.answer.toLowerCase().trim()) {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: 'Question and answer are identical'
      })
      hasIssue = true
    }

    // Check for HTML tags (could cause bleed-through)
    const htmlPattern = /<[^>]+>/g
    if (htmlPattern.test(card.question)) {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: 'Question contains HTML tags - may cause rendering issues'
      })
      hasIssue = true
    }

    if (htmlPattern.test(card.answer)) {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: 'Answer contains HTML tags - may cause rendering issues'
      })
      hasIssue = true
    }

    if (hasIssue) {
      result.failed++
    } else {
      result.passed++
    }
  })

  return result
}

/**
 * Test 3: Chapter Distribution
 * Ensures cards are properly distributed across chapters
 */
function testChapterDistribution(cards: FlashcardData[]): TestResult {
  log('cyan', '\n📚 Test 3: Chapter Distribution')
  log('blue', '─'.repeat(60))
  
  const result: TestResult = {
    total: cards.length,
    passed: 0,
    failed: 0,
    issues: []
  }

  const chapterCounts = new Map<number, number>()
  const chapterTitles = new Map<number, Set<string>>()

  cards.forEach(card => {
    const chapter = card.chapterNumber || 0
    chapterCounts.set(chapter, (chapterCounts.get(chapter) || 0) + 1)
    
    if (!chapterTitles.has(chapter)) {
      chapterTitles.set(chapter, new Set())
    }
    if (card.chapterTitle) {
      chapterTitles.get(chapter)!.add(card.chapterTitle)
    }
  })

  // Check for chapters with too few cards
  chapterCounts.forEach((count, chapter) => {
    if (count < 5) {
      result.issues.push({
        cardId: 'N/A',
        chapter,
        type: 'chapter',
        issue: `Chapter ${chapter} only has ${count} cards (may need more content)`
      })
      result.failed++
    } else {
      result.passed++
    }

    // Check for inconsistent chapter titles
    const titles = chapterTitles.get(chapter)
    if (titles && titles.size > 1) {
      result.issues.push({
        cardId: 'N/A',
        chapter,
        type: 'chapter',
        issue: `Chapter ${chapter} has ${titles.size} different titles: ${Array.from(titles).join(', ')}`
      })
    }
  })

  return result
}

/**
 * Test 4: Card Type Validation
 * Ensures all card types are valid
 */
function testCardTypes(cards: FlashcardData[]): TestResult {
  log('cyan', '\n🎯 Test 4: Card Type Validation')
  log('blue', '─'.repeat(60))
  
  const validTypes = ['definition', 'recognition', 'application', 'scenario', 'assessment']
  const result: TestResult = {
    total: cards.length,
    passed: 0,
    failed: 0,
    issues: []
  }

  const typeCounts = new Map<string, number>()

  cards.forEach(card => {
    const type = card.type.toLowerCase()
    typeCounts.set(type, (typeCounts.get(type) || 0) + 1)

    if (!validTypes.includes(type)) {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: `Invalid card type: "${card.type}". Valid types: ${validTypes.join(', ')}`
      })
      result.failed++
    } else {
      result.passed++
    }
  })

  // Print distribution
  log('blue', '\nCard Type Distribution:')
  validTypes.forEach(type => {
    const count = typeCounts.get(type) || 0
    const percentage = ((count / cards.length) * 100).toFixed(1)
    console.log(`  ${type.padEnd(15)} ${count.toString().padStart(4)} cards (${percentage}%)`)
  })

  return result
}

/**
 * Test 5: Tag Validation
 * Ensures tags are meaningful and consistent
 */
function testTags(cards: FlashcardData[]): TestResult {
  log('cyan', '\n🏷️  Test 5: Tag Validation')
  log('blue', '─'.repeat(60))
  
  const result: TestResult = {
    total: cards.length,
    passed: 0,
    failed: 0,
    issues: []
  }

  const allTags = new Set<string>()

  cards.forEach(card => {
    let hasIssue = false

    // Check for empty tags
    if (card.tags.some(tag => !tag || tag.trim() === '')) {
      result.issues.push({
        cardId: card.id,
        chapter: card.chapterNumber || 0,
        type: card.type,
        issue: 'Contains empty tags'
      })
      hasIssue = true
    }

    // Check for suspiciously long tags
    card.tags.forEach(tag => {
      if (tag.length > 50) {
        result.issues.push({
          cardId: card.id,
          chapter: card.chapterNumber || 0,
          type: card.type,
          issue: `Tag too long (${tag.length} chars): "${tag}"`
        })
        hasIssue = true
      }
      allTags.add(tag.toLowerCase())
    })

    if (hasIssue) {
      result.failed++
    } else {
      result.passed++
    }
  })

  log('blue', `\nTotal unique tags: ${allTags.size}`)

  return result
}

/**
 * Print test results summary
 */
function printResults(testName: string, result: TestResult) {
  const passRate = ((result.passed / result.total) * 100).toFixed(1)
  const status = result.failed === 0 ? '✅' : '⚠️'
  
  console.log(`\n${status} ${testName}`)
  console.log(`   Total:  ${result.total}`)
  log('green', `   Passed: ${result.passed} (${passRate}%)`)
  
  if (result.failed > 0) {
    log('red', `   Failed: ${result.failed}`)
    
    if (result.issues.length > 0 && result.issues.length <= 10) {
      log('yellow', '\n   Issues found:')
      result.issues.forEach(issue => {
        console.log(`   - Ch.${issue.chapter} [${issue.type}] ${issue.cardId}: ${issue.issue}`)
      })
    } else if (result.issues.length > 10) {
      log('yellow', `\n   ${result.issues.length} issues found (showing first 10):`)
      result.issues.slice(0, 10).forEach(issue => {
        console.log(`   - Ch.${issue.chapter} [${issue.type}] ${issue.cardId}: ${issue.issue}`)
      })
      log('yellow', `   ... and ${result.issues.length - 10} more`)
    }
  }
}

/**
 * Main test runner
 */
async function runTests() {
  log('bold', '\n╔════════════════════════════════════════════════════════════╗')
  log('bold', '║     ChapterFlashEMT - Automated Flashcard Test Suite      ║')
  log('bold', '╚════════════════════════════════════════════════════════════╝')

  try {
    // Load all flashcards
    log('cyan', '\n📥 Loading flashcards...')
    const cards = getAllLocalFlashcards()
    log('green', `✓ Loaded ${cards.length} flashcards`)

    // Run all tests
    const results = {
      dataIntegrity: testDataIntegrity(cards),
      contentQuality: testContentQuality(cards),
      chapterDistribution: testChapterDistribution(cards),
      cardTypes: testCardTypes(cards),
      tags: testTags(cards)
    }

    // Print summary
    log('bold', '\n\n╔════════════════════════════════════════════════════════════╗')
    log('bold', '║                      TEST SUMMARY                          ║')
    log('bold', '╚════════════════════════════════════════════════════════════╝')

    printResults('Data Integrity', results.dataIntegrity)
    printResults('Content Quality', results.contentQuality)
    printResults('Chapter Distribution', results.chapterDistribution)
    printResults('Card Types', results.cardTypes)
    printResults('Tag Validation', results.tags)

    // Overall summary
    const totalTests = Object.values(results).reduce((sum, r) => sum + r.total, 0)
    const totalPassed = Object.values(results).reduce((sum, r) => sum + r.passed, 0)
    const totalFailed = Object.values(results).reduce((sum, r) => sum + r.failed, 0)
    const overallPassRate = ((totalPassed / totalTests) * 100).toFixed(1)

    log('bold', '\n' + '─'.repeat(60))
    log('bold', '  OVERALL RESULTS')
    log('bold', '─'.repeat(60))
    console.log(`  Total Tests:    ${totalTests}`)
    log('green', `  Passed:         ${totalPassed} (${overallPassRate}%)`)
    
    if (totalFailed > 0) {
      log('red', `  Failed:         ${totalFailed}`)
      log('yellow', '\n⚠️  Some issues were found. Review the details above.')
    } else {
      log('green', '\n✅ ALL TESTS PASSED! Flashcards are ready for production.')
    }

    // Exit code
    process.exit(totalFailed > 0 ? 1 : 0)

  } catch (error) {
    log('red', '\n❌ Test execution failed:')
    console.error(error)
    process.exit(1)
  }
}

// Run tests
runTests()
