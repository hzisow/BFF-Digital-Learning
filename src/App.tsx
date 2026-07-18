import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import LessonsIndex from './pages/LessonsIndex'
import LessonPage from './pages/LessonPage'
import ActivitiesIndex from './pages/ActivitiesIndex'
import JoinPage from './pages/student/JoinPage'
import StudentHome from './pages/student/StudentHome'
import BensBudget from './activities/bens-budget/BensBudget'
import BensInsurance from './activities/bens-insurance/BensInsurance'
import WolfHome from './activities/wolf/WolfHome'
import WolfSolo from './activities/wolf/WolfSolo'
import WolfPlayer from './activities/wolf/WolfPlayer'
import WolfHost from './activities/wolf/WolfHost'
import TeamAuth from './pages/admin/TeamAuth'
import AdminDashboard from './pages/admin/AdminDashboard'
import ClassroomDetail from './pages/admin/ClassroomDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/lessons" element={<LessonsIndex />} />
        <Route path="/lessons/:slug" element={<LessonPage />} />
        <Route path="/activities" element={<ActivitiesIndex />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/challenge/bens-budget" element={<BensBudget />} />
        <Route path="/challenge/bens-insurance" element={<BensInsurance />} />
        <Route path="/wolf" element={<WolfHome />} />
        <Route path="/wolf/solo" element={<WolfSolo />} />
        <Route path="/team" element={<TeamAuth />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/class/:id" element={<ClassroomDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* Full-screen routes (no site chrome): live game screens */}
      <Route path="/play/:code" element={<WolfPlayer />} />
      <Route path="/host/:sessionId" element={<WolfHost />} />
    </Routes>
  )
}
