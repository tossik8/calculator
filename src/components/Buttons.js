import Button from "./Button";
import {data} from "../data/data";
import "./Buttons.css";
const Buttons = (props) => {
    return (
        <ul>
            {data.map(value => <Button key={value.id} getInput={props.getInput} solveEquation={props.solveEquation} data={value}/>)}
        </ul>
     );
}

export default Buttons;
