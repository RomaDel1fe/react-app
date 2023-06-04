import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Container from './components/Container/Container';
import Sidebar from './components/Sidebar/Sidebar'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className='Wrapper'>
          <Sidebar/>
            <Container/>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
