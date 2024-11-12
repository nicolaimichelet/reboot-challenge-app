'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Send, Plus, AlertTriangle, RefreshCw, Home, BookOpen, Trophy, Clock, Star, Award, Shield, Lock, Zap, Crown } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Participant {
  name: string;
  status: string;
}

interface Achievement {
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  completed: boolean;
}

interface PastChallenge {
  name: string;
  status: string;
  date: string;
}

interface Reward {
  name: string;
  description: string;
}

interface Challenge {
  name: string;
  type: string;
  description: string;
}


interface ChallengeAppState {
  step: number;
  friendPhone: string;
  challengeStarted: boolean;
  currentTab: string;
  friendAccepted: boolean;
  participants: Participant[];
  currentQuote: string;
  selectedReward: string;
  userFullName: string;
  friendName: string;
}

export function ChallengeAppComponent() {
  const [state, setState] = useState<ChallengeAppState>({
    step: 0,
    friendPhone: '+47',
    challengeStarted: false,
    currentTab: 'home',
    friendAccepted: false,
    participants: [{ name: "Erik", status: "aktiv" }],
    currentQuote: '',
    selectedReward: '',
    userFullName: '',
    friendName: ''
  });

  const [pledgeSigned, setPledgeSigned] = useState(false);

  const challenge: Challenge = {
    name: '7-dager uten Sosiale Medier',
    type: 'socialMedia-detox',
    description: 'Frigjør deg fra sosiale medier og gjenoppdage livet utenfor skjermen.'
  }

  const challengeRules = [
    "Unngå alle sosiale medier: Hold deg unna Facebook, Instagram, X, TikTok og Snapchat i 7 dager.",
    "Begrens skjermtid: Sett en daglig grense på 2 timer for total skjermtid (unntatt nødvendig arbeid eller skolerelatert bruk).",
    "Felles mål: Sett et felles mål sammen - bruk mer tid på hobbyer, få bedre søvn eller endelig les i den boken.",
    "Check-in: Ha en 10 minutter check-in med vennen din annenhver dag via FaceTime.",
    "Tilbakeblikk: På slutten av utfordringen, reflekter hvordan du føler deg og hva dere oppnådde.",
    "Belønning: Planlegg en belønning for å fullføre utfordringen. Den som taper betaler!",
    "Ingen taper: Om begge klarer utfordringen, gratulerer! Hva er vel bedre belønning enn det? Neste gang kanskje prøv en tøffere utfordring.",
    "Startdato: Utfordringen starter så fort din venn aksepterer og avgir sitt løfte."
  ]

  const rewards: Reward[] = [
    { name: "En hyggelig middag", description: "Den som taper, spanderer en hyggelig middag på vinneren." },
    { name: "Kinobilletter", description: "Taperen spanderer kinobilletter" },
    { name: "Hjemmelaget middag", description: "Taperen lager middag til vinneren." },
    { name: "Glede gavekort", description: "Taperen sender Glede gavekort til vinneren" },
    { name: "Spa-dag", description: "En avslappende spa-dag for vinneren." },
    { name: "Personlig tjeneste", description: "Taperen må gjøre en personlig tjeneste" },
    { name: "Valgfritt", description: "Dere avtaler en egen belønning" }
  ]

  const achievements: Achievement[] = [
    { name: "Første Steg", description: "Fullfør din første 7-dagers detox", icon: Star, color: "text-yellow-500", completed: false },
    { name: "Hat Trick", description: "Fullfør 3 detox-utfordringer", icon: Award, color: "text-green-500", completed: false },
    { name: "High Five", description: "Fullfør 5 detox-utfordringer", icon: Shield, color: "text-blue-500", completed: false},
    { name: "Locked-in", description: "Fullfør 10 detox-utfordringer", icon: Lock, color: "text-purple-500", completed: false },
    { name: "Detox Mester", description: "Fullfør 20 detox-utfordringer", icon: Zap, color: "text-orange-500", completed: false },
    { name: "Detox Legende", description: "Fullfør 50 detox-utfordringer", icon: Crown, color: "text-red-500", completed: false },
    { name: "Digital Frihet", description: "Fullfør 100 detox-utfordringer", icon: Trophy, color: "text-indigo-500", completed: false }
  ]

  const pastChallenges: PastChallenge[] = [
    { name: "7-dagers digital detox", status: "Mislyktes", date: "Juni 2024" },
    { name: "7-dagers digital detox", status: "Mislyktes", date: "April 2023" },
    { name: "7-dagers digital detox", status: "Mislyktes", date: "Februar 2022" }
  ]

  const motivationalQuotes = [
    "The only way to do great work is to love what you do.",
    "The journey of a thousand miles begins with a single step.",
    "Believe you can and you're halfway there.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Challenges are what make life interesting. Overcoming them is what makes life meaningful."
  ];

  const setCurrentQuote = (quote: string) => {
    setState(prev => ({ ...prev, currentQuote: quote }));
  };

  useEffect(() => {
    setCurrentQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, [state.friendAccepted]);


  const resetApp = useCallback(() => {
    setState({
      step: 0,
      friendPhone: '+47',
      challengeStarted: false,
      currentTab: 'home',
      friendAccepted: false,
      participants: [{ name: "Erik", status: "aktiv" }],
      currentQuote: '',
      selectedReward: '',
      userFullName: '',
      friendName: ''
    });
  }, []);

  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^\+47\d{8}$/
    return phoneRegex.test(phone)
  }

  const renderContent = () => {
    switch (state.step) {
      case 0:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300">Klar for en utfordring?</h2>
            <p className="text-gray-800 dark:text-gray-200">
              Gjennomfør 7 dager uten Sosiale Medier.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-rose-600 dark:text-rose-400">
                <RefreshCw className="h-5 w-5" />
                <span className="font-medium">Løsriv deg selv fra avhengigheten</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-rose-600 dark:text-rose-400">
                <Send className="h-5 w-5" />
                <span className="font-medium">Gjør ting med venner i virkeligheten</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-rose-600 dark:text-rose-400">
                <Plus className="h-5 w-5" />
                <span className="font-medium">Få mer tid til det som betyr noe</span>
              </div>
            </div>
            <Button onClick={() => setState(prev => ({ ...prev, step: 1 }))} className="w-full bg-rose-500 hover:bg-rose-600 text-white text-lg py-6">
              Jeg tar utfordringen!
            </Button>
          </div>
        )
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300">Din Utfordring: {challenge.name}</h2>
            <p className="text-gray-800 dark:text-gray-200">{challenge.description}</p>
            <div className="mt-2 p-4 bg-rose-50 dark:bg-rose-900 rounded-lg max-h-60 overflow-y-auto">
              <h4 className="font-semibold mb-2 text-rose-600 dark:text-rose-300">Regler:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-200">
                {challengeRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
            <Alert variant="default">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Advarsel</AlertTitle>
              <AlertDescription>
                Ærlighet og integritet er avgjørende for denne utfordringen. Vær ærlig med deg selv om din fremgang og eventuelle tilbakefall.
              </AlertDescription>
            </Alert>
            <Button onClick={() => setState(prev => ({ ...prev, step: 2 }))} className="w-full bg-rose-500 hover:bg-rose-600 text-white">
              Jeg forstår reglene
            </Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300">Avlegg ditt løfte</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pledge" className="text-rose-600 dark:text-rose-300">Løfte</Label>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-200">
                    Jeg, <Input
                      className="inline-block w-40 mx-1"
                      placeholder="ditt fulle navn"
                      onChange={(e) => setState(prev => ({ ...prev, userFullName: e.target.value }))}
                    />, lover til <Input
                      className="inline-block w-40 mx-1"
                      placeholder="din venns navn"
                      onChange={(e) => setState(prev => ({ ...prev, friendName: e.target.value }))}
                    /> at jeg respekterer reglene for utfordringen og vil være ærlig. Hvis jeg mislykkes vil jeg innrømme det og jeg skylder min venn den avtalte belønningen.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reward-select" className="text-rose-600 dark:text-rose-300">Velg belønning</Label>
                <Select onValueChange={(value) => setState(prev => ({ ...prev, selectedReward: value }))}>
                  <SelectTrigger id="reward-select">
                    <SelectValue placeholder="Velg en belønning" />
                  </SelectTrigger>
                  <SelectContent>
                    {rewards.map((reward, index) => (
                      <SelectItem key={index} value={reward.name}>
                        {reward.name}: {reward.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="friend-phone" className="text-rose-600 dark:text-rose-300">Vennens telefonnummer</Label>
                <Input
                  id="friend-phone"
                  type="tel"
                  placeholder="+47 xxxxxxxx"
                  value={state.friendPhone}
                  onChange={(e) => setState(prev => ({ ...prev, friendPhone: e.target.value }))}
                  className={`border-gray-300 dark:border-gray-600 focus:ring-rose-500 dark:focus:ring-rose-400 text-gray-800 dark:text-gray-200 ${
                    state.friendPhone && !isValidPhoneNumber(state.friendPhone) ? 'border-2 border-rose-400 dark:border-rose-400' : ''
                  }`}
                />
              </div>
              <Input
                placeholder="Skriv ditt navn her for å signere"
                className="border-rose-200 dark:border-rose-700 focus:ring-rose-500 dark:focus:ring-rose-400 text-gray-800 dark:text-gray-200"
                onChange={(e) => setPledgeSigned(e.target.value.trim().length > 0)}
              />
              <Button
                onClick={() => {
                  if (isValidPhoneNumber(state.friendPhone) && state.selectedReward && state.userFullName && state.friendName) {
                    setState(prev => ({ ...prev, challengeStarted: true, currentTab: 'home' }))
                  } else {
                    alert("Vennligst fyll ut all informasjon før du fortsetter.")
                  }
                }}
                disabled={!pledgeSigned}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Jeg starter ufordringen og sender mitt løfte
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderChallengeContent = () => {
    switch (state.currentTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300">
              7 dager uten Sosiale Medier
            </h2>
            <div className="bg-rose-100 dark:bg-rose-900 p-6 rounded-lg">
              {state.friendAccepted ? (
                <>
                  <h3 className="text-xl font-medium text-rose-800 dark:text-rose-200 mb-2">Dag 1 av 7</h3>
                  <Progress value={0} className="w-full" />
                  <p className="mt-2 text-rose-600 dark:text-rose-300">Utfordringen har startet! Lykke til!</p>
                </>
              ) : (
                <p className="text-rose-800 dark:text-rose-200">Venter på at din venn aksepterer utfordringen! Mens du venter les reglene på nytt.</p>
              )}
            </div>
            {state.friendAccepted && (
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-800 dark:to-yellow-900 p-4 rounded-lg shadow-md border border-yellow-300 dark:border-yellow-600">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Avtalt belønning:</h3>
                <p className="text-yellow-900 dark:text-yellow-100">{state.selectedReward}</p>
              </div>
            )}
            {state.friendAccepted && (
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
                <p className="text-gray-800 dark:text-gray-200 italic">&quot;{state.currentQuote}&quot;</p>
              </div>
            )}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-rose-600 dark:text-rose-300">Deltakere</h3>
              <ul className="space-y-2">
                {state.participants.map((participant, index) => (
                  <li key={index} className="flex justify-between items-center p-2 rounded bg-emerald-400 text-white">
                    <span>{participant.name}</span>
                    <span>{participant.status}</span>
                  </li>
                ))}
                {!state.friendAccepted && (
                  <li className="flex justify-between items-center p-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                    <span>Venter på venn...</span>
                  </li>
                )}
              </ul>
            </div>
            {!state.friendAccepted && (
              <Button onClick={() => setState(prev => ({ ...prev, friendAccepted: true, participants: [...prev.participants, { name: "Nicolai", status: "aktiv" }] }))} className="w-full bg-rose-500 hover:bg-rose-600 text-white">
                Simuler venn aksepterer (For demo)
              </Button>
            )}
            {state.friendAccepted && (
              <Button onClick={() => {
                if (window.confirm('Er du sikker på at du vil gi opp challengen?')) {
                  resetApp()
                }
              }} variant="destructive" className="w-full bg-rose-500 hover:bg-rose-600 text-white">
                Jeg gir opp
              </Button>
            )}
          </div>
        )
      case 'rules':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-300">Regler</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-200">
              {challengeRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        )
      case 'rewards':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-300">Prestasjoner</h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4 ${achievement.completed ? '' : 'opacity-50'}`}>
                  <achievement.icon className={`h-10 w-10 ${achievement.completed ? achievement.color : 'text-gray-400'}`} />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'past-challenges':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-300">Tidligere Utfordringer</h2>
            <ul className="space-y-2">
              {pastChallenges.map((challenge, index) => (
                <li key={index} className={`p-2 rounded ${challenge.status === "Fullført" ? "bg-emerald-400 text-white" : "bg-red-400 text-white"}`}>
                  <div className="flex justify-between">
                    <span>{challenge.name}</span>
                    <span>{challenge.status}</span>
                  </div>
                  <div className="text-sm text-gray-200">{challenge.date}</div>
                </li>
              ))}
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-gray-100 to-rose-100 dark:from-gray-900 dark:via-rose-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl border-2 border-rose-400">
        <CardHeader className="bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold flex items-center cursor-pointer" onClick={resetApp}>
              <RefreshCw className="mr-2 h-6 w-6" />
              Reboot
            </CardTitle>
          </div>
          <CardDescription className="text-rose-100">Ta tilbake livet ditt, en dag om gangen</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 space-y-6 text-gray-800 dark:text-gray-200">
          {state.challengeStarted ? renderChallengeContent() : renderContent()}
        </CardContent>
        {state.challengeStarted && (
          <div className="flex justify-around items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-b-lg">
            <Button variant="ghost" onClick={() => setState(prev => ({ ...prev, currentTab: 'home' }))} className={state.currentTab === 'home' ? 'text-rose-600' : 'text-gray-800 dark:text-gray-200'}>
              <Home className="h-12 w-12" />
              <span className="sr-only">Utfordring</span>
            </Button>
            <Button variant="ghost" onClick={() => setState(prev => ({ ...prev, currentTab: 'rules' }))} className={state.currentTab === 'rules' ? 'text-rose-600' : 'text-gray-800 dark:text-gray-200'}>
              <BookOpen className="h-12 w-12" />
              <span className="sr-only">Regler</span>
            </Button>
            <Button variant="ghost" onClick={() => setState(prev => ({ ...prev, currentTab: 'rewards' }))} className={state.currentTab === 'rewards' ? 'text-rose-600' : 'text-gray-800 dark:text-gray-200'}>
              <Trophy className="h-12 w-12" />
              <span className="sr-only">Prestasjoner</span>
            </Button>
            <Button variant="ghost" onClick={() => setState(prev => ({ ...prev, currentTab: 'past-challenges' }))} className={state.currentTab === 'past-challenges' ? 'text-rose-600' : 'text-gray-800 dark:text-gray-200'}>
              <Clock className="h-12 w-12" />
              <span className="sr-only">Tidligere Utfordringer</span>
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}