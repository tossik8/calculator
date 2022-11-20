import './App.css';
import Buttons from './components/Buttons';
import DisplayPanel from './components/DisplayPanel';
import InputPanel from './components/InputPanel';
import Stack from './stack';

function App() {
  const solveEquation = (equation) => {
    if(equation.includes("Infinity")) return "Infinity";
    let equationCopy = parseInput(equation);
    let stack = new Stack();
    let postfixString = "";
    let values = equationCopy.split(" ");
    for(let i = 0; i <values.length; ++i){
      if(!isSymbol(values[i])){
        postfixString+=values[i] + " ";
      }
      else if(values[i] === "+" || values[i] === "-"){
        if(!stack.isEmpty()){
          while(!stack.isEmpty()){
            postfixString += stack.peek() + " ";
            stack.pop();
          }
        }
        stack.push(values[i]);
      }
      else if(values[i] === "*" || values[i] === "/"){
        while(stack.peek() === "*" || stack.peek()=== "/"){
          postfixString+=stack.peek() + " ";
          stack.pop();
        }
        stack.push(values[i]);
      }
    }
    while(!stack.isEmpty()){
      postfixString+= stack.peek() + " ";
      stack.pop();
    }
    postfixString = postfixString.substring(0, postfixString.length-1);
    values = postfixString.split(" ");
    for(let i = 0; i < values.length; ++i){
      if(values[i] === "-"){
        let value2 = stack.peek();
        stack.pop();
        let value1 = stack.peek();
        stack.pop();
        stack.push(value1 - value2);
      }
      else if(values[i] === "/"){
        let value2 = stack.peek();
        stack.pop();
        let value1 = stack.peek();
        stack.pop();
        stack.push(value1 / value2);
      }
      else if(values[i] === "*"){
        let value2 = stack.peek();
        stack.pop();
        let value1 = stack.peek();
        stack.pop();
        stack.push(value1 * value2);
      }
      else if(values[i] === "+"){
        let value2 = stack.peek();
        stack.pop();
        let value1 = stack.peek();
        stack.pop();
        stack.push(value1 + value2);
      }
      else {
        stack.push(parseFloat(values[i]));
      }
    }
    let calculation = stack.peek();
    stack.pop();
    return calculation;
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
      if(isSymbol(char) && i !== 0 && !symbol){
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
