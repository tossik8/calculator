import { useSelector, useDispatch } from "react-redux";
import { displayActions } from "../store/displaySlice";
import { inputActions } from "../store/inputSlice";

const InputPanel = () => {
    const dispatch = useDispatch();
    const inputValue = useSelector(state => state.inputReducer.value);

    const handleChange = (event) =>{
        let content = event.target.value;
        let lastCharacter = content.charAt(content.length-1);
        if((!isNaN(content) || lastCharacter === "*"|| lastCharacter === "/ "|| lastCharacter === "+"|| lastCharacter === "-"|| lastCharacter === ".") && lastCharacter!==" "){
            dispatch(inputActions.handleInput(content));
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
                dispatch(displayActions.handleInput(content));
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
