import { FlashcardSeedData } from '@/lib/seed-flashcards'

// Data structure from the export file
interface ExportedFlashcard {
  id: string
  question: string
  answer: string
  category: string
  difficulty: string
  certificationLevel: string
  tags: string[]
  chapterNumber: number
  moduleNumber?: number
  chapterTitle?: string
  type?: string
}

interface ChapterFlashcard {
  id?: string
  front?: string
  back?: string
  question?: string
  answer?: string
  type?: string
  difficulty?: string
  tags?: string[]
  chapterNumber?: number
  chapterTitle?: string
  [key: string]: any
}

interface ExportData {
  data: {
    mainFlashcards: ExportedFlashcard[]
    chapterCollections: Array<{
      chapterNumber: number
      chapterTitle?: string
      flashcards: ChapterFlashcard[]
      count: number
    }>
  }
}

// Chapter titles mapping - Original titles to avoid copyright issues
const chapterTitles: Record<number, string> = {
  1: "Emergency Medical Services Overview",
  2: "Personal Safety and Professional Wellness", 
  3: "Healthcare Law and Professional Ethics",
  4: "Emergency Communication Systems",
  5: "Healthcare Terminology Fundamentals",
  6: "Human Anatomy and Physiology",
  7: "Patient Development Across Age Groups", 
  8: "Clinical Patient Evaluation",
  9: "Emergency Response Communications",
  10: "Medical Record Documentation",
  11: "Basic Pharmacology Principles",
  12: "Emergency Drug Administration",
  13: "Basic Life Support Techniques",
  14: "Airway Control and Management",
  15: "Breathing Support and Ventilation",
  16: "Heart and Circulation Emergencies",
  17: "Breathing and Lung Emergencies", 
  18: "Skin and Surface Wound Care",
  19: "Burn Injury Management",
  20: "Bone and Joint Injury Care",
  21: "Poisoning and Overdose Response",
  22: "Mental Health Crisis Intervention",
  23: "Women's Health Emergencies",
  24: "Childbirth and Newborn Care",
  25: "Infant Emergency Care",
  26: "Child Patient Care",
  27: "Elderly Patient Considerations", 
  28: "Head and Spinal Injury Management",
  29: "Chest Injury Assessment",
  30: "Abdominal Injury Evaluation",
  31: "Bone Fracture and Dislocation Care",
  32: "Weather and Environmental Hazards",
  33: "Blood Sugar and Hormone Crises",
  34: "Blood Disorder Emergencies",
  35: "Kidney and Urinary Emergencies",
  36: "Chemical Exposure Response",
  37: "Trauma Care System Operations",
  38: "Vehicle Rescue Operations",
  39: "Emergency Scene Management",
  40: "Public Safety Threat Response",
  41: "Mass Casualty Event Management",
  42: "Law Enforcement Scene Safety",
  43: "Dangerous Material Response",
  44: "Multi-Patient Incident Operations",
  45: "Helicopter Medical Transport"
}

// Transform difficulty levels
function mapDifficulty(difficulty: string): 'Basic' | 'Intermediate' | 'Advanced' {
  const normalized = difficulty?.toLowerCase() || 'basic'
  if (normalized.includes('advanced')) return 'Advanced'
  if (normalized.includes('intermediate')) return 'Intermediate'
  return 'Basic'
}

// Transform card types
function mapType(type?: string): 'definition' | 'recognition' | 'application' | 'scenario' | 'assessment' {
  const normalized = type?.toLowerCase() || 'definition'
  if (normalized.includes('scenario')) return 'scenario'
  if (normalized.includes('recognition')) return 'recognition'
  if (normalized.includes('application')) return 'application'
  if (normalized.includes('assessment')) return 'assessment'
  return 'definition'
}

