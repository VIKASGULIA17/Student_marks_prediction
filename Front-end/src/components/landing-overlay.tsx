"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, TrendingUp, Brain, ArrowRight, Loader2, Sparkles } from "lucide-react";

export const LandingOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Add entrance animation delay
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setIsLoading(true);
    setShowEffects(true);

    // Show loading animation for 2 seconds
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        router.push("/predict");
      }, 300);
    }, 2000);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-emerald-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Loading Effects */}
      {showEffects && (
        <>
          {/* Sparkle Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute animate-ping`}
                style={{
                  left: `${20 + (i % 4) * 20}%`,
                  top: `${30 + Math.floor(i / 4) * 40}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '1s'
                }}
              >
                <Sparkles className="h-6 w-6 text-emerald-400 opacity-70" />
              </div>
            ))}
          </div>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-emerald-400 rounded-full animate-ping opacity-20" />
            <div className="w-48 h-48 border-2 border-emerald-300 rounded-full animate-ping opacity-10 absolute" style={{ animationDelay: '0.5s' }} />
            <div className="w-64 h-64 border border-emerald-200 rounded-full animate-ping opacity-5 absolute" style={{ animationDelay: '1s' }} />
          </div>
        </>
      )}

      {/* Main Content */}
      <Card
        className={`relative max-w-2xl w-full bg-white/95 backdrop-blur-lg border-slate-200/20 shadow-2xl transform transition-all duration-700 delay-200 ${
          isAnimating ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-8"
        } ${showEffects ? "animate-pulse" : ""}`}
      >
        <div className="p-8 md:p-12 text-center">
          {/* Icon Row */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className={`p-3 bg-emerald-100 rounded-full transition-all duration-500 ${showEffects ? "scale-110 bg-emerald-200" : ""}`}>
              <GraduationCap className={`h-8 w-8 text-emerald-600 transition-all duration-500 ${showEffects ? "scale-110" : ""}`} />
            </div>
            <div className={`p-3 bg-emerald-100 rounded-full transition-all duration-500 delay-100 ${showEffects ? "scale-110 bg-emerald-200" : ""}`}>
              <Brain className={`h-8 w-8 text-emerald-600 transition-all duration-500 ${showEffects ? "scale-110" : ""}`} />
            </div>
            <div className={`p-3 bg-emerald-100 rounded-full transition-all duration-500 delay-200 ${showEffects ? "scale-110 bg-emerald-200" : ""}`}>
              <TrendingUp className={`h-8 w-8 text-emerald-600 transition-all duration-500 ${showEffects ? "scale-110" : ""}`} />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              StudentScore
            </span>{" "}
            <span className="text-slate-800">AI</span>
          </h1>

          {/* Status Text */}
          {isLoading ? (
            <div className="mb-6">
              <h2 className="text-xl text-emerald-600 font-medium mb-2">
                Initializing AI Engine...
              </h2>
              <p className="text-slate-500 text-sm">
                Preparing your personalized prediction experience
              </p>
            </div>
          ) : (
            <>
              {/* Subtitle */}
              <h2 className="text-xl md:text-2xl text-slate-600 font-medium mb-6 leading-relaxed">
                Advanced Student Exam Performance Predictor
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                Harness the power of machine learning to predict student exam scores based on study habits, 
                attendance, and performance metrics. Get intelligent insights to improve academic outcomes.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center justify-center space-x-2 text-slate-600">
                  <Brain className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium">AI-Powered</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-slate-600">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium">Accurate Predictions</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-slate-600">
                  <GraduationCap className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium">Academic Insights</span>
                </div>
              </div>
            </>
          )}

          {/* CTA Button */}
          <Button
            onClick={handleGetStarted}
            disabled={isLoading}
            size="lg"
            className={`bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed group ${
              isLoading ? "bg-emerald-700" : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Begin Prediction
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </Button>

          {/* Subtle Footer Note */}
          <p className="text-slate-400 text-sm mt-6">
            Powered by advanced machine learning algorithms
          </p>
        </div>
      </Card>
    </div>
  );
};