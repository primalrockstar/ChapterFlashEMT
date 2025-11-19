'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flashcard, FlashcardData } from '@/components/flashcard/Flashcard'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  RotateCcw, 
  Target,
  Clock,
  Brain,
  TrendingUp,
  Home,
  Settings,
  X
} from 'lucide-react'
import { 
  StudySessionManager, 
  StudySessionConfig, 
  StudyResponse,
  SessionStats,
  StudyMode 
} from '@/lib/study-session'
import { cn } from '@/lib/utils'

interface StudyInterfaceProps {
  cards: FlashcardData[]
  config: StudySessionConfig
  onSessionEnd: (stats: SessionStats | null) => void
  onExit: () => void
}

export function StudyInterface({ cards, config, onSessionEnd, onExit }: StudyInterfaceProps) {
  const [sessionManager] = useState(() => new StudySessionManager())
  const [currentCard, setCurrentCard] = useState<FlashcardData | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showDifficultyRating, setShowDifficultyRating] = useState(false)
  const [sessionStartTime, setSessionStartTime] = useState(0)
  const [cardStartTime, setCardStartTime] = useState(0)
  const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0 })

  // Initialize session
  useEffect(() => {
    const session = sessionManager.createSession(config, cards)
    const firstCard = sessionManager.getCurrentCard()
    setCurrentCard(firstCard)
    setSessionStartTime(Date.now())
    setCardStartTime(Date.now())
    updateProgress()
  }, [cards, config, sessionManager])

  const updateProgress = useCallback(() => {
    const newProgress = sessionManager.getProgress()
    setProgress(newProgress)
  }, [sessionManager])

  const handleCardFlip = () => {
    if (!isPaused) {
      setIsFlipped(!isFlipped)
      if (!isFlipped) {
        // Card was flipped to show answer - show difficulty rating
        setTimeout(() => setShowDifficultyRating(true), 300)
      }
    }
  }

  const handleDifficultyRating = (difficulty: StudyResponse['difficulty'], confidence: number) => {
    if (!currentCard) return

    const timeSpent = Date.now() - cardStartTime

    const response: Omit<StudyResponse, 'cardId' | 'timestamp'> = {
      timeSpent,
      difficulty,
      confidence,
      isCorrect: confidence >= 3 // Consider 3+ as correct
    }

    sessionManager.recordResponse(response)
    
    // Move to next card
    const nextCard = sessionManager.nextCard()
    if (nextCard) {
      setCurrentCard(nextCard)
      setIsFlipped(false)
      setShowDifficultyRating(false)
      setCardStartTime(Date.now())
      updateProgress()
    } else {
      // Session complete
      const stats = sessionManager.getSessionStats()
      onSessionEnd(stats)
    }
  }

  const handlePrevious = () => {
    const prevCard = sessionManager.previousCard()
    if (prevCard) {
      setCurrentCard(prevCard)
      setIsFlipped(false)
      setShowDifficultyRating(false)
      setCardStartTime(Date.now())
      updateProgress()
    }
  }

  const handleSkip = () => {
    if (!currentCard) return
    
    // Record as skipped (low confidence)
    handleDifficultyRating('again', 1)
  }

  const togglePause = () => {
    if (isPaused) {
      sessionManager.resumeSession()
      setCardStartTime(Date.now())
    } else {
      sessionManager.pauseSession()
    }
    setIsPaused(!isPaused)
  }

  const handleExit = () => {
    const stats = sessionManager.endSession()
    onExit()
  }

  const difficultyButtons = [
    { key: 'again', label: 'Again', confidence: 1, color: 'bg-red-500/20 border-red-500/50 text-red-200 hover:bg-red-500/30' },
    { key: 'hard', label: 'Hard', confidence: 2, color: 'bg-orange-500/20 border-orange-500/50 text-orange-200 hover:bg-orange-500/30' },
    { key: 'good', label: 'Good', confidence: 3, color: 'bg-blue-500/20 border-blue-500/50 text-blue-200 hover:bg-blue-500/30' },
    { key: 'easy', label: 'Easy', confidence: 5, color: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 hover:bg-emerald-500/30' }
  ]

  const getModeIcon = (mode: StudyMode) => {
    switch (mode) {
      case 'quick-drill': return <Brain className="h-4 w-4" />
      case 'deep-session': return <Target className="h-4 w-4" />
      case 'exam-mimic': return <TrendingUp className="h-4 w-4" />
      case 'random-250': return <Brain className="h-4 w-4" />
      case 'custom-drill': return <Settings className="h-4 w-4" />
    }
  }

  const getModeColor = (mode: StudyMode) => {
    switch (mode) {
      case 'quick-drill': return 'text-cyan-400'
      case 'deep-session': return 'text-blue-400'
      case 'exam-mimic': return 'text-purple-400'
      case 'random-250': return 'text-red-400'
      case 'custom-drill': return 'text-emerald-400'
    }
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="glass-card max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No cards available</h2>
            <p className="text-muted-foreground mb-6">Unable to start study session with current configuration.</p>
            <Button onClick={onExit}>Return Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mode & Progress */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={cn("p-2 rounded-lg bg-white/10", getModeColor(config.mode))}>
                  {getModeIcon(config.mode)}
                </div>
                <div>
                  <h1 className="font-semibold text-lg">{config.mode.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
                  <p className="text-xs text-muted-foreground">
                    Card {progress.current} of {progress.total}
                  </p>
                </div>
              </div>
              
              <div className="w-48">
                <Progress value={progress.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  {progress.percentage}% complete
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={handlePrevious} disabled={progress.current === 1}>
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={togglePause}>
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>

              <Button variant="ghost" size="sm" onClick={handleSkip}>
                <SkipForward className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="sm" onClick={handleExit}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Study Area */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!isPaused ? (
            <motion.div
              key="study-active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Flashcard */}
              <Flashcard
                flashcard={currentCard}
                isFlipped={isFlipped}
                onFlip={handleCardFlip}
                showTimer={true}
                startTime={cardStartTime}
                className="mb-8"
              />

              {/* Difficulty Rating */}
              <AnimatePresence>
                {showDifficultyRating && isFlipped && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", bounce: 0.3 }}
                  >
                    <Card className="glass-card border-primary/30">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-center mb-4">How did you do?</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {difficultyButtons.map((button) => (
                            <Button
                              key={button.key}
                              variant="outline"
                              className={cn(
                                "h-16 flex flex-col gap-1 border-2 transition-all duration-200",
                                button.color
                              )}
                              onClick={() => handleDifficultyRating(button.key as StudyResponse['difficulty'], button.confidence)}
                            >
                              <span className="font-semibold">{button.label}</span>
                              <span className="text-xs opacity-80">
                                {button.key === 'again' && 'Review soon'}
                                {button.key === 'hard' && 'Review later'}
                                {button.key === 'good' && 'Standard interval'}
                                {button.key === 'easy' && 'Long interval'}
                              </span>
                            </Button>
                          ))}
                        </div>
                        <p className="text-xs text-center text-muted-foreground mt-4">
                          Rate your confidence to improve spaced repetition scheduling
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Card Info */}
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="bg-white/10 border-white/20">
                        {currentCard.type}
                      </Badge>
                      <Badge variant="outline" className="bg-white/5 border-white/20">
                        {currentCard.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Session: {Math.floor((Date.now() - sessionStartTime) / 60000)}:{((Date.now() - sessionStartTime) % 60000 / 1000).toFixed(0).padStart(2, '0')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="study-paused"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-20"
            >
              <Card className="glass-card max-w-md mx-auto">
                <CardContent className="p-8">
                  <Pause className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Study Session Paused</h2>
                  <p className="text-muted-foreground mb-6">Take your time. Click resume when ready to continue.</p>
                  <div className="space-y-3">
                    <Button onClick={togglePause} className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Resume Study Session
                    </Button>
                    <Button variant="outline" onClick={handleExit} className="w-full">
                      <Home className="h-4 w-4 mr-2" />
                      End Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}