// Generate tags from category and other metadata
function generateTags(card: ExportedFlashcard | ChapterFlashcard, chapterNum: number): string[] {
  const tags: string[] = []
  
  // Add category-based tags
  if ('category' in card && card.category) {
    tags.push(card.category.toLowerCase().replace(/\s+/g, '-'))
  }
  
  // Add existing tags
  if (card.tags && Array.isArray(card.tags)) {
    tags.push(...card.tags.map(tag => tag.toLowerCase().replace(/\s+/g, '-')))
  }
  
  // Add chapter-based tags
  const chapterTitle = chapterTitles[chapterNum]
  if (chapterTitle) {
    tags.push(chapterTitle.toLowerCase().replace(/\s+/g, '-'))
  }
  
  // Add EMT-specific tags based on content
  const getContent = (card: ExportedFlashcard | ChapterFlashcard): string => {
    const question = 'question' in card ? card.question : ('front' in card ? card.front : '')
    const answer = 'answer' in card ? card.answer : ('back' in card ? card.back : '')
    return ((question || '') + ' ' + (answer || '')).toLowerCase()
  }
  
  const content = getContent(card)
  
  if (content.includes('emergency') || content.includes('911')) tags.push('emergency')
  if (content.includes('protocol') || content.includes('procedure')) tags.push('protocol')
  if (content.includes('medication') || content.includes('drug')) tags.push('medication')
  if (content.includes('trauma') || content.includes('injury')) tags.push('trauma')
  if (content.includes('cardiac') || content.includes('heart')) tags.push('cardiology')
  if (content.includes('respiratory') || content.includes('breathing')) tags.push('respiratory')
  if (content.includes('pediatric') || content.includes('child')) tags.push('pediatric')
  if (content.includes('vital') || content.includes('pulse') || content.includes('blood pressure')) tags.push('vital-signs')
  if (content.includes('assessment') || content.includes('examination')) tags.push('assessment')
  if (content.includes('treatment') || content.includes('intervention')) tags.push('treatment')
  
  // Remove duplicates and limit to 8 tags
  return [...new Set(tags)].slice(0, 8)
}

export function transformFlashcardData(exportData: ExportData): FlashcardSeedData[] {
  const transformedCards: FlashcardSeedData[] = []
  
  // Transform main flashcards
  console.log('Transforming main flashcards...')
  exportData.data.mainFlashcards.forEach(card => {
    const transformed: FlashcardSeedData = {
      id: card.id,
      question: card.question,
      answer: card.answer,
      difficulty: mapDifficulty(card.difficulty),
      type: mapType(card.type),
      tags: generateTags(card, card.chapterNumber),
      chapterNumber: card.chapterNumber,
      chapterTitle: card.chapterTitle || chapterTitles[card.chapterNumber] || `Chapter ${card.chapterNumber}`
    }
    transformedCards.push(transformed)
  })
  
  // Transform chapter flashcards
  console.log('Transforming chapter collections...')
  exportData.data.chapterCollections.forEach(collection => {
    collection.flashcards.forEach((card, index) => {
      // Generate ID if missing
      const cardId = card.id || `ch${collection.chapterNumber}-${String(index + 1).padStart(3, '0')}`
      
      // Get question and answer from various possible field names
      const question = card.question || card.front || `Chapter ${collection.chapterNumber} Question ${index + 1}`
      const answer = card.answer || card.back || 'Answer not provided'
      
      const transformed: FlashcardSeedData = {
        id: cardId,
        question,
        answer,
        difficulty: mapDifficulty(card.difficulty || 'Basic'),
        type: mapType(card.type),
        tags: generateTags(card, collection.chapterNumber),
        chapterNumber: collection.chapterNumber,
        chapterTitle: card.chapterTitle || collection.chapterTitle || chapterTitles[collection.chapterNumber] || `Chapter ${collection.chapterNumber}`
      }
      transformedCards.push(transformed)
    })
  })
  
  console.log(`Transformed ${transformedCards.length} total flashcards`)
  return transformedCards
}

// For direct use with raw JSON data
export function transformFromJSON(jsonData: string): FlashcardSeedData[] {
  try {
    const exportData: ExportData = JSON.parse(jsonData)
    return transformFlashcardData(exportData)
  } catch (error) {
    console.error('Error parsing JSON data:', error)
    throw new Error('Invalid JSON format')
  }
}