function CloseButton({removeItem}) {
    return (
        <span
        className='close'
        onClick={removeItem}
        >x</span>
    );
}

export default CloseButton;