// import './App.css';
import './app.scss'
import Login from './components/login/login'
import Auth from "./context/Auth";
import Home from "./components/home/home"
function App() {
  return (
    <div className="App">
      <Auth>
        <Login />
        <Home />
      </Auth>
    </div>
  );
}

export default App;
