import { useSelector, useDispatch } from "react-redux";
import { displayActions } from "../store/displaySlice";
import { inputActions } from "../store/inputSlice";

const InputPanel = () => {
    const dispatch = useDispatch();
    const inputValue = useSelector(state => state.inputReducer.value);

    const handleChange = (event) =>{
        dispatch(inputActions.handleInput(event.target.value));
        let content = event.target.value;
        if(content.length === 22 && !isNaN(content.at(content.length -1))){
            dispatch(inputActions.handleInput("Digimit Limit Met"));
            document.getElementById("input").disabled = true;
            setTimeout(() => {
                document.getElementById("input").value = content.substring(0, 21);
                document.getElementById("input").focus();
            }, 1000);
            document.getElementById("input").disabled = false;

        }
    }

    return (
         <div>
            <input id="input" value={inputValue} onChange={handleChange} placeholder="0" type="text"/>
        </div>
    );
}

export default InputPanel;
