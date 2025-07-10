import { Metadata } from 'next'
import StudentPredictionForm from '@/components/student-prediction-form'

export const metadata: Metadata = {
  title: 'Student Performance Prediction | Academic Success Predictor',
  description: 'Predict student academic performance using our advanced machine learning algorithm. Get insights into study habits, family background, and academic outcomes.',
  keywords: ['student performance', 'academic prediction', 'education analytics', 'machine learning', 'academic success'],
  openGraph: {
    title: 'Student Performance Prediction',
    description: 'Predict student academic performance using advanced analytics',
    type: 'website',
  },
}

export default function PredictionFormPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Student Performance Prediction
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover insights into academic performance using our advanced machine learning model. 
            Fill out the form below to get personalized predictions and recommendations.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto">
          <StudentPredictionForm />
        </div>

        {/* Additional Information */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-3">
              How It Works
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Our prediction model analyzes multiple factors including study habits, family background, 
              and academic history to provide accurate performance predictions. The results help identify 
              areas for improvement and optimization strategies for academic success.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}