
import { ThemeProvider } from "next-themes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Create from "./pages/Create";
import AIRecommendations from "./pages/AIRecommendations";
import UserProfile from "./pages/UserProfile";
import Wardrobes from "./pages/Wardrobes";
import Account from "./pages/Account";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create" element={<Create />} />
          <Route path="/ai-recommendations" element={<AIRecommendations />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/wardrobes" element={<Wardrobes />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
