import { useSelector } from "react-redux/es/exports";

const DisplayPanel = () => {
    const equation = useSelector(state => state.displayReducer.equation);
    return (
         <div>
            <p>{equation}</p>
         </div>
    );
}

export default DisplayPanel;
