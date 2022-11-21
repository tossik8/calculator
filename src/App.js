import './App.css';
import Buttons from './components/Buttons';
import DisplayPanel from './components/DisplayPanel';
import InputPanel from './components/InputPanel';
import { inputActions } from './store/inputSlice';
import { displayActions } from './store/displaySlice';
import { useDispatch, useSelector } from 'react-redux';
import Stack from './stack';

function App() {
  const dispatch = useDispatch();
  let equation = useSelector(state => state.displayReducer.equation);
  let isEmpty = useSelector(state => state.displayReducer.isEmpty);
  let isDecimal = useSelector(state => state.displayReducer.isDecimal);
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

  const getInput = (content, lastCharacter) =>{
    if(lastCharacter === "=" && !equation.includes("=") && equation !== "" && equation !== "."){
      let res = solveEquation(equation) + "";
      dispatch(inputActions.handleInput(res));
      dispatch(displayActions.handleInput("="+res));
      return;
  }
  if(equation.includes("=")){
      dispatch(displayActions.clearInput());
      if(!isSymbol(lastCharacter)){
          dispatch(inputActions.handleInput(""));
          content=lastCharacter;
          if(lastCharacter===".") dispatch(displayActions.handleDecimal(true));
          if(lastCharacter === "0" || lastCharacter === "."){
              dispatch(displayActions.handleInput(lastCharacter));
              dispatch(inputActions.handleInput(lastCharacter));
              dispatch(displayActions.handleEmpty(false));
              return;
          }
      }
      else{
          equation = equation.substring(equation.indexOf("=")+1);
          dispatch(displayActions.handleInput(equation));
          dispatch(displayActions.handleEmpty(false));
      }

  }
  if((!isNaN(lastCharacter) || isSymbol(lastCharacter) || lastCharacter === ".") && lastCharacter!==" "){
      if((content.length >= 22 && !isNaN(lastCharacter))){
          let buttons = document.getElementsByClassName("button");
          for(let button of buttons){
            button.disabled = true;
          }
          dispatch(inputActions.handleInput("Digimit Limit Met"));
          setTimeout(() => {
              dispatch(inputActions.handleInput(content.substring(0, 21)));
              for(let button of buttons){
                button.removeAttribute("disabled");
              }
              document.getElementById("input").focus();
          }, 1000);
      }

      else if(!isNaN(lastCharacter)){

          if(isEmpty && lastCharacter === '0'){
              dispatch(displayActions.handleInput(lastCharacter));
              dispatch(inputActions.handleInput(lastCharacter));
          }
          else if(!isEmpty && content.charAt(0) === "0" && lastCharacter === "0" && !isDecimal){}
          else if(!isEmpty && !isDecimal && content.charAt(content.length - 2) === "0" && content.length <= 2 && lastCharacter !== "0"){
              dispatch(displayActions.changeZero(equation.substring(0, equation.length - 1) + lastCharacter));
              dispatch(inputActions.handleInput(lastCharacter));
          }
          else if(isSymbol(content.charAt(content.length-2))){
              dispatch(displayActions.handleInput(lastCharacter));
              dispatch(inputActions.handleInput(lastCharacter));
          }

          else{
              dispatch(inputActions.handleInput(content));
              dispatch(displayActions.handleInput(lastCharacter));

          }
          dispatch(displayActions.handleEmpty(false));

      }
      else if(lastCharacter === "."){
          if(isEmpty){
              dispatch(displayActions.handleInput("0."));
              dispatch(inputActions.handleInput("0."));
              dispatch(displayActions.handleEmpty(false));
          }
          else if(!isDecimal){
              if(!isNaN(equation.charAt(equation.length - 1))){
                  dispatch(displayActions.handleInput(lastCharacter));
                  dispatch(inputActions.handleInput(content));
              }
              else{
                  dispatch(displayActions.handleInput("0."));
                  dispatch(inputActions.handleInput("0."));
              }
          }
          dispatch(displayActions.handleDecimal(true));


      }

      else{
          if(equation === "" && lastCharacter === "-"){
              dispatch(displayActions.handleInput(lastCharacter));
              dispatch(inputActions.handleInput(lastCharacter));
          }
          else if(!isEmpty){
              dispatch(displayActions.handleDecimal(false));
              if(!isSymbol(content.charAt(content.length-2)) || content.charAt(content.length-2) === "." ){
                  dispatch(displayActions.handleInput(lastCharacter));
                  dispatch(inputActions.handleInput(lastCharacter));
              }

              else if(isSymbol(equation.charAt(equation.length-2)) && equation.charAt(equation.length-2) !== "." && lastCharacter !== "-" ){
                  dispatch(displayActions.changeSign(equation.substring(0, equation.length - 2) + lastCharacter));
                  dispatch(inputActions.handleInput(lastCharacter));
              }
              else if(isSymbol(equation.charAt(equation.length-1)) && equation.charAt(equation.length-2) === "." && lastCharacter === "-"){
                  dispatch(displayActions.handleInput(lastCharacter));
                  dispatch(inputActions.handleInput(lastCharacter));
              }
              else if(isSymbol(content.charAt(content.length-2)) && lastCharacter === "-"){
                  if(!isSymbol(equation.charAt(equation.length - 2))){
                      dispatch(displayActions.handleInput(lastCharacter));
                      dispatch(inputActions.handleInput(lastCharacter));
                  }

              }
              else if(isSymbol(equation.charAt(equation.length - 1))){
                  dispatch(displayActions.changeSign(equation.substring(0, equation.length - 1) + lastCharacter));
                  dispatch(inputActions.handleInput(lastCharacter));
              }
          }
      }
  }
  else if(lastCharacter==="C"){
    dispatch(displayActions.clearInput());
    dispatch(inputActions.handleInput(""));
  }

  }
  return (
    <div className="App">
        <DisplayPanel/>
        <InputPanel/>
        <Buttons solveEquation={solveEquation} getInput={getInput}/>
    </div>
  );
}

export default App;
