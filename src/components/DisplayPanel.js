import { useSelector } from "react-redux/es/exports";
import "./DisplayPanel.css";

const DisplayPanel = () => {
    const equation = useSelector(state => state.displayReducer.equation);
    return (
         <div className="displayPanel">
            <p className="display">{equation}</p>
         </div>
    );
}

export default DisplayPanel;
