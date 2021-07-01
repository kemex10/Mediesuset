import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { Footer } from './components/Footer/Footer';
import { FrontPage } from './pages/FrontPage/FrontPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MySchedule } from './pages/MySchedule/MySchedule';
import { useEffect, useState } from 'react';

function App() {

  const [loginData, setLoginData] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoginData(JSON.parse(sessionStorage.getItem('token')))
    }
  }, [])

  return (
    <Router>
      <Navigation loginData={loginData} setLoginData={setLoginData} />

      <Switch>
        <Route exact path="/">
          <FrontPage />
        </Route>

        <Route path="/koeb-billet">
          <p>Køb billet</p>
        </Route>

        <Route path="/events">
          <p>Events</p>
        </Route>

        <Route path="/camps">
          <p>Camps</p>
        </Route>

        <Route path="/praktisk-info">
          <p>Praktisk Info</p>
        </Route>

        <Route path="/login/mit-program">
          <MySchedule />
        </Route>

        <Route path="/login">
          <LoginPage loginData={loginData} setLoginData={setLoginData} />
        </Route>

        <Route path="/">
          <p>404 - siden findes ikke.</p>
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;