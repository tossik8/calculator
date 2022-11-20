import { useSelector, useDispatch } from "react-redux";
import { displayActions } from "../store/displaySlice";
import { inputActions } from "../store/inputSlice";
import { useEffect } from "react";

const InputPanel = (props) => {
    const dispatch = useDispatch();
    const inputValue = useSelector(state => state.inputReducer.value);

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
        props.getInput(content, lastCharacter);
    }


    return (
         <div>
            <input id="input" value={inputValue} onChange={handleChange} placeholder="0" type="text"/>
        </div>
    );
}

export default InputPanel;
