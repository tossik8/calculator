const Button = (props) => {

    const handleClick = () =>{
        let content = document.getElementById("input").value + props.data.value;
        let lastCharacter = content.charAt(content.length-1);
        props.getInput(content, lastCharacter)
    }
    return (
         <li>
            <button id={props.data.id} onClick={handleClick}>{props.data.value}</button>
         </li>
    );
}

export default Button;
