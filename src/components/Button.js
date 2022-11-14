const Button = (props) => {
    return (
         <li>
            <button id={props.data.id}>{props.data.value}</button>
         </li>
    );
}

export default Button;
