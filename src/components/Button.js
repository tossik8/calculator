import "./Button.css";

const Button = (props) => {

    const handleClick = () =>{
        let content = document.getElementById("input").value + props.data.value;
        let lastCharacter = content.charAt(content.length-1);
        props.getInput(content, lastCharacter)
    }
    const isOperator = (value) => {
        return value === "*" || value === "+" || value === "/" || value === "-";
    }
    const isEqual = (value)=>{
        return value === "=";
    }
    const isClear = (value) =>{
        return value === "AC";
    }
    return (

            <button id={props.data.id} className={isOperator(props.data.value)? "operator button": isEqual(props.data.value)? "equal button" : isClear(props.data.value)? "clear button": "number button"} onClick={handleClick}>{props.data.value}</button>

    );
}

export default Button;
