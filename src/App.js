import "./App.scss";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Chat from "./components/Chat/Chat";
import ProtectedRoute from "./components/Router/ProtectedRoute";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSmile, faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSmile,
  faImage,
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/404" element={<h1>Choose the correct path</h1>} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
