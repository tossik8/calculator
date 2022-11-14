import './App.css';
import Buttons from './components/Buttons';
import DisplayPanel from './components/DisplayPanel';
import InputPanel from './components/InputPanel';

function App() {
  return (
    <div className="App">
        <DisplayPanel/>
        <InputPanel/>
        <Buttons/>
    </div>
  );
}

export default App;
