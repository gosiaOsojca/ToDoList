import CloseButton from './CloseButton';

function Item(props) {
    return (
        <li className={props.className}>
            <span
                onClick={props.onClick}
                className='list__item-span'>{props.content}
            </span>
            <CloseButton removeItem={props.removeItem} />
        </li>
    );
}

export default Item;