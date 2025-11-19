#!/usr/bin/env node

import { PrismaClient } from '@prisma/client'
import { seedFlashcards, clearExistingData, validateFlashcardData } from '../src/lib/seed-flashcards'
import { transformFromJSON } from '../src/data/flashcard-transformer'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

// The flashcard export JSON data
const flashcardExportData = {
  "generatedAt": "2025-11-19T07:59:47.864Z",
  "filtersApplied": {
    "chapters": [],
    "categories": [],
    "active": false
  },
  "sourceFiles": {
    "main": "src/data/flashcards.ts",
    "chapters": [
      "src/data/emtb/chapter1-flashcards.ts",
      "src/data/emtb/chapter2-flashcards.ts",
      "src/data/emtb/chapter3-flashcards.ts",
      "src/data/emtb/chapter4-flashcards.ts",
      "src/data/emtb/chapter5-flashcards.ts",
      "src/data/emtb/chapter6-flashcards.ts",
      "src/data/emtb/chapter7-flashcards.ts",
      "src/data/emtb/chapter8-flashcards.ts",
      "src/data/emtb/chapter9-flashcards.ts",
      "src/data/emtb/chapter10-flashcards.ts",
      "src/data/emtb/chapter11-flashcards.ts",
      "src/data/emtb/chapter12-flashcards.ts",
      "src/data/emtb/chapter13-flashcards.ts",
      "src/data/emtb/chapter14-flashcards.ts",
      "src/data/emtb/chapter15-flashcards.ts",
      "src/data/emtb/chapter16-flashcards.ts",
      "src/data/emtb/chapter17-flashcards.ts",
      "src/data/emtb/chapter18-flashcards.ts",
      "src/data/emtb/chapter19-flashcards.ts",
      "src/data/emtb/chapter20-flashcards.ts",
      "src/data/emtb/chapter21-flashcards.ts",
      "src/data/emtb/chapter22-flashcards.ts",
      "src/data/emtb/chapter23-flashcards.ts",
      "src/data/emtb/chapter24-flashcards.ts",
      "src/data/emtb/chapter25-flashcards.ts",
      "src/data/emtb/chapter26-flashcards.ts",
      "src/data/emtb/chapter27-flashcards.ts",
      "src/data/emtb/chapter28-flashcards.ts",
      "src/data/emtb/chapter29-flashcards.ts",
      "src/data/emtb/chapter30-flashcards.ts",
      "src/data/emtb/chapter31-flashcards.ts",
      "src/data/emtb/chapter32-flashcards.ts",
      "src/data/emtb/chapter33-flashcards.ts",
      "src/data/emtb/chapter34-flashcards.ts",
      "src/data/emtb/chapter35-flashcards.ts",
      "src/data/emtb/chapter36-flashcards.ts",
      "src/data/emtb/chapter37-flashcards.ts",
      "src/data/emtb/chapter38-flashcards.ts",
      "src/data/emtb/chapter39-flashcards.ts",
      "src/data/emtb/chapter40-flashcards.ts",
      "src/data/emtb/chapter41-flashcards.ts",
      "src/data/emtb/chapter42-flashcards.ts",
      "src/data/emtb/chapter43-flashcards.ts",
      "src/data/emtb/chapter44-flashcards.ts",
      "src/data/emtb/chapter45-flashcards.ts"
    ]
  },
  "stats": {
    "beforeFilter": {
      "mainFlashcards": 30,
      "chapterCollections": 45,
      "chapterFlashcards": 675
    },
    "afterFilter": {
      "mainFlashcards": 30,
      "chapterCollections": 45,
      "chapterFlashcards": 675
    }
  },
  "data": {
    "mainFlashcards": [
      {
        "id": "ch1-001",
        "question": "What are the four levels of EMS training?",
        "answer": "Emergency Medical Responder (EMR), Emergency Medical Technician (EMT), Advanced Emergency Medical Technician (AEMT), and Paramedic",
        "category": "EMS Systems",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "EMS levels",
          "certification",
          "training"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-002",
        "question": "What does EMT scope of practice define?",
        "answer": "The range of duties and skills that an EMT is allowed and expected to perform when necessary",
        "category": "EMS Systems",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "scope of practice",
          "EMT duties"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-003",
        "question": "What is medical direction?",
        "answer": "Oversight of patient care aspects of an EMS system by the medical director",
        "category": "EMS Systems",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "medical direction",
          "oversight"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-004",
        "question": "What are the two types of medical control?",
        "answer": "Online (direct) medical control and offline (indirect) medical control",
        "category": "EMS Systems",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "medical control",
          "online",
          "offline"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-005",
        "question": "What is the difference between protocols and standing orders?",
        "answer": "Protocols are written guidelines for patient care, while standing orders are written instructions that allow EMTs to perform certain skills without contacting medical control",
        "category": "EMS Systems",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "protocols",
          "standing orders"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-006",
        "question": "What is continuous quality improvement (CQI)?",
        "answer": "A system of ongoing internal and external reviews and audits of all aspects of an EMS system",
        "category": "EMS Systems",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "CQI",
          "quality improvement"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-007",
        "question": "What are the 14 attributes of an EMS system according to the EMS Agenda for the Future?",
        "answer": "Integration, EMS research, legislation and regulation, system finance, human resources, medical direction, education systems, public education, prevention, public access, communication systems, clinical care, information systems, and evaluation",
        "category": "EMS Systems",
        "difficulty": "Advanced",
        "certificationLevel": "EMT",
        "tags": [
          "EMS attributes",
          "system components"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-008",
        "question": "What is the primary role of an EMT?",
        "answer": "To provide basic emergency medical care and transportation for critical and emergent patients",
        "category": "EMS Systems",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "EMT role",
          "patient care"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-009",
        "question": "What does EMR stand for and what is their role?",
        "answer": "Emergency Medical Responder - provides immediate lifesaving care to critical patients until higher trained personnel arrive",
        "category": "EMS Systems",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "EMR",
          "first responder"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-010",
        "question": "What additional skills can an AEMT perform compared to an EMT?",
        "answer": "Limited advanced airway procedures, IV therapy, and administration of certain medications",
        "category": "EMS Systems",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "AEMT",
          "advanced skills"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-011",
        "question": "What is the highest level of prehospital care?",
        "answer": "Paramedic - can perform advanced assessment and provide invasive and drug interventions",
        "category": "EMS Systems",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "paramedic",
          "advanced care"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-012",
        "question": "What is the purpose of the National Registry of Emergency Medical Technicians (NREMT)?",
        "answer": "To provide national standards for EMT testing and certification",
        "category": "EMS Systems",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "NREMT",
          "certification"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-013",
        "question": "What is the difference between licensure and certification?",
        "answer": "Licensure is permission to practice granted by a state regulatory agency, while certification is recognition of qualifications by a professional organization",
        "category": "EMS Systems",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "licensure",
          "certification"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-014",
        "question": "What is reciprocity in EMS?",
        "answer": "The process by which an individual certified in one state can become certified in another state",
        "category": "EMS Systems",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "reciprocity",
          "state certification"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch1-015",
        "question": "What are the key components of an integrated EMS system?",
        "answer": "Public education, easy access (911), dispatch, first responders, EMS personnel, hospitals, rehabilitation, data collection, and evaluation",
        "category": "EMS Systems",
        "difficulty": "Advanced",
        "certificationLevel": "EMT",
        "tags": [
          "integrated system",
          "components"
        ],
        "chapterNumber": 1,
        "moduleNumber": 1
      },
      {
        "id": "ch2-001",
        "question": "What are the five stages of grief according to Kübler-Ross?",
        "answer": "Denial, anger, bargaining, depression, and acceptance",
        "category": "Workforce Safety",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "grief stages",
          "Kübler-Ross"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-002",
        "question": "What is critical incident stress?",
        "answer": "The reaction to any situation that causes a person to experience unusually strong emotions that interfere with normal functioning",
        "category": "Workforce Safety",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "critical incident",
          "stress"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-003",
        "question": "What are common signs of stress in EMS personnel?",
        "answer": "Irritability, difficulty sleeping, anxiety, indecisiveness, guilt, loss of appetite, and loss of interest in work",
        "category": "Workforce Safety",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "stress signs",
          "symptoms"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-004",
        "question": "What is CISD?",
        "answer": "Critical Incident Stress Debriefing - a process of providing emotional and psychological support after traumatic events",
        "category": "Workforce Safety",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "CISD",
          "debriefing"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-005",
        "question": "What are the three types of stress reactions?",
        "answer": "Acute stress reactions, delayed stress reactions, and cumulative stress reactions",
        "category": "Workforce Safety",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "stress types",
          "reactions"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-006",
        "question": "What is burnout?",
        "answer": "A condition of chronic fatigue, irritability, and frustration that results from mounting stress over time",
        "category": "Workforce Safety",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "burnout",
          "chronic stress"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-007",
        "question": "What are warning signs of burnout?",
        "answer": "Chronic fatigue, irritability, cynicism, decreased job performance, and withdrawal from colleagues",
        "category": "Workforce Safety",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "burnout signs",
          "warning"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-008",
        "question": "What is the purpose of an Employee Assistance Program (EAP)?",
        "answer": "To provide confidential counseling and support services for employees dealing with personal or work-related problems",
        "category": "Workforce Safety",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "EAP",
          "employee assistance"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-009",
        "question": "What are healthy lifestyle practices for EMS personnel?",
        "answer": "Regular exercise, proper nutrition, adequate sleep, stress management, and avoiding alcohol and drug abuse",
        "category": "Workforce Safety",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "healthy lifestyle",
          "wellness"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-010",
        "question": "What is the proper body mechanics for lifting?",
        "answer": "Keep your back straight, lift with your legs, keep the load close to your body, and avoid twisting",
        "category": "Workforce Safety",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "body mechanics",
          "lifting"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-011",
        "question": "What are the three main categories of infectious diseases?",
        "answer": "Viral, bacterial, and fungal infections",
        "category": "Workforce Safety",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "infectious diseases",
          "categories"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-012",
        "question": "What does BSI stand for and what does it mean?",
        "answer": "Body Substance Isolation - treating all body fluids as potentially infectious",
        "category": "Workforce Safety",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "BSI",
          "infection control"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-013",
        "question": "What are the components of Standard Precautions?",
        "answer": "Hand hygiene, personal protective equipment (PPE), safe injection practices, and proper handling of contaminated equipment",
        "category": "Workforce Safety",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "standard precautions",
          "PPE"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-014",
        "question": "What should you do if exposed to potentially infectious material?",
        "answer": "Immediately wash the area with soap and water, report the exposure to your supervisor, and seek medical evaluation",
        "category": "Workforce Safety",
        "difficulty": "Intermediate",
        "certificationLevel": "EMT",
        "tags": [
          "exposure",
          "infectious material"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1
      },
      {
        "id": "ch2-015",
        "question": "What is the most effective way to prevent the spread of infection?",
        "answer": "Proper hand hygiene - washing hands with soap and water or using alcohol-based hand sanitizer",
        "category": "Workforce Safety",
        "difficulty": "Basic",
        "certificationLevel": "EMT",
        "tags": [
          "hand hygiene",
          "infection prevention"
        ],
        "chapterNumber": 2,
        "moduleNumber": 1,
        "chapterTitle": "Workforce Safety and Wellness"
      }
    ],
    "chapterCollections": []
  }
}

async function main() {
  try {
    console.log('🚀 Starting EMT-B Flashcard Database Seeding...')
    console.log('📊 Expected: 705 total flashcards (30 main + 675 chapter cards)')
    
    // Transform the data
    console.log('\n🔄 Transforming flashcard data...')
    const jsonString = JSON.stringify(flashcardExportData)
    const transformedCards = transformFromJSON(jsonString)
    
    console.log(`✅ Transformation complete: ${transformedCards.length} cards`)
    
    // Validate the data
    console.log('\n🔍 Validating flashcard data...')
    const validCards = validateFlashcardData(transformedCards)
    
    if (validCards.length === 0) {
      throw new Error('No valid flashcards found after validation')
    }
    
    // Clear existing data
    console.log('\n🧹 Clearing existing database...')
    await clearExistingData()
    
    // Seed the database
    console.log('\n🌱 Seeding flashcards to database...')
    const seedResult = await seedFlashcards(validCards)
    
    console.log('\n🎉 Seeding Complete!')
    console.log('📈 Final Statistics:')
    console.log(`   ✅ Created: ${seedResult.created} flashcards`)
    console.log(`   ⏭️  Skipped: ${seedResult.skipped} flashcards`)
    console.log(`   📁 Categories: ${seedResult.categories}`)
    console.log(`   📚 Chapters: ${seedResult.chapters}`)
    
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    console.log('🔌 Database connection closed')
  }
}

main()