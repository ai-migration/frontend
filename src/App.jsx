import RootRoutes from "@/routes";
import { BrowserRouter as Router } from "react-router-dom";
import "@/index.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <RootRoutes />
      </Router>
    </div>
  );
}

export default App;
