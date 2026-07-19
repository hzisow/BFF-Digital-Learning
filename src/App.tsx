import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import LessonsIndex from './pages/LessonsIndex'
import LessonPage from './pages/LessonPage'
import ActivitiesIndex from './pages/ActivitiesIndex'
import GlossaryPage from './pages/GlossaryPage'
import CertificatePage from './pages/CertificatePage'
import PracticePage from './pages/PracticePage'
import JoinPage from './pages/student/JoinPage'
import StudentHome from './pages/student/StudentHome'
import BensBudget from './activities/bens-budget/BensBudget'
import BensInsurance from './activities/bens-insurance/BensInsurance'
import PaystubDetective from './activities/paystub/PaystubDetective'
import CreditScoreSim from './activities/credit-sim/CreditScoreSim'
import ScamSpotter from './activities/scam-spotter/ScamSpotter'
import SmartShopper from './activities/smart-shopper/SmartShopper'
import GoalGetter from './activities/goal-getter/GoalGetter'
import QuizHost from './activities/quiz/QuizHost'
import QuizPlay from './activities/quiz/QuizPlay'
import WolfHome from './activities/wolf/WolfHome'
import WolfSolo from './activities/wolf/WolfSolo'
import WolfPlayer from './activities/wolf/WolfPlayer'
import WolfHost from './activities/wolf/WolfHost'
import TeamAuth from './pages/admin/TeamAuth'
import AdminDashboard from './pages/admin/AdminDashboard'
import ClassroomDetail from './pages/admin/ClassroomDetail'
import AccountPage from './pages/admin/AccountPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/lessons" element={<LessonsIndex />} />
        <Route path="/lessons/:slug" element={<LessonPage />} />
        <Route path="/activities" element={<ActivitiesIndex />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/certificate" element={<CertificatePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/join" element={<JoinPage />} />
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
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* Full-screen routes (no site chrome): live game screens */}
      <Route path="/play/:code" element={<WolfPlayer />} />
      <Route path="/host/:sessionId" element={<WolfHost />} />
      <Route path="/quiz/:code" element={<QuizPlay />} />
      <Route path="/quiz-host/:sessionId" element={<QuizHost />} />
    </Routes>
  )
}
