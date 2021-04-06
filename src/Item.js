import CloseButton from './CloseButton';

function Item(props) {
    return (
        <li
            className={props.className}
            onClick={props.onClick}
        >
            <span
                className='list__item-span'>{props.content}
            </span>
            <CloseButton removeItem={props.removeItem} />
        </li>
    );
}

export default Item;