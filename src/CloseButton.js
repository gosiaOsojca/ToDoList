function CloseButton({removeItem}) {
    return (
        <button
        className='close'
        onClick={removeItem}
        >x</button>
    );
}

export default CloseButton;