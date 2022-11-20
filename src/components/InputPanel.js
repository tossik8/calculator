import { useSelector, useDispatch } from "react-redux";
import { displayActions } from "../store/displaySlice";
import { inputActions } from "../store/inputSlice";
import { useEffect } from "react";

const InputPanel = (props) => {
    const dispatch = useDispatch();
    const inputValue = useSelector(state => state.inputReducer.value);
    let equation = useSelector(state => state.displayReducer.equation);
    const isEmpty = useSelector(state => state.displayReducer.isEmpty);
    let isDecimal = useSelector(state => state.displayReducer.isDecimal);


    function isSymbol(char){
        return char === "*" || char === "/" || char==="-" || char === "+";
    }
    useEffect(() => {
        window.onkeydown = (event) =>{
            if(event.key=== "Escape"){
                dispatch(displayActions.clearInput());
                dispatch(inputActions.handleInput(""));
            }
            else if(event.keyCode === 8){
                event.preventDefault();
            }
        }
        document.getElementById("input").onpaste = (event) => event.preventDefault();
    });

    const handleChange = (event) =>{
        let content = event.target.value;
        let lastCharacter = content.charAt(content.length-1);
        if(lastCharacter === "=" && !equation.includes("=")){
            let res = props.solveEquation(equation);
            dispatch(inputActions.handleInput(res));
            dispatch(displayActions.handleInput("="+res));
            return;
        }

        if((!isNaN(lastCharacter) || isSymbol(lastCharacter) || lastCharacter === ".") && lastCharacter!==" "){
            if(content.length === 22 && !isNaN(lastCharacter)){
                dispatch(inputActions.handleInput("Digimit Limit Met"));
                document.getElementById("input").disabled = true;
                setTimeout(() => {
                    document.getElementById("input").value = content.substring(0, 21);
                    document.getElementById("input").focus();
                }, 1000);
                document.getElementById("input").disabled = false;
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
                    if(!isNaN(content.charAt(content.length-2)) || content.charAt(content.length-2) === "." ){
                        dispatch(displayActions.handleInput(lastCharacter));
                        dispatch(inputActions.handleInput(lastCharacter));
                    }

                    else if(isNaN(equation.charAt(equation.length-2)) && equation.charAt(equation.length-2) !== "." && lastCharacter !== "-" ){
                        dispatch(displayActions.changeSign(equation.substring(0, equation.length - 2) + lastCharacter));
                        dispatch(inputActions.handleInput(lastCharacter));
                    }
                    else if(isNaN(equation.charAt(equation.length-1)) && equation.charAt(equation.length-2) === "." && lastCharacter === "-"){
                        dispatch(displayActions.handleInput(lastCharacter));
                        dispatch(inputActions.handleInput(lastCharacter));
                    }
                    else if(isNaN(content.charAt(content.length-2)) && lastCharacter === "-"){
                        if(!isNaN(equation.charAt(equation.length - 2))){
                            dispatch(displayActions.handleInput(lastCharacter));
                            dispatch(inputActions.handleInput(lastCharacter));
                        }

                    }
                    else if(isNaN(equation.charAt(equation.length - 1))){
                        dispatch(displayActions.changeSign(equation.substring(0, equation.length - 1) + lastCharacter));
                        dispatch(inputActions.handleInput(lastCharacter));
                    }
                }
            }
        }

    }


    return (
         <div>
            <input id="input" value={inputValue} onChange={handleChange} placeholder="0" type="text"/>
        </div>
    );
}

export default InputPanel;
