import CloseButton from './CloseButton';

function Item(props) {
    return (
        <li
            className={props.className}
        >
            <span
                className='list__item-span'
                onClick={props.onClick}
            >{props.content}
            </span>
            <CloseButton removeItem={props.removeItem} />
        </li>
    );
}

export default Item;