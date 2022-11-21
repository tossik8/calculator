import Button from "./Button";
import {data} from "../data/data";
import "./Buttons.css";
const Buttons = (props) => {
    return (
        <div className="buttons">
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[0]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[1]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[2]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[3]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[4]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[5]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[6]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[7]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[8]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[9]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[10]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[11]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[12]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[13]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[14]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[15]}/>
            <Button  getInput={props.getInput} solveEquation={props.solveEquation} data={data[16]}/>

        </div>
     );
}

export default Buttons;
