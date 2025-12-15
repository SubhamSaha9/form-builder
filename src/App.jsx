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
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={
            <OpenRoute>
              <Auth />
            </OpenRoute>
          }
        />
        <Route element={<Dashboard />}>
          <Route
            path="/dashboard/forms"
            element={
              <PrivateRoute>
                <Form />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/responses"
            element={
              <PrivateRoute>
                <Response />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/edit-form/:formId"
          element={
            <PrivateRoute>
              <EditForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/ai-form/:formId"
          element={
            <PrivateRoute>
              <AiForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
