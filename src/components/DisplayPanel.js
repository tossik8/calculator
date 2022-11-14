import { useSelector } from "react-redux/es/exports";

const DisplayPanel = () => {
    const equation = useSelector(state => state.displayReducer.values);
    return (
         <div>
            <p>{equation.join(" ")}</p>
         </div>
    );
}

export default DisplayPanel;
