import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/chats" element={<Chatpage />} />
          </Routes>
        </ChatProvider>
      </Router>
    </div>
  );
}

export default App;
