import "./App.css";
import { Outlet } from 'react-router-dom'
import { Header, Footer } from "./pages/index";

function App() {

  return (
    <div className="App">
      <main className="w-full flex justify-center">
        <main className="container max-w-screen-xl px-6">
          <Header />
          <Outlet />
          <Footer />
        </main>
      </main>
    </div>
  );
}

export default App