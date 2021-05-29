function FormInput(props) {
    return (
        <input
            className={props.className}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onBlur={props.onBlur}
            name={props.name}
            value={props.value}
        />
    );
}

export default FormInput;