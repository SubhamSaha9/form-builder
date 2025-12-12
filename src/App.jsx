import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Form from "./components/core/Dashboard/Form";
import EditForm from "./pages/EditForm";
import AiForm from "./pages/AiForm";
import Response from "./components/core/Dashboard/Response";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<Dashboard />}>
          <Route path="/dashboard/forms" element={<Form />} />
        </Route>
        <Route path="/edit-form/:formId" element={<EditForm />} />
        <Route path="/ai-form/:formId" element={<AiForm />} />
      </Routes>
    </div>
  );
}

export default App;
