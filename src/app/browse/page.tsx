'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MedicalDisclaimerBanner } from '@/components/ui/medical-disclaimer-banner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  BookOpen, 
  Filter,
  ChevronRight,
  Users,
  Clock,
  Target,
  Brain,
  Heart,
  Stethoscope,
  Truck
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Chapter {
  id: number
  title: string
  description: string
  cardCount: number
  category: string
  difficulty: 'Basic' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  icon: any
  color: string
}

// All 45 EMT-B chapters + Bonus content
const chapters: Chapter[] = [
  // Module 1 · Foundations of EMS Practice
  { id: 1, title: "EMS System Fundamentals", description: "Essential EMS systems, professional responsibilities, and communication principles.", cardCount: 15, category: "Foundations of EMS Practice", difficulty: "Basic", estimatedTime: "10 min", icon: Truck, color: "from-blue-500 to-cyan-500" },
  { id: 2, title: "Responder Safety & Resilience", description: "Personal protection, wellness strategies, stress management, and scene safety.", cardCount: 15, category: "Foundations of EMS Practice", difficulty: "Basic", estimatedTime: "10 min", icon: Users, color: "from-green-500 to-emerald-500" },
  { id: 3, title: "EMS Law & Ethical Practice", description: "Scope of practice, consent, confidentiality, and legal considerations.", cardCount: 15, category: "Foundations of EMS Practice", difficulty: "Intermediate", estimatedTime: "12 min", icon: BookOpen, color: "from-purple-500 to-violet-500" },
  { id: 4, title: "Emergency Communication Protocols", description: "Radio communications, verbal reports, and patient care documentation.", cardCount: 15, category: "Foundations of EMS Practice", difficulty: "Basic", estimatedTime: "10 min", icon: Target, color: "from-amber-500 to-orange-500" },

  // Module 2 · Clinical Foundations
  { id: 5, title: "Medical Language for Responders", description: "Medical terminology, anatomy, patient movement, and interdisciplinary teamwork.", cardCount: 15, category: "Clinical Foundations", difficulty: "Basic", estimatedTime: "12 min", icon: BookOpen, color: "from-indigo-500 to-purple-500" },
  { id: 6, title: "Anatomy for Emergency Care", description: "Body structure, function, and organ systems overview.", cardCount: 15, category: "Clinical Foundations", difficulty: "Intermediate", estimatedTime: "15 min", icon: Brain, color: "from-pink-500 to-rose-500" },
  { id: 7, title: "Developmental Considerations in EMS", description: "Physical and psychological development considerations across lifespans.", cardCount: 15, category: "Clinical Foundations", difficulty: "Basic", estimatedTime: "10 min", icon: Heart, color: "from-teal-500 to-cyan-500" },
  { id: 8, title: "Patient Movement & Handling", description: "Safe lifting techniques and patient transfer protocols.", cardCount: 15, category: "Clinical Foundations", difficulty: "Basic", estimatedTime: "10 min", icon: Users, color: "from-emerald-500 to-teal-500" },
  { id: 9, title: "Interprofessional EMS Teams", description: "Team dynamics and interdisciplinary collaboration.", cardCount: 15, category: "Clinical Foundations", difficulty: "Basic", estimatedTime: "8 min", icon: Users, color: "from-orange-500 to-red-500" },

  // Module 3 · Patient Assessment Mastery
  { id: 10, title: "Comprehensive Patient Evaluation", description: "Full-spectrum primary, secondary, and ongoing assessments.", cardCount: 15, category: "Patient Assessment Mastery", difficulty: "Intermediate", estimatedTime: "15 min", icon: Stethoscope, color: "from-slate-500 to-gray-500" },

  // Module 4 · Airway & Ventilatory Management
  { id: 11, title: "Advanced Airway Interventions", description: "Airway interventions, oxygenation strategies, and ventilation support.", cardCount: 15, category: "Airway & Ventilatory Management", difficulty: "Advanced", estimatedTime: "15 min", icon: Brain, color: "from-blue-600 to-indigo-600" },

  // Module 5 · Pharmacology for EMT-B
  { id: 12, title: "Medication Administration Standards", description: "Medication profiles, administration safety, and dosage considerations.", cardCount: 15, category: "Pharmacology for EMT-B", difficulty: "Advanced", estimatedTime: "15 min", icon: Heart, color: "from-red-500 to-pink-500" },

  // Module 6 · Shock & Circulatory Management
  { id: 13, title: "Shock Recognition & Management", description: "Recognising and managing perfusion emergencies.", cardCount: 15, category: "Shock & Circulatory Management", difficulty: "Advanced", estimatedTime: "15 min", icon: Heart, color: "from-rose-500 to-red-500" },
  { id: 14, title: "BLS Life Support Protocols", description: "Life support integration and resuscitation protocols.", cardCount: 15, category: "Shock & Circulatory Management", difficulty: "Basic", estimatedTime: "12 min", icon: Heart, color: "from-red-600 to-orange-600" },

  // Module 7 · Medical Emergency Response
  { id: 15, title: "Medical Crisis Assessment", description: "Assessment and management of general medical emergencies.", cardCount: 15, category: "Medical Emergency Response", difficulty: "Intermediate", estimatedTime: "15 min", icon: Stethoscope, color: "from-cyan-600 to-blue-600" },
  { id: 16, title: "Respiratory Emergency Protocols", description: "Management of respiratory distress and failure.", cardCount: 15, category: "Medical Emergency Response", difficulty: "Intermediate", estimatedTime: "15 min", icon: Brain, color: "from-blue-500 to-cyan-500" },
  { id: 17, title: "Cardiovascular Emergency Management", description: "Management of cardiac conditions and emergencies.", cardCount: 15, category: "Medical Emergency Response", difficulty: "Intermediate", estimatedTime: "18 min", icon: Heart, color: "from-red-500 to-rose-500" },

  // Module 8 · Neurologic & Systemic Emergencies
  { id: 18, title: "Neurological Crisis Intervention", description: "Critical neurology assessment and management.", cardCount: 15, category: "Neurologic & Systemic Emergencies", difficulty: "Advanced", estimatedTime: "16 min", icon: Brain, color: "from-purple-500 to-pink-500" },
  { id: 19, title: "Abdominal Emergency Protocols", description: "Assessment and care for abdominal emergencies.", cardCount: 15, category: "Neurologic & Systemic Emergencies", difficulty: "Intermediate", estimatedTime: "14 min", icon: Target, color: "from-orange-500 to-amber-500" },
  { id: 20, title: "Metabolic & Hematologic Emergencies", description: "Diabetic, metabolic, and blood-related emergencies.", cardCount: 15, category: "Neurologic & Systemic Emergencies", difficulty: "Advanced", estimatedTime: "15 min", icon: Heart, color: "from-red-700 to-rose-700" },

  // Module 9 · Specialized Emergency Care
  { id: 21, title: "Allergic & Anaphylactic Response", description: "Recognition and treatment of allergic reactions.", cardCount: 15, category: "Specialized Emergency Care", difficulty: "Advanced", estimatedTime: "14 min", icon: Target, color: "from-yellow-500 to-orange-500" },
  { id: 22, title: "Toxicological Emergencies", description: "Management of poisoning and overdose.", cardCount: 15, category: "Specialized Emergency Care", difficulty: "Advanced", estimatedTime: "15 min", icon: Target, color: "from-orange-700 to-red-700" },
  { id: 23, title: "Behavioral Crisis Protocols", description: "Management of behavioral and psychiatric emergencies.", cardCount: 15, category: "Specialized Emergency Care", difficulty: "Intermediate", estimatedTime: "14 min", icon: Brain, color: "from-indigo-500 to-purple-500" },
  { id: 24, title: "Gynecological Emergency Care", description: "Assessment and management of gynecological emergencies.", cardCount: 15, category: "Specialized Emergency Care", difficulty: "Intermediate", estimatedTime: "12 min", icon: Heart, color: "from-pink-500 to-purple-500" },

  // Module 10 · Trauma Response Principles
  { id: 25, title: "Trauma System Fundamentals", description: "Trauma systems and mechanism of injury analysis.", cardCount: 15, category: "Trauma Response Principles", difficulty: "Basic", estimatedTime: "12 min", icon: Truck, color: "from-slate-600 to-gray-600" },
  { id: 26, title: "Hemorrhage Control Techniques", description: "Management of external and internal bleeding.", cardCount: 15, category: "Trauma Response Principles", difficulty: "Advanced", estimatedTime: "14 min", icon: Target, color: "from-red-600 to-rose-600" },
  { id: 27, title: "Soft Tissue Trauma Management", description: "Care for soft tissue injuries and burns.", cardCount: 15, category: "Trauma Response Principles", difficulty: "Intermediate", estimatedTime: "14 min", icon: Target, color: "from-orange-500 to-red-500" },

  // Module 11 · Traumatic Injury Management
  { id: 28, title: "Craniofacial Trauma Response", description: "Management of head and face injuries.", cardCount: 15, category: "Traumatic Injury Management", difficulty: "Advanced", estimatedTime: "16 min", icon: Brain, color: "from-red-600 to-rose-600" },
  { id: 29, title: "Spinal Trauma Protocols", description: "Spinal immobilization and injury management.", cardCount: 15, category: "Traumatic Injury Management", difficulty: "Advanced", estimatedTime: "18 min", icon: Brain, color: "from-blue-600 to-indigo-600" },
  { id: 30, title: "Thoracic Injury Interventions", description: "Management of chest trauma.", cardCount: 15, category: "Traumatic Injury Management", difficulty: "Advanced", estimatedTime: "18 min", icon: Target, color: "from-blue-600 to-indigo-600" },

  // Module 12 · Environmental & Musculoskeletal Emergencies
  { id: 31, title: "Abdominal & GU Trauma Essentials", description: "Management of abdominal and genitourinary trauma.", cardCount: 15, category: "Environmental & Musculoskeletal Emergencies", difficulty: "Advanced", estimatedTime: "16 min", icon: Target, color: "from-purple-600 to-violet-600" },
  { id: 32, title: "Orthopedic Injury Management", description: "Care for fractures, dislocations, and musculoskeletal injuries.", cardCount: 15, category: "Environmental & Musculoskeletal Emergencies", difficulty: "Intermediate", estimatedTime: "14 min", icon: Target, color: "from-amber-600 to-orange-600" },
  { id: 33, title: "Environmental Exposure Protocols", description: "Management of heat, cold, and other environmental emergencies.", cardCount: 15, category: "Environmental & Musculoskeletal Emergencies", difficulty: "Intermediate", estimatedTime: "12 min", icon: Target, color: "from-green-600 to-teal-600" },

  // Module 13 · Special Patient Populations
  { id: 34, title: "Obstetric & Neonatal Emergencies", description: "Emergency childbirth and newborn care.", cardCount: 15, category: "Special Patient Populations", difficulty: "Advanced", estimatedTime: "18 min", icon: Heart, color: "from-rose-500 to-pink-500" },
  { id: 35, title: "Pediatric Emergency Response", description: "Assessment and management of pediatric emergencies.", cardCount: 15, category: "Special Patient Populations", difficulty: "Advanced", estimatedTime: "16 min", icon: Heart, color: "from-green-400 to-emerald-400" },
  { id: 36, title: "Geriatric Emergency Care", description: "Special considerations for elderly patients.", cardCount: 15, category: "Special Patient Populations", difficulty: "Intermediate", estimatedTime: "14 min", icon: Users, color: "from-slate-400 to-gray-400" },
  { id: 37, title: "Patients with Unique Needs", description: "Care for patients with special healthcare needs.", cardCount: 15, category: "Special Patient Populations", difficulty: "Intermediate", estimatedTime: "12 min", icon: Users, color: "from-blue-400 to-cyan-400" },

  // Module 14 · EMS Operations & Disaster Response
  { id: 38, title: "Medical Transport Operations", description: "Ambulance operations and air medical transport.", cardCount: 15, category: "EMS Operations & Disaster Response", difficulty: "Intermediate", estimatedTime: "14 min", icon: Truck, color: "from-cyan-700 to-blue-700" },
  { id: 39, title: "Technical Rescue Protocols", description: "Vehicle extrication and special rescue situations.", cardCount: 15, category: "EMS Operations & Disaster Response", difficulty: "Advanced", estimatedTime: "16 min", icon: Truck, color: "from-red-500 to-orange-500" },
  { id: 40, title: "Incident Command Systems", description: "ICS structure and major incident management.", cardCount: 15, category: "EMS Operations & Disaster Response", difficulty: "Intermediate", estimatedTime: "14 min", icon: Target, color: "from-indigo-600 to-purple-600" },
  { id: 41, title: "Mass Casualty Incident Response", description: "Triage and management of mass casualty incidents.", cardCount: 15, category: "EMS Operations & Disaster Response", difficulty: "Advanced", estimatedTime: "18 min", icon: Truck, color: "from-orange-600 to-red-600" },

  // Extended Track · Advanced Clinical Deep Dives
  { id: 42, title: "Advanced Cardiovascular Anatomy", description: "In-depth study of the cardiovascular system.", cardCount: 15, category: "Advanced Clinical Deep Dives", difficulty: "Advanced", estimatedTime: "20 min", icon: Heart, color: "from-red-700 to-rose-700" },
  { id: 43, title: "Advanced Respiratory Physiology", description: "In-depth study of respiratory physiology.", cardCount: 15, category: "Advanced Clinical Deep Dives", difficulty: "Advanced", estimatedTime: "20 min", icon: Brain, color: "from-blue-700 to-cyan-700" },
  { id: 44, title: "Nervous System in Depth", description: "Detailed anatomy and physiology of the nervous system.", cardCount: 15, category: "Advanced Clinical Deep Dives", difficulty: "Advanced", estimatedTime: "20 min", icon: Brain, color: "from-purple-700 to-violet-700" },
  { id: 45, title: "Endocrine & Metabolic Systems", description: "Advanced concepts in endocrine and metabolic systems.", cardCount: 15, category: "Advanced Clinical Deep Dives", difficulty: "Advanced", estimatedTime: "20 min", icon: Heart, color: "from-yellow-600 to-amber-600" },

  // Extended Track · Body Systems Primer (Bonus)
  { id: 46, title: "Cellular Structure & Function", description: "Basics of cell biology.", cardCount: 10, category: "Body Systems Primer", difficulty: "Basic", estimatedTime: "10 min", icon: Brain, color: "from-green-400 to-teal-400" },
  { id: 47, title: "Tissues & Organs", description: "Overview of body tissues and organs.", cardCount: 10, category: "Body Systems Primer", difficulty: "Basic", estimatedTime: "10 min", icon: Brain, color: "from-green-500 to-teal-500" },
  { id: 48, title: "Skeletal System", description: "Anatomy of the skeletal system.", cardCount: 10, category: "Body Systems Primer", difficulty: "Basic", estimatedTime: "10 min", icon: Target, color: "from-slate-400 to-gray-400" },
  { id: 49, title: "Muscular System", description: "Anatomy of the muscular system.", cardCount: 10, category: "Body Systems Primer", difficulty: "Basic", estimatedTime: "10 min", icon: Target, color: "from-red-400 to-rose-400" },
  { id: 50, title: "Cardiovascular System", description: "Basics of the cardiovascular system.", cardCount: 10, category: "Body Systems Primer", difficulty: "Basic", estimatedTime: "10 min", icon: Heart, color: "from-red-500 to-rose-500" },
  { id: 51, title: "Respiratory System", description: "Basics of the respiratory system.", cardCount: 10, category: "Body Systems Primer", difficulty: "Basic", estimatedTime: "10 min", icon: Brain, color: "from-blue-400 to-cyan-400" },
  { id: 52, title: "Nervous System", description: "Basics of the nervous system.", cardCount: 10, category: "Body Systems Primer", difficulty: "Basic", estimatedTime: "10 min", icon: Brain, color: "from-purple-400 to-violet-400" },
  { id: 53, title: "Endocrine System", description: "Basics of the endocrine system.", cardCount: 10, category: "Body Systems Primer", difficulty: "Basic", estimatedTime: "10 min", icon: Heart, color: "from-yellow-400 to-amber-400" },
  { id: 54, title: "Digestive System", description: "Basics of the digestive system.", cardCount: 10, category: "Body Systems Primer", difficulty: "Basic", estimatedTime: "10 min", icon: Target, color: "from-orange-400 to-amber-400" },
  { id: 55, title: "Urinary System", description: "Basics of the urinary system.", cardCount: 10, category: "Body Systems Primer", difficulty: "Basic", estimatedTime: "10 min", icon: Target, color: "from-blue-300 to-cyan-300" },
  { id: 56, title: "ALS Integration & Team Dynamics", description: "Working with Advanced Life Support providers.", cardCount: 10, category: "Body Systems Primer", difficulty: "Intermediate", estimatedTime: "12 min", icon: Users, color: "from-indigo-400 to-purple-400" }
]

