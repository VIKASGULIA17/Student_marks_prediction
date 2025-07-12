import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, AlertTriangle, BarChart3 } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Main Error Card */}
        <Card className="bg-white/80 backdrop-blur-sm border border-emerald-200 shadow-2xl">
          <CardContent className="p-12">
            {/* Error Icon and Code */}
            <div className="mb-8">
              <div className="relative">
                <div className="text-8xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  404
                </div>
                <AlertTriangle className="w-16 h-16 text-yellow-500 absolute -top-4 -right-4 animate-pulse" />
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
              <p className="text-lg text-gray-600 mb-2">Oops! The page you're looking for doesn't exist.</p>
              <p className="text-gray-500">It might have been moved, deleted, or you entered the wrong URL.</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
              >
                <Link href="/">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Start Prediction
                </Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link href="/predict" className="text-emerald-600 hover:text-emerald-800 hover:underline transition-colors">
                  Student Prediction Form
                </Link>
                <span className="text-gray-300">•</span>
               
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help Section */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Search className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Need Help?</h3>
              </div>
              <p className="text-blue-700 text-sm">
                If you believe this is an error or need assistance, please check the URL or contact support.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  )
}