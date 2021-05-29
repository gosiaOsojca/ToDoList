function FormButton(props) {
    return (
        <button
            className={props.className}
            disabled={props.disabled}
            type='submit'
            onClick={props.onClick}
        >{props.name}</button>
    );
}

export default FormButton;