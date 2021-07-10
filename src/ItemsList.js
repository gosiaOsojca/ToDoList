import Item from './Item';

function ItemsList({ items, removeItem, changeItemStatus }) {
    return (
        <div className='content'>
            <ul className='list'>
                {items.map(item => {
                    return (
                        <Item
                            className={`list__item` + (item.isChecked ? ' list__item--checked' : '')}
                            content={item.value}
                            key={item.value}
                            removeItem={() => removeItem(item)}
                            onClick={() => changeItemStatus(item)}
                        />
                    )
                })}
            </ul>
        </div>
    );
}

export default ItemsList;