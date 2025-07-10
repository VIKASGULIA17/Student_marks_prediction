"use client"

import { LandingOverlay } from '@/components/landing-overlay'
import StudentPredictionForm from '@/components/student-prediction-form'

export default function Home() {
  return (
    <div className="relative">
      {/* Landing Overlay */}
      <LandingOverlay />
      
      {/* Main Content - Hidden initially, revealed after overlay interaction */}
      <div className="min-h-screen">
        <StudentPredictionForm />
      </div>
    </div>
  )
}