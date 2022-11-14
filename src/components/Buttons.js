import Button from "./Button";
import {data} from "../data/data";
const Buttons = () => {
    return (
        <ul>
            {data.map(value => <Button key={value.id} data={value}/>)}
        </ul>
     );
}

export default Buttons;
