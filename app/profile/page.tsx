"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, Camera, Star, Trophy, Gift, Crown, Zap, Target, Users, Calendar, Edit3, Save, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [userStats, setUserStats] = useState({
    name: "Admin User",
    email: "admin@admin.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    university: "Columbia University",
    xp: 2450,
    level: "Gold",
    totalSavings: 1247.5,
    dealsUsed: 89,
    referrals: 12,
    joinDate: "January 2024",
  })
  const router = useRouter()

  useEffect(() => {
    const authenticated = localStorage.getItem("isAuthenticated")
    if (!authenticated) {
      router.push("/signin")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const achievements = [
    { id: 1, name: "First Purchase", icon: Gift, earned: true, description: "Made your first discounted purchase" },
    { id: 2, name: "Savings Master", icon: Target, earned: true, description: "Saved over $1000" },
    { id: 3, name: "Social Butterfly", icon: Users, earned: true, description: "Referred 10+ friends" },
    { id: 4, name: "Deal Hunter", icon: Trophy, earned: false, description: "Use 100 different deals" },
    { id: 5, name: "VIP Member", icon: Crown, earned: false, description: "Reach Platinum level" },
    { id: 6, name: "Streak Master", icon: Zap, earned: false, description: "30-day login streak" },
  ]

  const guilds = [
    { id: 1, name: "Tech Savers", members: 1247, rank: "Elite", color: "from-blue-400 to-blue-600" },
    { id: 2, name: "Fashion Forward", members: 892, rank: "Member", color: "from-pink-400 to-pink-600" },
    { id: 3, name: "Food Lovers", members: 2156, rank: "VIP", color: "from-green-400 to-green-600" },
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-orange-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Navigation */}
      <nav className="w-full bg-black/50 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-orange-400">StudentSaver</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white/80 hover:text-orange-400 transition-colors">
                Dashboard
              </Link>
              <Button
                onClick={() => {
                  localStorage.clear()
                  router.push("/signin")
                }}
                variant="outline"
                className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black bg-transparent"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="p-8 bg-gradient-to-r from-orange-400/10 to-orange-600/10 border-orange-400/30 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-4xl font-bold text-black">
                  AU
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-black hover:bg-orange-500 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{userStats.name}</h1>
                  <Badge className="bg-gradient-to-r from-orange-400 to-orange-600 text-black">
                    <Crown className="w-4 h-4 mr-1" />
                    {userStats.level}
                  </Badge>
                </div>
                <p className="text-gray-300 mb-4">{userStats.university}</p>

                {/* XP Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Level Progress</span>
                    <span className="text-sm text-orange-400">{userStats.xp}/3000 XP</span>
                  </div>
                  <Progress value={(userStats.xp / 3000) * 100} className="h-3 bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500" />
                  </Progress>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-400">${userStats.totalSavings}</div>
                    <div className="text-sm text-gray-300">Total Saved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400">{userStats.dealsUsed}</div>
                    <div className="text-sm text-gray-300">Deals Used</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400">{userStats.referrals}</div>
                    <div className="text-sm text-gray-300">Referrals</div>
                  </div>
                </div>
              </div>

              <Button onClick={() => setIsEditing(!isEditing)} className="bg-orange-400 text-black hover:bg-orange-500">
                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card className="p-6 bg-black/40 border-orange-400/30 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-orange-400" />
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Full Name</label>
                  <Input
                    value={userStats.name}
                    disabled={!isEditing}
                    className="bg-white/5 border-orange-400/30 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Email</label>
                  <Input
                    value={userStats.email}
                    disabled={!isEditing}
                    className="bg-white/5 border-orange-400/30 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Phone</label>
                  <Input
                    value={userStats.phone}
                    disabled={!isEditing}
                    className="bg-white/5 border-orange-400/30 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Location</label>
                  <Input
                    value={userStats.location}
                    disabled={!isEditing}
                    className="bg-white/5 border-orange-400/30 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-300 mb-1 block">University</label>
                  <Input
                    value={userStats.university}
                    disabled={!isEditing}
                    className="bg-white/5 border-orange-400/30 text-white"
                  />
                </div>
              </div>
              {isEditing && (
                <div className="mt-6 flex gap-3">
                  <Button className="bg-orange-400 text-black hover:bg-orange-500">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                    Cancel
                  </Button>
                </div>
              )}
            </Card>

            {/* Achievements */}
            <Card className="p-6 bg-black/40 border-orange-400/30 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-orange-400" />
                Achievements
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.earned
                        ? "bg-orange-400/10 border-orange-400/30 text-white"
                        : "bg-gray-800/50 border-gray-600/30 text-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <achievement.icon
                        className={`w-6 h-6 ${achievement.earned ? "text-orange-400" : "text-gray-500"}`}
                      />
                      <h3 className="font-semibold">{achievement.name}</h3>
                      {achievement.earned && <Badge className="bg-orange-400 text-black text-xs">Earned</Badge>}
                    </div>
                    <p className="text-sm opacity-80">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Guilds */}
            <Card className="p-6 bg-black/40 border-orange-400/30 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2 text-orange-400" />
                My Guilds
              </h2>
              <div className="space-y-4">
                {guilds.map((guild) => (
                  <div key={guild.id} className="p-4 rounded-lg bg-white/5 border border-orange-400/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{guild.name}</h3>
                      <Badge className={`bg-gradient-to-r ${guild.color} text-white`}>{guild.rank}</Badge>
                    </div>
                    <p className="text-sm text-gray-300">{guild.members.toLocaleString()} members</p>
                  </div>
                ))}
                <Button className="w-full bg-orange-400/20 text-orange-400 border border-orange-400/30 hover:bg-orange-400/30">
                  <Users className="w-4 h-4 mr-2" />
                  Join New Guild
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 bg-black/40 border-orange-400/30 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-400" />
                Recent Activity
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <Gift className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-sm text-white">Used Nike discount</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <Star className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-sm text-white">Earned 50 XP</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <Users className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-sm text-white">Referred a friend</p>
                    <p className="text-xs text-gray-400">3 days ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
