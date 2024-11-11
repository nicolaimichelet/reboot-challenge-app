'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Send, Plus, AlertTriangle, RefreshCw, Home, Book, Trophy, User, Settings, Clock, FrownIcon, SmileIcon, MehIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export function ChallengeAppComponent() {
  const [step, setStep] = useState(0)
  const [friendPhone, setFriendPhone] = useState('')
  const [challengeStarted, setChallengeStarted] = useState(false)
  const [customChallengeClicks, setCustomChallengeClicks] = useState(0)
  const [currentTab, setCurrentTab] = useState('home')

  const challengeRules = [
    "Avoid All Social Media: Stay off Facebook, Instagram, X (formerly Twitter), TikTok, and Snapchat for the entire 7 days.",
    "Limit Screen Time: Set a daily limit of 2 hours for overall screen time (excluding necessary work or school-related use).",
    "Check-Ins: Have a check-in with your friend every other day via group chat or video call to share progress and support each other.",
    "Mutual Goal: Set a mutual goal with your friend, such as spending more time on hobbies, getting better sleep, or improving focus.",
    "Retrospective: At the end of the challenge, have a reflection discussion to share how you felt and what changes you noticed.",
    "Reward: Plan a reward for completing the challenge, like a special outing or treat.",
    "Start Date: The challenge begins 1 day after one or more friends accept your invitation."
  ]

  const rewardIdeas = [
    "A day trip to a nearby town or attraction",
    "Trying out a new restaurant together",
    "Attending a concert or live event",
    "A spa day or relaxation experience",
    "Learning a new skill together (cooking class, art workshop, etc.)",
    "Outdoor adventure (hiking, kayaking, etc.)",
    "Movie marathon with favorite snacks",
    "Volunteer together for a cause you both care about"
  ]

  const participants = [
    { name: "You", status: "active", feeling: "happy" },
    { name: "Sarah", status: "active", feeling: "neutral" },
    { name: "John", status: "gave up", feeling: "sad" },
    { name: "Emma", status: "active", feeling: "happy" }
  ]

  const pastChallenges = [
    { name: "30-Day Fitness Challenge", status: "Completed", date: "May 2023" },
    { name: "Book Reading Marathon", status: "Failed", date: "March 2023" },
    { name: "Healthy Eating Month", status: "Completed", date: "January 2023" }
  ]

  const handleStartChallenge = () => {
    setStep(1)
  }

  const handleInviteFriend = () => {
    // In a real app, this would send an SMS or iMessage
    alert(`Invitation sent to ${friendPhone}. The challenge will start when your friend accepts.`)
    setChallengeStarted(true)
    setCurrentTab('home')
  }

  const handleCustomChallengeClick = () => {
    setCustomChallengeClicks(prev => prev + 1)
    alert("Thanks for your interest! We'll notify you when custom challenges are available.")
  }

  const startChallenge = () => {
    setChallengeStarted(true)
    setCurrentTab('home')
  }

  const giveUp = () => {
    if (confirm("Are you sure you want to give up the challenge?")) {
      alert("Don't worry, you can always try again!")
      setChallengeStarted(false)
      setStep(0)
    }
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300">
              {challengeStarted ? "Challenge Progress" : "Waiting for your friend(s)"}
            </h2>
            {challengeStarted ? (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-blue-800 dark:text-blue-200 mb-2">Day 3 of 7</h3>
                  <Progress value={42} className="w-full" />
                  <p className="mt-2 text-blue-600 dark:text-blue-300">You're doing great! Keep it up!</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">How everyone's feeling:</h3>
                  <div className="flex justify-around">
                    {participants.filter(p => p.status === "active").map((participant, index) => (
                      <div key={index} className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{participant.name}</p>
                        {participant.feeling === "happy" && <SmileIcon className="mx-auto h-6 w-6 text-green-500" />}
                        {participant.feeling === "neutral" && <MehIcon className="mx-auto h-6 w-6 text-yellow-500" />}
                        {participant.feeling === "sad" && <FrownIcon className="mx-auto h-6 w-6 text-red-500" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">We'll notify you when your friend(s) accepts the challenge. In the meantime, here are some tips to prepare:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Remove Temptations: Temporarily delete social media apps from your devices to reduce temptation.</li>
                  <li>Set Boundaries: Inform friends and family about your detox so they can support you and understand your reduced online presence.</li>
                  <li>Engage in Offline Activities: Plan activities that don't involve screens, such as reading, exercising, or spending time outdoors.</li>
                </ul>
                <Button onClick={startChallenge} className="w-full bg-blue-500 hover:bg-blue-600 text-white">Start Challenge</Button>
              </div>
            )}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">Participants</h3>
              <ul className="space-y-2">
                {participants.map((participant, index) => (
                  <li key={index} className={`flex justify-between items-center p-2 rounded ${participant.status === "active" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}>
                    <span>{participant.name}</span>
                    <span>{participant.status === "active" ? "Active" : "Gave up"}</span>
                  </li>
                ))}
              </ul>
            </div>
            {challengeStarted && (
              <Button onClick={giveUp} variant="destructive" className="w-full">I give up</Button>
            )}
          </div>
        )
      case 'rules':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Challenge Rules</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
              {challengeRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        )
      case 'rewards':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Rewards</h2>
            <p className="text-gray-600 dark:text-gray-300">Complete the challenge to unlock your reward! Here are some ideas:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
              {rewardIdeas.map((idea, index) => (
                <li key={index}>{idea}</li>
              ))}
            </ul>
          </div>
        )
      case 'past-challenges':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Past Challenges</h2>
            <ul className="space-y-2">
              {pastChallenges.map((challenge, index) => (
                <li key={index} className={`p-2 rounded ${challenge.status === "Completed" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}>
                  <div className="flex justify-between">
                    <span>{challenge.name}</span>
                    <span>{challenge.status}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{challenge.date}</div>
                </li>
              ))}
            </ul>
          </div>
        )
      default:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300">Ready for a digital detox?</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Join our 7-day challenge to break free from social media and rediscover life beyond the screen.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
                <RefreshCw className="h-5 w-5" />
                <span className="font-medium">Reset your digital habits</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
                <Send className="h-5 w-5" />
                <span className="font-medium">Connect with friends in real life</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
                <Plus className="h-5 w-5" />
                <span className="font-medium">Gain more time for what matters</span>
              </div>
            </div>
            <Button onClick={handleStartChallenge} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-6">
              Start Your Reboot
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader className="bg-blue-500 text-white dark:bg-blue-600 rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold flex items-center">
              <RefreshCw className="mr-2 h-6 w-6" />
              Reboot
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <CardDescription className="text-blue-100">Reclaim your life, one day at a time</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 space-y-6">
          {step === 0 && renderContent()}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">7-Day Digital Detox Challenge</h2>
              <p className="text-gray-600 dark:text-gray-300">Here are the rules for the challenge:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                {challengeRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
              <Alert className="bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
                <AlertTriangle className="h-4 w-4 text-blue-500 dark:text-blue-300" />
                <AlertTitle className="text-blue-700 dark:text-blue-300">Trust is Key</AlertTitle>
                <AlertDescription className="text-blue-600 dark:text-blue-200">
                  This challenge is built on trust between friends. While it&apos;s possible to cheat, doing so defeats the purpose. The app is here to support your growth, not to police you.
                </AlertDescription>
              </Alert>
              <Button onClick={() => setStep(2)} className="w-full bg-blue-500 hover:bg-blue-600 text-white">I Understand</Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Invite a friend to join your challenge</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">The challenge will start when your friend accepts the invitation. We&apos;ll notify you when that happens.</p>
              <div className="space-y-2">
                <Label htmlFor="friend-phone" className="text-blue-600 dark:text-blue-300">Friend&apos;s Phone Number</Label>
                <Input
                  id="friend-phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={friendPhone}
                  onChange={(e) => setFriendPhone(e.target.value)}
                  className="border-blue-200 dark:border-blue-700 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              <Button onClick={handleInviteFriend} disabled={!friendPhone} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <Send className="mr-2 h-4 w-4" /> Invite Friend
              </Button>
            </div>
          )}
        </CardContent>
        {(challengeStarted || step > 0) && (
          <div className="flex justify-around items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-b-lg">
            <Button variant="ghost" onClick={() => setCurrentTab('home')} className={currentTab === 'home' ? 'text-blue-500' : ''}>
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
            <Button variant="ghost" onClick={() => setCurrentTab('rules')} className={currentTab === 'rules' ? 'text-blue-500' : ''}>
              <Book className="h-5 w-5" />
              <span className="sr-only">Rules</span>
            </Button>
            <Button variant="ghost" onClick={() => setCurrentTab('rewards')} className={currentTab === 'rewards' ? 'text-blue-500' : ''}>
              <Trophy className="h-5 w-5" />
              <span className="sr-only">Rewards</span>
            </Button>
            <Button variant="ghost" onClick={() => setCurrentTab('past-challenges')} className={currentTab === 'past-challenges' ? 'text-blue-500' : ''}>
              <Clock className="h-5 w-5" />
              <span className="sr-only">Past Challenges</span>
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}