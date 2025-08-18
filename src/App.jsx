import RootRoutes from "@/routes";
import { BrowserRouter as Router } from "react-router-dom";

import "@/css/base.css";
import "@/css/design-system.css";
import "@/css/layout.css";
import "@/css/component.css";
import "@/css/forms-modern.css";
import "@/css/icons.css";
import "@/css/page.css";
import "@/css/response.css";
import "@/css/responsive-modern.css";

function App() {
  return (
    <div className="wrap">
      <Router>
        <RootRoutes />
      </Router>
    </div>
  );
}

export default App;