const categories = [
  "All", 
  "Foundations of EMS Practice", 
  "Clinical Foundations", 
  "Patient Assessment Mastery", 
  "Airway & Ventilatory Management", 
  "Pharmacology for EMT-B", 
  "Shock & Circulatory Management", 
  "Medical Emergency Response", 
  "Neurologic & Systemic Emergencies", 
  "Specialized Emergency Care", 
  "Trauma Response Principles", 
  "Traumatic Injury Management", 
  "Environmental & Musculoskeletal Emergencies", 
  "Special Patient Populations", 
  "EMS Operations & Disaster Response", 
  "Advanced Clinical Deep Dives", 
  "Body Systems Primer"
]
const difficulties = ["All", "Basic", "Intermediate", "Advanced"]

export default function BrowsePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [filteredChapters, setFilteredChapters] = useState(chapters)

  useEffect(() => {
    let filtered = chapters

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(chapter =>
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(chapter => chapter.category === selectedCategory)
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(chapter => chapter.difficulty === selectedDifficulty)
    }

    setFilteredChapters(filtered)
  }, [searchTerm, selectedCategory, selectedDifficulty])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic': return 'bg-green-400/10 text-green-300 border-green-400/30'
      case 'Intermediate': return 'bg-amber-400/10 text-amber-300 border-amber-400/30'
      case 'Advanced': return 'bg-red-400/10 text-red-300 border-red-400/30'
      default: return 'bg-gray-400/10 text-gray-300 border-gray-400/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Medical Disclaimer */}
        <MedicalDisclaimerBanner variant="compact" className="mb-8 rounded-xl" />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-wider text-muted-foreground mb-4">
            <BookOpen className="h-3 w-3" />
            <span className="text-primary">Browse Content</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4">
            EMT-B Study Content
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive collection of EMT-B study materials organized by chapters and topics. 
            Find the content that matches your learning needs.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search chapters, topics, or descriptions..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-slate-800 text-white">
                      {category === 'All' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedDifficulty}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDifficulty(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty} className="bg-slate-800 text-white">
                      {difficulty === 'All' ? 'All Levels' : difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredChapters.length} of {chapters.length} chapters
            </div>
          </CardContent>
        </Card>

        {/* Chapter Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredChapters.map((chapter) => {
            const IconComponent = chapter.icon
            
            return (
              <Card 
                key={chapter.id} 
                className="glass-card group hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/study?chapterId=${chapter.id}`)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "p-3 rounded-xl bg-gradient-to-r",
                      chapter.color.replace('from-', 'from-').replace(' to-', '/20 to-') + '/20'
                    )}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge className={getDifficultyColor(chapter.difficulty)}>
                      {chapter.difficulty}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    Chapter {chapter.id}: {chapter.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {chapter.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{chapter.cardCount} cards</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{chapter.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-white/10 border-white/20 text-xs">
                      {chapter.category}
                    </Badge>
                    
                    <Button 
                      size="sm" 
                      className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/30"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/study?chapterId=${chapter.id}`)
                      }}
                    >
                      Study
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No Results */}
        {filteredChapters.length === 0 && (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <div className="p-4 rounded-2xl bg-muted/20 mx-auto mb-6 w-fit">
                <Search className="h-12 w-12 text-muted-foreground mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No chapters found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find the content you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  setSelectedDifficulty('All')
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
