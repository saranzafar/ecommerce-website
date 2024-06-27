import "./App.css";
import { Outlet } from 'react-router-dom'
import { Header, Footer } from "./pages/index";

function App() {

  return (
    <div className="App">
      <main>
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default App