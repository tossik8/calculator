import { useDispatch } from 'react-redux';
import './App.css';
import Buttons from './components/Buttons';
import DisplayPanel from './components/DisplayPanel';
import InputPanel from './components/InputPanel';
import { displayActions } from './store/displaySlice';

function App() {
  const dispatch = useDispatch();
  const solveEquation = (equation) => {
    let equationCopy = parseInput(equation);
    let res = "="
    if(/\/0$|\/0[-+/*]/.test(equationCopy)){
      res += "infinity";
    }
    else{}

    return equationCopy;
  }
  function isSymbol(symbol){
    return symbol === "*" || symbol === "-" || symbol === "+" || symbol === "/";
  }
  function parseInput(equationCopy){
    if(isSymbol(equationCopy.charAt(equationCopy.length - 1)) && isSymbol(equationCopy.charAt(equationCopy.length - 2))){
      equationCopy = equationCopy.substring(0, equationCopy.length - 2);
    }
    else if(equationCopy.charAt(equationCopy.length - 1) === "." || isSymbol(equationCopy.charAt(equationCopy.length - 1))) {
      equationCopy = equationCopy.substring(0, equationCopy.length - 1);
    }
    for(let index = equationCopy.indexOf("."); index !== -1;){
      if(isSymbol(equationCopy.charAt(index + 1))){
        equationCopy = equationCopy.substring(0, index) + equationCopy.substring(index+1);
      }
      index = equationCopy.indexOf(".", index+1);
    }
    equationCopy = equationCopy.replace("-0", "0");
    return equationCopy;
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
