import { useDispatch, useSelector } from "react-redux";
import { inputActions } from "../store/inputSlice";
import { displayActions } from "../store/displaySlice";

const Button = (props) => {
    const dispatch = useDispatch();
    const equation = useSelector(state => state.displayReducer.equation);
    const isEmpty = useSelector(state => state.displayReducer.isEmpty);
    const isDecimal = useSelector(state => state.displayReducer.isDecimal);

    function isSymbol(char){
        return char === "*" || char === "/" || char==="-" || char === "+";
    }

    const handleClick = () =>{
        let content = document.getElementById("input").value + props.data.value;
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
        else if(lastCharacter === "C"){
            dispatch(displayActions.clearInput());
            dispatch(inputActions.handleInput(""));
            document.getElementById("input").focus();
        }
    }
    return (
         <li>
            <button id={props.data.id} onClick={handleClick}>{props.data.value}</button>
         </li>
    );
}

export default Button;
