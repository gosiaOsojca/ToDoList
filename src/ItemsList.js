import Item from './Item';

function ItemsList({ items, removeItem, changeItemStatus }) {
    return (
        <div className='content'>
            <ul className='list' id='list'>
                {items.map(item => {
                    return (
                        <Item
                            className={`list__item` + (item.isChecked ? ' list__item--checked' : ' rhyryh')}
                            content={item.value}
                            key={item.value}
                            removeItem={removeItem}
                            onClick={() => changeItemStatus(item)}
                        />
                    )
                })}
            </ul>
        </div>
    );
}

export default ItemsList;