import { useDispatch } from 'react-redux';
import './App.css';
import Buttons from './components/Buttons';
import DisplayPanel from './components/DisplayPanel';
import InputPanel from './components/InputPanel';
import { displayActions } from './store/displaySlice';

function App() {
  const dispatch = useDispatch();
  const solveEquation = (equation) => {
    return equation;
  }
  return (
    <div className="App">
        <DisplayPanel/>
        <InputPanel solveEquation={solveEquation}/>
        <Buttons solveEquation={solveEquation}/>
    </div>
  );
}

export default App;
