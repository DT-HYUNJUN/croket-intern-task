import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskOne from "./components/TaskOne";
import Home from "./components/Home";
import TaskTwo from "./components/TaskTwo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="task/1" element={<TaskOne />} />
        <Route path="task/2" element={<TaskTwo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
