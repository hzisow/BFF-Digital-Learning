import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import { FullscreenFallback, LessonFallback } from './components/RouteFallback'
import { routeChunks } from './lib/routeChunks'

// Every route below the landing page is code-split (see src/lib/routeChunks.ts).
// Landing, Layout, and NotFound stay in the first download: Landing is what most
// visitors see first, and lazily loading the thing you are already looking at
// only adds a round-trip.
//
// The Suspense boundary for Layout routes lives inside Layout itself, wrapped
// around <Outlet />, so the header and footer stay painted while a page loads.
// Routes that render their own full-screen chrome carry their own boundary here.

const LessonsIndex = lazy(routeChunks.lessons)
const LessonPage = lazy(routeChunks.lesson)
const ActivitiesIndex = lazy(routeChunks.activities)
const GlossaryPage = lazy(routeChunks.glossary)
const CertificatePage = lazy(routeChunks.certificate)
const PracticePage = lazy(routeChunks.practice)
const AIPractice = lazy(routeChunks.aiPractice)
const MoneyCoach = lazy(routeChunks.coach)
const JoinPage = lazy(routeChunks.join)
const StudentHome = lazy(routeChunks.student)
const LiveJoin = lazy(routeChunks.liveJoin)

const BensBudget = lazy(routeChunks.bensBudget)
const BensInsurance = lazy(routeChunks.bensInsurance)
const PaystubDetective = lazy(routeChunks.paystub)
const CreditScoreSim = lazy(routeChunks.creditSim)
const ScamSpotter = lazy(routeChunks.scamSpotter)
const SmartShopper = lazy(routeChunks.smartShopper)
const GoalGetter = lazy(routeChunks.goalGetter)

const WolfHome = lazy(routeChunks.wolfHome)
const WolfSolo = lazy(routeChunks.wolfSolo)
const WolfPlayer = lazy(routeChunks.wolfPlayer)
const WolfHost = lazy(routeChunks.wolfHost)
const QuizPlay = lazy(routeChunks.quizPlay)
const QuizHost = lazy(routeChunks.quizHost)
const CoPlayPlayer = lazy(routeChunks.coPlayPlayer)
const CoPlayHost = lazy(routeChunks.coPlayHost)

const TeamAuth = lazy(routeChunks.team)
const AdminDashboard = lazy(routeChunks.admin)
const ClassroomDetail = lazy(routeChunks.adminClass)
const LessonPlanGenerator = lazy(routeChunks.adminGenerate)
const AccountPage = lazy(routeChunks.account)

/** Wrap a full-screen route in its own loading boundary. */
function Fullscreen({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<FullscreenFallback />}>{children}</Suspense>
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/lessons" element={<LessonsIndex />} />
        <Route path="/activities" element={<ActivitiesIndex />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/certificate" element={<CertificatePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/practice/ai" element={<AIPractice />} />
        <Route path="/coach" element={<MoneyCoach />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/game" element={<LiveJoin />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/challenge/bens-budget" element={<BensBudget />} />
        <Route path="/challenge/bens-insurance" element={<BensInsurance />} />
        <Route path="/challenge/paystub-detective" element={<PaystubDetective />} />
        <Route path="/challenge/credit-score" element={<CreditScoreSim />} />
        <Route path="/challenge/scam-spotter" element={<ScamSpotter />} />
        <Route path="/challenge/smart-shopper" element={<SmartShopper />} />
        <Route path="/challenge/goal-getter" element={<GoalGetter />} />
        <Route path="/wolf" element={<WolfHome />} />
        <Route path="/wolf/solo" element={<WolfSolo />} />
        <Route path="/team" element={<TeamAuth />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/class/:id" element={<ClassroomDetail />} />
        <Route path="/admin/generate" element={<LessonPlanGenerator />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* Focused module route (own chrome, no global header/footer): the lesson canvas */}
      <Route
        path="/lessons/:slug"
        element={
          <Suspense fallback={<LessonFallback />}>
            <LessonPage />
          </Suspense>
        }
      />
      {/* Full-screen routes (no site chrome): live game screens */}
      <Route path="/play/:code" element={<Fullscreen><WolfPlayer /></Fullscreen>} />
      <Route path="/host/:sessionId" element={<Fullscreen><WolfHost /></Fullscreen>} />
      <Route path="/quiz/:code" element={<Fullscreen><QuizPlay /></Fullscreen>} />
      <Route path="/quiz-host/:sessionId" element={<Fullscreen><QuizHost /></Fullscreen>} />
      <Route path="/coplay/:code" element={<Fullscreen><CoPlayPlayer /></Fullscreen>} />
      <Route path="/coplay-host/:sessionId" element={<Fullscreen><CoPlayHost /></Fullscreen>} />
    </Routes>
  )
}
