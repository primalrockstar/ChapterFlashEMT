'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MedicalDisclaimerBanner } from '@/components/ui/medical-disclaimer-banner'
import { BarChart3, TrendingUp, Target, Calendar, BookOpen, Clock } from 'lucide-react'

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Medical Disclaimer */}
        <MedicalDisclaimerBanner variant="compact" className="mb-8 rounded-xl" />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-wider text-muted-foreground mb-4">
            <BarChart3 className="h-3 w-3" />
            <span className="text-primary">Progress Analytics</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4">
            Study Progress
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track your learning journey with detailed analytics and insights into your EMT-B study progress.
          </p>
        </div>

        {/* Coming Soon */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
              Progress Analytics Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-8">
              We're building comprehensive analytics to help you track your study progress, 
              identify weak areas, and optimize your learning path.
            </p>
            
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <Target className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Performance Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your accuracy and improvement over time
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Topic Mastery</h3>
                <p className="text-sm text-muted-foreground">
                  See which EMT topics you've mastered and which need work
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <Calendar className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Study Schedule</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations for your study plan
                </p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Available in mobile apps launching 2026
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}