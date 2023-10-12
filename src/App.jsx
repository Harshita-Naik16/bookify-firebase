import { Outlet } from "react-router-dom";
import MyNavbar from "./components/Navbar";

function App() {
  return (
    <div>
      <MyNavbar />
      <Outlet />
    </div>
  );
}

export default App;
