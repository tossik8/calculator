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
    else{

    }

    return equationCopy;
  }
  function isSymbol(symbol){
    return symbol === "*" || symbol === "-" || symbol === "+" || symbol === "/";
  }
  function removeDecimalPoints(equationCopy){
    if(equationCopy.charAt(equationCopy.length - 1) === ".") equationCopy = equationCopy.substring(0, equationCopy.length - 1);
    for(let index = equationCopy.indexOf("."); index !== -1;){
      if(isSymbol(equationCopy.charAt(index + 1))){
        equationCopy = equationCopy.substring(0, index) + equationCopy.substring(index+1);
      }
      index = equationCopy.indexOf(".", index+1);
    }
    return equationCopy;
  }
  function parseInput(equationCopy){
    if(isSymbol(equationCopy.charAt(equationCopy.length - 1)) && isSymbol(equationCopy.charAt(equationCopy.length - 2))){
      equationCopy = equationCopy.substring(0, equationCopy.length - 2);
    }
    else if(isSymbol(equationCopy.charAt(equationCopy.length - 1))) {
      equationCopy = equationCopy.substring(0, equationCopy.length - 1);
    }

    equationCopy = removeDecimalPoints(equationCopy);
    let symbol = false;
    for(let i = 0; i < equationCopy.length; ++i){
      let char = equationCopy.charAt(i);
      if(isSymbol(char) && !symbol){
        symbol=true;
      }
      else if(isSymbol(char) && symbol){
        equationCopy = equationCopy.substring(0, i - 1) + " " + equationCopy.charAt(i-1) + " "+ equationCopy.substring(i);
        i+=2;
        symbol = false;
      }
      else if(!isSymbol(char) && char !== "."  && symbol){
        equationCopy = equationCopy.substring(0, i - 1) + " " + equationCopy.charAt(i-1) + " " + equationCopy.substring(i);
        symbol = false;
        i+=2;
      }
    }
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
