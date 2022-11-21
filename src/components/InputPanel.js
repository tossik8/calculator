import { useSelector} from "react-redux";
import "./InputPanel.css";

const InputPanel = () => {
    const inputValue = useSelector(state => state.inputReducer.value);

    return (
         <div className="input-div">
            <input id="input" value={inputValue} readOnly={"readonly"} placeholder="0"  type="text"/>
        </div>
    );
}

export default InputPanel;
