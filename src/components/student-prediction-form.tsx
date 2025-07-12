"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Loader2, CheckCircle, AlertCircle, BarChart3, Lightbulb, TrendingUp, Target } from 'lucide-react'

interface FormData {
  studentId: string
  age: number
  gender: string
  studyHours: number
  socialMediaHours: number
  netflixHours: number
  partTimeJob: string
  attendance: number
  sleepHours: number
  dietQuality: string
  exerciseFrequency: number
  parentalEducation: string
  internetQuality: string
  mentalHealthRating: number
  extracurricular: string
}

interface PredictionResult {
  score: number
}

const initialFormData: FormData = {
  studentId: 'S100',
  age: 20,
  gender: 'Male',
  studyHours: 6,
  socialMediaHours: 3,
  netflixHours: 2,
  partTimeJob: 'No',
  attendance: 85,
  sleepHours: 8,
  dietQuality: 'Poor',
  exerciseFrequency: 3,
  parentalEducation: 'High School',
  internetQuality: 'Poor',
  mentalHealthRating: 7,
  extracurricular: 'Yes'
}

export default function StudentPredictionForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }


  
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    
    if (!formData.studentId.trim()) {
      errors.studentId = 'Student ID is required'
    }
    if (!formData.gender) {
      errors.gender = 'Gender is required'
    }
    if (!formData.partTimeJob) {
      errors.partTimeJob = 'Part-time job status is required'
    }
    if (!formData.dietQuality) {
      errors.dietQuality = 'Diet quality is required'
    }
    if (!formData.parentalEducation) {
      errors.parentalEducation = 'Parental education level is required'
    }
    if (!formData.internetQuality) {
      errors.internetQuality = 'Internet quality is required'
    }
    if (!formData.extracurricular) {
      errors.extracurricular = 'Extracurricular participation is required'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validateForm()) return

  setIsLoading(true)
  setError(null)
  setResult(null)

  try {
    const response = await fetch('https://student-marks-prediction-backend.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })




    if (!response.ok) {
      throw new Error('API error')
    }

    const data = await response.json()

    setResult({
      score: data.predicted_score
    })

  } catch (err) {
    console.error(err)
    setError('Unable to process prediction. Please check your inputs and try again.')
  } finally {
    setIsLoading(false)
  }console.log('Form data to be sent:', formData)
  
}

  const handleReset = () => {
    setFormData(initialFormData)
    setResult(null)
    setError(null)
    setValidationErrors({})
  }
  




  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Student Performance Predictor</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover insights into academic performance using our advanced machine learning model. Fill out the form below to get personalized predictions and recommendations.
            </p>
          </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Personal Information</CardTitle>
              <CardDescription className="text-muted-foreground">
                Basic demographic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-sm font-medium text-foreground">
                    Student ID
                  </Label>
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="Enter your student ID"
                    value={formData.studentId}
                    onChange={(e) => updateFormData('studentId', e.target.value)}
                    className={`bg-background border-input focus:ring-primary focus:border-primary ${
                      validationErrors.studentId ? 'border-destructive' : ''
                    }`}
                  />
                  {validationErrors.studentId && (
                    <p className="text-sm text-destructive">{validationErrors.studentId}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium text-foreground">
                    Gender
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                    <SelectTrigger className={`bg-background border-input focus:ring-primary focus:border-primary ${
                      validationErrors.gender ? 'border-destructive' : ''
                    }`}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.gender && (
                    <p className="text-sm text-destructive">{validationErrors.gender}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium text-foreground">
                  Age: {formData.age} years
                </Label>
                <Slider
                  id="age"
                  min={16}
                  max={25}
                  step={1}
                  value={[formData.age]}
                  onValueChange={(value) => updateFormData('age', value[0])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>16</span>
                  <span>25</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study & Entertainment */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Study & Entertainment</CardTitle>
              <CardDescription className="text-muted-foreground">
                Time allocation for academic and leisure activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studyHours" className="text-sm font-medium text-foreground">
                    Study hours per day: {formData.studyHours} hours
                  </Label>
                  <Slider
                    id="studyHours"
                    min={0}
                    max={12}
                    step={1}
                    value={[formData.studyHours]}
                    onValueChange={(value) => updateFormData('studyHours', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>12</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialMediaHours" className="text-sm font-medium text-foreground">
                    Social media hours per day: {formData.socialMediaHours} hours
                  </Label>
                  <Slider
                    id="socialMediaHours"
                    min={0}
                    max={12}
                    step={1}
                    value={[formData.socialMediaHours]}
                    onValueChange={(value) => updateFormData('socialMediaHours', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>12</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="netflixHours" className="text-sm font-medium text-foreground">
                    Netflix hours per day: {formData.netflixHours} hours
                  </Label>
                  <Slider
                    id="netflixHours"
                    min={0}
                    max={12}
                    step={1}
                    value={[formData.netflixHours]}
                    onValueChange={(value) => updateFormData('netflixHours', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>12</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partTimeJob" className="text-sm font-medium text-foreground">
                    Part-time job
                  </Label>
                  <Select value={formData.partTimeJob} onValueChange={(value) => updateFormData('partTimeJob', value)}>
                    <SelectTrigger className={`bg-background border-input focus:ring-primary focus:border-primary ${
                      validationErrors.partTimeJob ? 'border-destructive' : ''
                    }`}>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.partTimeJob && (
                    <p className="text-sm text-destructive">{validationErrors.partTimeJob}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health & Lifestyle */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Health & Lifestyle</CardTitle>
              <CardDescription className="text-muted-foreground">
                Physical and mental well-being indicators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="attendance" className="text-sm font-medium text-foreground">
                    Attendance percentage: {formData.attendance}%
                  </Label>
                  <Slider
                    id="attendance"
                    min={0}
                    max={100}
                    step={1}
                    value={[formData.attendance]}
                    onValueChange={(value) => updateFormData('attendance', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleepHours" className="text-sm font-medium text-foreground">
                    Sleep hours per day: {formData.sleepHours} hours
                  </Label>
                  <Slider
                    id="sleepHours"
                    min={4}
                    max={12}
                    step={1}
                    value={[formData.sleepHours]}
                    onValueChange={(value) => updateFormData('sleepHours', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>4</span>
                    <span>12</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dietQuality" className="text-sm font-medium text-foreground">
                    Diet quality
                  </Label>
                  <Select value={formData.dietQuality} onValueChange={(value) => updateFormData('dietQuality', value)}>
                    <SelectTrigger className={`bg-background border-input focus:ring-primary focus:border-primary ${
                      validationErrors.dietQuality ? 'border-destructive' : ''
                    }`}>
                      <SelectValue placeholder="Select diet quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.dietQuality && (
                    <p className="text-sm text-destructive">{validationErrors.dietQuality}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exerciseFrequency" className="text-sm font-medium text-foreground">
                    Exercise frequency: {formData.exerciseFrequency} days/week
                  </Label>
                  <Slider
                    id="exerciseFrequency"
                    min={0}
                    max={7}
                    step={1}
                    value={[formData.exerciseFrequency]}
                    onValueChange={(value) => updateFormData('exerciseFrequency', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>7</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Environment */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Academic Environment</CardTitle>
              <CardDescription className="text-muted-foreground">
                Environmental and social factors affecting academic performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="parentalEducation" className="text-sm font-medium text-foreground">
                    Parental education level
                  </Label>
                  <Select value={formData.parentalEducation} onValueChange={(value) => updateFormData('parentalEducation', value)}>
                    <SelectTrigger className={`bg-background border-input focus:ring-primary focus:border-primary ${
                      validationErrors.parentalEducation ? 'border-destructive' : ''
                    }`}>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School" >High School</SelectItem>
                      <SelectItem value="Bachelor">Bachelor's</SelectItem>
                      <SelectItem value="Master">Master's</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.parentalEducation && (
                    <p className="text-sm text-destructive">{validationErrors.parentalEducation}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="internetQuality" className="text-sm font-medium text-foreground">
                    Internet quality
                  </Label>
                  <Select value={formData.internetQuality} onValueChange={(value) => updateFormData('internetQuality', value)}>
                    <SelectTrigger className={`bg-background border-input focus:ring-primary focus:border-primary ${
                      validationErrors.internetQuality ? 'border-destructive' : ''
                    }`}>
                      <SelectValue placeholder="Select internet quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Average">Average</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.internetQuality && (
                    <p className="text-sm text-destructive">{validationErrors.internetQuality}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mentalHealthRating" className="text-sm font-medium text-foreground">
                    Mental health rating: {formData.mentalHealthRating}/10
                  </Label>
                  <Slider
                    id="mentalHealthRating"
                    min={1}
                    max={10}
                    step={1}
                    value={[formData.mentalHealthRating]}
                    onValueChange={(value) => updateFormData('mentalHealthRating', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Poor (1)</span>
                    <span>Excellent (10)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="extracurricular" className="text-sm font-medium text-foreground">
                    Extracurricular participation
                  </Label>
                  <Select value={formData.extracurricular} onValueChange={(value) => updateFormData('extracurricular', value)}>
                    <SelectTrigger className={`bg-background border-input focus:ring-primary focus:border-primary ${
                      validationErrors.extracurricular ? 'border-destructive' : ''
                    }`}>
                      <SelectValue placeholder="Select participation level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.extracurricular && (
                    <p className="text-sm text-destructive">{validationErrors.extracurricular}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="px-8 py-2 border-border text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="px-8 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing your data...
                </>
              ) : (
                'Get Prediction'
              )}
            </Button>
          </div>
        </form>

         {/* Enhanced Results Section */}
        {(result || error) && (
          <div className="mt-8">
            {result && (
              <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-full">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-800">Prediction Complete</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        {result.score}%
                      </div>
                      <p className="text-xl text-emerald-700 font-medium mt-2">
                        Predicted Exam Score
                      </p>
                    </div>
                    
                    
                    

                    <p className="text-sm text-emerald-600/80 mt-4">
                      Click above to receive personalized recommendations based on your prediction
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {error && (
              <Card className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-semibold text-red-800">Prediction Failed</h3>
                  </div>
                  <p className="text-red-700 mb-4">{error}</p>
                  <Button
                    onClick={() => setError(null)}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800"
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}