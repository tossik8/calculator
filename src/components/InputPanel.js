import { useSelector, useDispatch } from "react-redux";
import { displayActions } from "../store/displaySlice";
import { inputActions } from "../store/inputSlice";

const InputPanel = () => {
    const dispatch = useDispatch();
    const inputValue = useSelector(state => state.inputReducer.value);
    const equation = useSelector(state => state.displayReducer.equation);

    const handleChange = (event) =>{
        let content = event.target.value;
        let lastCharacter = content.charAt(content.length-1);
        if((!isNaN(lastCharacter) || lastCharacter === "*" || lastCharacter === "/" || lastCharacter === "+" || lastCharacter === "-" || lastCharacter === ".") && lastCharacter!==" "){
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
                if(content.charAt(content.length-2) === "+" ||
                  content.charAt(content.length-2) === "/" ||
                  content.charAt(content.length-2) === "*" ||
                  content.charAt(content.length-2) === "-"){
                    dispatch(displayActions.handleInput(lastCharacter));
                    dispatch(inputActions.handleInput(lastCharacter));
                }

                else{
                    dispatch(inputActions.handleInput(content));
                    dispatch(displayActions.handleInput(lastCharacter));
                }
            }
            else{
                if(equation !== ""){

                    if(!isNaN(content.charAt(content.length-2))){

                        dispatch(displayActions.handleInput(lastCharacter));
                        dispatch(inputActions.handleInput(lastCharacter));
                    }
                    else if(isNaN(content.charAt(content.length-2)) && lastCharacter !== "-"){

                    }
                    else if(isNaN(content.charAt(content.length-2)) && lastCharacter === "-"){
                        if(!isNaN(equation.charAt(equation.length - 2))){
                            dispatch(displayActions.handleInput(lastCharacter));
                            dispatch(inputActions.handleInput(lastCharacter));
                        }

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
