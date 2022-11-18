import Button from "./Button";
import {data} from "../data/data";
const Buttons = (props) => {
    return (
        <ul>
            {data.map(value => <Button key={value.id} solveEquation={props.solveEquation} data={value}/>)}
        </ul>
     );
}

export default Buttons;
