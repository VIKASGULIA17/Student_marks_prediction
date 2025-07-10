"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BookOpen, 
  Heart, 
  Home, 
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Star,
  Clock,
  Brain,
  Zap,
  Trophy,
  Activity,
  Coffee,
  Moon,
  Dumbbell,
  Wifi,
  Music,
  Users,
  GraduationCap
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface StudentData {
  studyHours: number;
  socialMediaTime: number;
  physicalActivity: number;
  sleepHours: number;
  previousGrade: number;
  tutoring: boolean;
  extracurricular: boolean;
  parentSupport: boolean;
  internetAccess: boolean;
  healthCondition: boolean;
  schoolType: 'public' | 'private';
  prediction?: number;
}

interface FeedbackCategory {
  title: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  icon: React.ReactNode;
  color: string;
  tips: string[];
  strengths: string[];
}

export default function FeedbackPage() {
  const router = useRouter();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [feedback, setFeedback] = useState<FeedbackCategory[]>([]);

 useEffect(() => {
  const storedData = localStorage.getItem('studentPredictionData');
  const storedPrediction = localStorage.getItem('predictionResult');

  if (storedData) {
    const data = JSON.parse(storedData);
    if (storedPrediction) {
      data.prediction = JSON.parse(storedPrediction);
    }
    setStudentData(data);

    // ✅ NEW: Call backend for feedback instead
    fetch('http://localhost:8000/generate-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log("Feedback from backend:", res);
        setFeedback(res.feedback);  // Assuming your FastAPI returns: { feedback: [...] }
      })
      .catch(err => {
        console.error("Error fetching feedback:", err);
      });
  }
}, []);


 

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'needs-improvement': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'good': return <Star className="w-4 h-4" />;
      case 'needs-improvement': return <AlertTriangle className="w-4 h-4" />;
      case 'poor': return <TrendingDown className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const overallScore = Array.isArray(feedback) && feedback.length > 0
  ? Math.round(feedback.reduce((sum, cat) => sum + cat.score, 0) / feedback.length)
  : 0;


  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center py-12">
            <CardContent>
              <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Data Available</h2>
              <p className="text-gray-600 mb-6">
                Please complete the prediction form first to receive personalized feedback.
              </p>
              <Button onClick={() => router.push('/')} className="bg-emerald-600 hover:bg-emerald-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go to Prediction Form
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/')}
            className="mb-4 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Prediction
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Personalized Feedback
            </h1>
            <p className="text-lg text-gray-600">
              Insights and recommendations to boost your academic performance
            </p>
          </div>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Overall Performance Score</h2>
                <p className="text-emerald-100">
                  {studentData.prediction 
                    ? `Predicted Grade: ${studentData.prediction.toFixed(1)}%` 
                    : "Based on your current habits and environment"
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{overallScore}</div>
                <div className="text-emerald-200 text-sm">out of 100</div>
                <Trophy className="w-8 h-8 mx-auto mt-2 text-emerald-200" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-rows-2 gap-6 mb-8">
  {Array.isArray(feedback) && feedback.length > 0 ? (
    feedback.map((category, index) => (
      <Card key={index} className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${category.color}`} />
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{category.title}</h3>
            </div>
            <Badge className={getStatusColor(category.status)}>
              {getStatusIcon(category.status)}
              <span className="ml-1 capitalize">{category.status.replace('-', ' ')}</span>
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Score</span>
              <span className="font-bold text-gray-900">{category.score}/100</span>
            </div>
            <Progress value={category.score} className="h-2" />
          </div>
        </CardContent>
      </Card>
    ))
  ) : (
    <p className="text-gray-600">No feedback available.</p>
  )}
</div>


        {/* Detailed Feedback */}
        <Tabs defaultValue="study-habits" className="space-y-6">
  <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="study-habits" className="flex items-center space-x-2">
      <BookOpen className="w-4 h-4" />
      <span>Study</span>
    </TabsTrigger>
    <TabsTrigger value="health" className="flex items-center space-x-2">
      <Heart className="w-4 h-4" />
      <span>Health</span>
    </TabsTrigger>
    <TabsTrigger value="environment" className="flex items-center space-x-2">
      <Home className="w-4 h-4" />
      <span>Environment</span>
    </TabsTrigger>
    <TabsTrigger value="digital" className="flex items-center space-x-2">
      <Wifi className="w-4 h-4" />
      <span>Digital</span>
    </TabsTrigger>
  </TabsList>

  {Array.isArray(feedback) && feedback.length >= 4 ? (
    feedback.map((category, index) => (
      <TabsContent
        key={index}
        value={["study-habits", "health", "environment", "digital"][index]}
        className="space-y-6"
      >
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span>Your Strengths</span>
              </CardTitle>
              <CardDescription>Keep up these excellent habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.strengths?.length > 0 ? (
                  category.strengths.map((strength, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <Star className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-green-800">{strength}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">
                    Focus on implementing the improvement tips to develop strengths in this area.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Improvement Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700">
                <Lightbulb className="w-5 h-5" />
                <span>Improvement Tips</span>
              </CardTitle>
              <CardDescription>Actionable steps to boost your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.tips?.length > 0 ? (
                  category.tips.map((tip, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Target className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-800">{tip}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No tips available.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    ))
  ) : (
    <p className="text-gray-600 mt-4">No detailed feedback available.</p>
  )}
</Tabs>


        {/* Action Items */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span>Quick Action Items</span>
            </CardTitle>
            <CardDescription>Start with these high-impact changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getQuickActionItems(studentData).map((action, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-yellow-800 font-medium">{action}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mt-8 bg-gradient-to-r from-slate-50 to-slate-100">
          <CardContent className="p-8 text-center">
            <Brain className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Keep Growing!</h3>
            <p className="text-gray-600 mb-6">
              Remember, academic success is a journey. Small, consistent improvements lead to big results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push('/')} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Update Prediction
              </Button>
              <Button 
                onClick={() => window.print()} 
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Save Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getQuickActionItems(data: StudentData): string[] {
  const items = [];
  
  if (data.studyHours < 4) {
    items.push("Increase daily study time by 1 hour");
  }
  
  if (data.socialMediaTime > 3) {
    items.push("Set a 2-hour daily limit on social media");
  }
  
  if (data.sleepHours < 7) {
    items.push("Establish a consistent bedtime routine");
  }
  
  if (data.physicalActivity < 1) {
    items.push("Add 30 minutes of daily physical activity");
  }
  
  if (!data.tutoring && data.previousGrade < 75) {
    items.push("Seek tutoring for challenging subjects");
  }
  
  if (!data.extracurricular) {
    items.push("Join at least one academic activity");
  }
  
  // Always include these general tips
  items.push("Create a distraction-free study environment");
  items.push("Use active learning techniques");
  items.push("Set specific, measurable academic goals");
  
  return items.slice(0, 6); // Return top 6 items
}