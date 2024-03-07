import { BrowserRouter, Routes, Route } from "react-router-dom"
import List from "./pages/ListPage/List"
import Statistics from "./pages/statistics"
import Setting from "./pages/SettingPage/Setting"
import Header from "./component/Header"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  )
}
