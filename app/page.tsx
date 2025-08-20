"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  Star,
  Zap,
  Gift,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Trophy,
  Target,
  Coins,
  Flame,
  Heart,
  Share2,
  Bell,
  User,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function StudentDiscountLanding() {
  const [scrollY, setScrollY] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [totalSavings, setTotalSavings] = useState(0)
  const [spinnerActive, setSpinnerActive] = useState(false)
  const [notifications, setNotifications] = useState<
    Array<{ id: number; message: string; type: "deal" | "savings" | "achievement" }>
  >([])
  const [userLevel, setUserLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [floatingDeals, setFloatingDeals] = useState<Array<{ id: number; x: number; y: number; deal: string }>>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [claimedDeals, setClaimedDeals] = useState<Set<string>>(new Set())
  const [claimingDeal, setClaimingDeal] = useState<string | null>(null)
  const [claimParticles, setClaimParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const authenticated = localStorage.getItem("isAuthenticated")
    const userEmail = localStorage.getItem("userEmail")
    const storedUserName = localStorage.getItem("userName")
    const storedXP = localStorage.getItem("userXP")
    const storedLevel = localStorage.getItem("userLevel")

    if (authenticated === "true") {
      setIsAuthenticated(true)
      setUserName(storedUserName || "Student")
      setXp(Number.parseInt(storedXP || "0"))
      setUserLevel(storedLevel === "Gold" ? 5 : 1)
      setStreak(7) // Set initial streak

      // Show welcome notification
      setTimeout(() => {
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now(),
            message: `🎉 Welcome back, ${storedUserName}! Your features are now active!`,
            type: "achievement",
          },
        ])
      }, 1000)

      // Auto-trigger spinner after 3 seconds
      setTimeout(() => {
        if (!spinnerActive) {
          spinWheel()
        }
      }, 3000)
    }

    // Check if redirected from sign-in
    if (searchParams.get("authenticated") === "true") {
      window.history.replaceState({}, "", "/")
    }
  }, [searchParams, spinnerActive])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSavings((prev) => prev + Math.floor(Math.random() * 50) + 10)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      const newDeal = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight,
        deal: `${Math.floor(Math.random() * 50) + 10}% OFF`,
      }
      setFloatingDeals((prev) => [...prev, newDeal])

      setTimeout(() => {
        setFloatingDeals((prev) => prev.filter((deal) => deal.id !== newDeal.id))
      }, 4000)
    }, 3000)
    return () => clearInterval(interval)
  }, [isAuthenticated])

  useEffect(() => {
    const messages = isAuthenticated
      ? [
          { message: "🎉 Sarah just saved £45 on Nike!", type: "deal" as const },
          { message: "💰 Total community savings: £2.5M+", type: "savings" as const },
          { message: "🏆 You've unlocked 'Deal Hunter' badge!", type: "achievement" as const },
          { message: "🔥 Flash deal: 60% off Adobe Creative Suite!", type: "deal" as const },
          { message: "⚡ Your XP increased by 25 points!", type: "achievement" as const },
          { message: "🎯 New personal best: £150 saved this month!", type: "savings" as const },
        ]
      : [
          { message: "🎉 Join 2M+ students saving money!", type: "deal" as const },
          { message: "💰 Community saved £2.5M+ this month", type: "savings" as const },
        ]

    const interval = setInterval(
      () => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        const notification = {
          id: Date.now(),
          ...randomMessage,
        }

        setNotifications((prev) => [...prev, notification])

        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
        }, 4000)
      },
      isAuthenticated ? 3000 : 8000,
    ) // More frequent for authenticated users

    return () => clearInterval(interval)
  }, [isAuthenticated])

  const deals = [
    {
      brand: "Spotify",
      discount: "50% Off",
      originalPrice: "£9.99/mo",
      studentPrice: "£4.99/mo",
      logo: "/spotify-green-music-streaming.png",
      category: "Music",
      trending: true,
      description: "Premium music streaming with offline downloads and no ads",
    },
    {
      brand: "Nike",
      discount: "25% Off",
      originalPrice: "£120",
      studentPrice: "£90",
      logo: "/nike-swoosh-black.png",
      category: "Fashion",
      trending: true,
      description: "Latest Air Max collection and athletic wear with student verification",
    },
    {
      brand: "Adobe",
      discount: "60% Off",
      originalPrice: "£49.99/mo",
      studentPrice: "£19.99/mo",
      logo: "/adobe-creative-cloud-red.png",
      category: "Software",
      trending: true,
      description: "Complete Creative Cloud suite including Photoshop, Illustrator, and more",
    },
    {
      brand: "McDonald's",
      discount: "20% Off",
      originalPrice: "£8.50",
      studentPrice: "£6.80",
      logo: "/generic-golden-arches.png",
      category: "Food",
      trending: false,
      description: "Student meals and exclusive app offers at participating locations",
    },
    {
      brand: "ASOS",
      discount: "15% Off",
      originalPrice: "£45",
      studentPrice: "£38.25",
      logo: "/placeholder-nombx.png",
      category: "Fashion",
      trending: true,
      description: "Latest fashion trends and exclusive student collections",
    },
    {
      brand: "Uber",
      discount: "30% Off",
      originalPrice: "£12",
      studentPrice: "£8.40",
      logo: "/uber-logo-rideshare-app.png",
      category: "Transport",
      trending: false,
      description: "Student rides and Uber Eats delivery discounts",
    },
    {
      brand: "Apple Music",
      discount: "50% Off",
      originalPrice: "£10.99/mo",
      studentPrice: "£5.49/mo",
      logo: "/colorful-gradient-music-streaming.png",
      category: "Music",
      trending: true,
      description: "Access to 100+ million songs with lossless audio quality",
    },
    {
      brand: "Microsoft",
      discount: "90% Off",
      originalPrice: "£119.99/yr",
      studentPrice: "£11.99/yr",
      logo: "/office365-logo-blue.png",
      category: "Software",
      trending: true,
      description: "Office 365 suite with Word, Excel, PowerPoint, and 1TB OneDrive",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % deals.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [deals.length])

  const spinWheel = () => {
    setSpinnerActive(true)
    setTimeout(() => {
      const prizes = ["10% OFF", "25% OFF", "50% OFF", "Free Shipping", "£5 Credit", "30% OFF"]
      const prize = prizes[Math.floor(Math.random() * prizes.length)]
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: `🎰 Wheel Spin: You won ${prize}!`,
          type: "achievement",
        },
      ])
      setSpinnerActive(false)
      if (isAuthenticated) {
        setXp((prev) => prev + 50)
      }
    }, 3000)
  }

  const handleSignOut = () => {
    localStorage.clear()
    setIsAuthenticated(false)
    setUserName("")
    setXp(0)
    setUserLevel(1)
    setStreak(0)
    router.push("/signin")
  }

  const handleClaimDeal = (dealBrand: string, event: React.MouseEvent) => {
    if (claimedDeals.has(dealBrand) || claimingDeal) return

    setClaimingDeal(dealBrand)

    // Create particle explosion effect
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }))
    setClaimParticles(particles)

    // Simulate claim process
    setTimeout(() => {
      setClaimedDeals((prev) => new Set([...prev, dealBrand]))
      setClaimingDeal(null)

      // Add success notification
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: `🎉 ${dealBrand} discount claimed successfully! Check your email for the code.`,
          type: "achievement",
        },
      ])

      // Add XP if authenticated
      if (isAuthenticated) {
        setXp((prev) => prev + 100)
      }

      // Clear particles
      setTimeout(() => {
        setClaimParticles([])
      }, 1000)
    }, 2000)
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg backdrop-blur-md border animate-slide-in-right ${
              notification.type === "deal"
                ? "bg-orange-400/20 border-orange-400/30 text-orange-400"
                : notification.type === "savings"
                  ? "bg-green-400/20 border-green-400/30 text-green-400"
                  : "bg-purple-400/20 border-purple-400/30 text-purple-400"
            }`}
          >
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        ))}
      </div>

      {floatingDeals.map((deal) => (
        <div
          key={deal.id}
          className="fixed z-30 pointer-events-none animate-float-up"
          style={{
            left: deal.x,
            bottom: 0,
            animation: "floatUp 4s ease-out forwards",
          }}
        >
          <div className="bg-orange-400/90 text-black px-3 py-1 rounded-full text-sm font-bold">{deal.deal}</div>
        </div>
      ))}

      {isAuthenticated && (
        <div className="fixed top-16 left-4 z-50 bg-black/80 backdrop-blur-md rounded-lg p-3 border border-orange-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-bold">Level {userLevel}</span>
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-orange-500 text-sm">{streak} day streak</span>
          </div>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500"
              style={{ width: `${(xp % 1000) / 10}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">{xp % 1000}/1000 XP</p>
        </div>
      )}

      <div className="fixed bottom-4 left-4 z-50 bg-green-400/20 backdrop-blur-md rounded-lg p-3 border border-green-400/30">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-green-400" />
          <div>
            <p className="text-green-400 font-bold text-lg">£{totalSavings.toLocaleString()}</p>
            <p className="text-green-300 text-xs">Community Savings Today</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-orange-400">StudentSaver</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#deals" className="text-white/80 hover:text-orange-400 transition-colors">
                Deals
              </a>
              <a href="#categories" className="text-white/80 hover:text-orange-400 transition-colors">
                Categories
              </a>
              <a href="#about" className="text-white/80 hover:text-orange-400 transition-colors">
                About
              </a>
              <button className="relative text-white/80 hover:text-orange-400 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
              </button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link href="/profile">
                    <Button
                      variant="outline"
                      className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black bg-transparent"
                    >
                      <User className="w-4 h-4 mr-2" />
                      {userName}
                    </Button>
                  </Link>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="border-red-400 text-red-400 hover:bg-red-400 hover:text-black bg-transparent"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link href="/signin">
                  <Button
                    variant="outline"
                    className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Full-Screen Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`,
          }}
        >
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A%20clean%20white%20background%20fades%20in%20with%20a%20floating%203D%20gift%20box%20%28black%20with%20neon%20trim%29%20gently%20rotating%20in%20the%20center.%20Sparkling%20particles%20and%20soft%20gradient%20bloom%20around%20the%20box.%20The%20gift%20box%20opens%20with%20a%20smooth%20pop%20a-hoeMgz0l73pTKl96HneZ3NvG0r1BIU.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 opacity-30" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400/30 rounded-full animate-float animate-pulse-glow" />
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-orange-600/30 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-40 left-1/4 w-40 h-40 bg-orange-500/20 rounded-full animate-float"
            style={{ animationDelay: "4s" }}
          />
          {/* Sparkle effects */}
          <div className="sparkle top-1/4 left-1/3" style={{ animationDelay: "0s" }} />
          <div className="sparkle top-3/4 right-1/4" style={{ animationDelay: "1s" }} />
          <div className="sparkle top-1/2 left-3/4" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge className="mb-6 bg-orange-400/20 text-orange-400 border-orange-400/30 animate-glow backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            {isAuthenticated ? `Welcome back, ${userName}!` : "Exclusive Student Discounts"}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
            Save Big on
            <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent neon-text">
              Everything
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-lg">
            {isAuthenticated
              ? "Your personalized deals are ready! Explore exclusive discounts from 1000+ brands tailored just for you."
              : "Unlock exclusive student discounts from 1000+ brands. From tech to fashion, food to travel - save on everything you love."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link href="/profile">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-400 to-orange-600 text-black hover:from-orange-500 hover:to-orange-700 text-lg px-8 py-6 font-semibold animate-pulse-glow"
                >
                  View My Profile
                  <User className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/signin">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-400 to-orange-600 text-black hover:from-orange-500 hover:to-orange-700 text-lg px-8 py-6 font-semibold animate-pulse-glow"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
            <Button
              size="lg"
              variant="outline"
              className="border-orange-400/50 text-orange-400 hover:bg-orange-400/10 text-lg px-8 py-6 glass bg-transparent"
            >
              Browse Deals
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-orange-400/60 rotate-90" />
        </div>
      </section>

      <section
        className={`py-20 bg-gradient-to-br from-purple-900/20 via-black to-orange-900/20 relative overflow-hidden ${!isAuthenticated ? "opacity-60" : ""}`}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
            <Target className="w-10 h-10 text-orange-400" />
            Spin the Discount Wheel
            {!isAuthenticated && (
              <Badge className="ml-4 bg-red-400/20 text-red-400 border-red-400/30">Sign In Required</Badge>
            )}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {isAuthenticated ? "Try your luck for extra savings!" : "Sign in to unlock the discount wheel!"}
          </p>

          <div className="relative inline-block">
            <div
              className={`w-64 h-64 mx-auto rounded-full border-8 border-orange-400 relative overflow-hidden ${spinnerActive ? "animate-spin-wheel" : ""}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
                {/* Wheel segments */}
                {["10%", "25%", "50%", "FREE", "£5", "30%"].map((prize, index) => (
                  <div
                    key={index}
                    className="absolute w-full h-full flex items-center justify-center text-black font-bold text-lg"
                    style={{
                      transform: `rotate(${index * 60}deg)`,
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(((index + 1) * 60 * Math.PI) / 180)}% ${50 - 50 * Math.sin(((index + 1) * 60 * Math.PI) / 180)}%)`,
                    }}
                  >
                    <span style={{ transform: `rotate(30deg)` }}>{prize}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-orange-400" />
            </div>
          </div>

          <Button
            onClick={isAuthenticated ? spinWheel : () => router.push("/signin")}
            disabled={spinnerActive}
            className="mt-8 bg-gradient-to-r from-purple-500 to-orange-500 text-white hover:from-purple-600 hover:to-orange-600 px-8 py-4 text-lg font-bold disabled:opacity-50"
          >
            {spinnerActive ? "Spinning..." : isAuthenticated ? "Spin Now!" : "Sign In to Spin"}
            <Target className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <section id="deals" className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
          <div className="absolute top-10 right-1/4 w-64 h-64 bg-orange-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-48 h-48 bg-orange-600 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Gift className="w-10 h-10 text-orange-400" />
              Deals of the Day
            </h2>
            <p className="text-xl text-gray-300">Limited time offers you can't miss</p>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 320}px)`,
                width: `${deals.length * 320}px`,
              }}
            >
              {deals.map((deal, index) => (
                <div key={index} className="luxury-card w-80 h-80 flex-shrink-0 mr-8">
                  <div className="luxury-card-inner">
                    <div className="luxury-card-front relative overflow-hidden">
                      {/* Gold border frame */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl p-1">
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl relative overflow-hidden">
                          {/* Inner gold accent border */}
                          <div className="absolute inset-2 border border-orange-400/30 rounded-lg"></div>

                          {/* Card content */}
                          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                            {/* Header with brand logo and trending badge */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/10 rounded-lg p-2 border border-orange-400/20">
                                  <img
                                    src={deal.logo || "/placeholder.svg"}
                                    alt={`${deal.brand} logo`}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-orange-400 tracking-wide">{deal.brand}</h3>
                                  <p className="text-xs text-gray-400 uppercase tracking-wider">{deal.category}</p>
                                </div>
                              </div>
                              {deal.trending && (
                                <Badge className="bg-orange-400/20 text-orange-400 border-orange-400/30 text-xs font-semibold">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  HOT
                                </Badge>
                              )}
                            </div>

                            {/* Discount display */}
                            <div className="text-center mb-4">
                              <div className="text-4xl font-bold text-orange-400 mb-2 tracking-wider">
                                {deal.discount}
                              </div>
                              <div className="text-sm text-gray-300 uppercase tracking-widest font-semibold">
                                STUDENT DISCOUNT
                              </div>
                            </div>

                            {/* Pricing */}
                            <div className="text-center mb-4">
                              <div className="flex items-center justify-center gap-3">
                                <span className="text-gray-500 line-through text-sm">{deal.originalPrice}</span>
                                <span className="text-orange-400 font-bold text-lg">{deal.studentPrice}</span>
                              </div>
                            </div>

                            {/* QR Code placeholder */}
                            <div className="flex justify-center">
                              <div className="w-16 h-16 bg-white/90 rounded-lg flex items-center justify-center">
                                <div className="w-12 h-12 bg-black rounded grid grid-cols-4 gap-px p-1">
                                  {Array.from({ length: 16 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`${Math.random() > 0.5 ? "bg-white" : "bg-black"} rounded-sm`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Luxury shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent transform -skew-x-12 translate-x-full animate-shine"></div>
                        </div>
                      </div>
                    </div>

                    <div className="luxury-card-back relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl p-1">
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl relative overflow-hidden">
                          <div className="absolute inset-2 border border-orange-400/30 rounded-lg"></div>

                          <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-orange-400">{deal.brand}</h3>
                                <img
                                  src={deal.logo || "/placeholder.svg"}
                                  alt={`${deal.brand} logo`}
                                  className="w-10 h-10 object-contain rounded-lg bg-white/10 p-1"
                                />
                              </div>
                              <p className="text-gray-300 mb-4 text-sm leading-relaxed">{deal.description}</p>
                              <div className="bg-orange-400/10 border border-orange-400/20 rounded-lg p-3 mb-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-400 uppercase tracking-wide">You Save:</span>
                                  <span className="text-lg font-bold text-orange-400">{deal.discount}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Button
                                onClick={(e) => handleClaimDeal(deal.brand, e)}
                                disabled={claimingDeal === deal.brand}
                                className={`w-full font-bold py-3 text-sm uppercase tracking-wide transition-all duration-300 relative overflow-hidden ${
                                  claimedDeals.has(deal.brand)
                                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white cursor-default"
                                    : claimingDeal === deal.brand
                                      ? "bg-gradient-to-r from-orange-300 to-orange-400 text-black animate-pulse cursor-wait"
                                      : "bg-gradient-to-r from-orange-400 to-orange-500 text-black hover:from-orange-500 hover:to-orange-600 hover:scale-105 hover:shadow-2xl hover:shadow-orange-400/50 claim-button-glow"
                                }`}
                              >
                                {claimedDeals.has(deal.brand) ? (
                                  <>
                                    <span className="flex items-center justify-center">
                                      ✓ Claimed Successfully
                                      <Sparkles className="ml-2 w-4 h-4 animate-spin" />
                                    </span>
                                  </>
                                ) : claimingDeal === deal.brand ? (
                                  <>
                                    <span className="flex items-center justify-center">
                                      Processing...
                                      <div className="ml-2 w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="relative z-10 flex items-center justify-center">
                                      🎯 Claim Now
                                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                  </>
                                )}
                              </Button>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 border-orange-400/30 text-orange-400 hover:bg-orange-400/10 bg-transparent hover:scale-105 transition-all duration-200"
                                >
                                  <Heart className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 border-orange-400/30 text-orange-400 hover:bg-orange-400/10 bg-transparent hover:scale-105 transition-all duration-200"
                                >
                                  <Share2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent transform -skew-x-12 translate-x-full animate-shine"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-2">
              {deals.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-orange-400 w-6" : "bg-white/30"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* View All Deals Button */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-400 to-orange-600 text-black hover:from-orange-500 hover:to-orange-700 px-8 py-4 font-semibold"
            >
              View All 1000+ Deals
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Student Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Trophy className="w-10 h-10 text-orange-400" />
              Student Achievements
            </h2>
            <p className="text-xl text-gray-300">Level up your savings game</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Deal Hunter", desc: "Claimed 10 deals", icon: Target, color: "orange" },
              { title: "Savings Master", desc: "Saved over £500", icon: Coins, color: "green" },
              { title: "Streak Legend", desc: "30-day login streak", icon: Flame, color: "red" },
              { title: "Social Saver", desc: "Shared 5 deals", icon: Share2, color: "blue" },
            ].map((achievement, index) => (
              <Card
                key={index}
                className="p-6 text-center bg-gray-900/90 backdrop-blur-sm border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br from-${achievement.color}-400 to-${achievement.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-gray-400 text-sm">{achievement.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Parallax */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <div className="absolute top-10 right-10 w-20 h-20 bg-orange-500 rounded-full animate-pulse" />
          <div
            className="absolute bottom-20 left-20 w-32 h-32 bg-orange-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.05}deg)` }}
        >
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-400 rounded-full animate-ping" />
          <div
            className="absolute top-3/4 right-1/4 w-3 h-3 bg-orange-500 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute top-1/2 left-3/4 w-2 h-2 bg-orange-400 rounded-full animate-ping"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-3 h-3 bg-orange-500 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose StudentSaver?</h2>
            <p className="text-xl text-gray-300">The ultimate platform for student savings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-gray-900/90 backdrop-blur-sm border-orange-400/20">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">1000+ Brands</h3>
              <p className="text-gray-300">Access exclusive discounts from top brands across all categories</p>
            </Card>

            <Card className="p-8 text-center bg-gray-900/90 backdrop-blur-sm border-orange-400/20">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Up to 70% Off</h3>
              <p className="text-gray-300">Save big with discounts up to 70% off regular prices</p>
            </Card>

            <Card className="p-8 text-center bg-gray-900/90 backdrop-blur-sm border-orange-400/20">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">2M+ Students</h3>
              <p className="text-gray-300">Join millions of students already saving with StudentSaver</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Saving?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join StudentSaver today and unlock exclusive discounts on everything you need.
          </p>
          {isAuthenticated ? (
            <Link href="/profile">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-black hover:from-orange-500 hover:to-orange-700 text-lg px-12 py-6 animate-glow"
              >
                View My Dashboard
                <User className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/signin">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-black hover:from-orange-500 hover:to-orange-700 text-lg px-12 py-6 animate-glow"
              >
                Sign Up Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-orange-400/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-orange-400">StudentSaver</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-orange-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-orange-400/20 text-center text-gray-400">
            <p>&copy; 2024 StudentSaver. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
