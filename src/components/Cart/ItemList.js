import React from "react";
import style from './style.module.css';
import Item from './Item';

const ItemList = ({items, isLoad, loadError}) => {
    return (
        <div className={style.wrap}>
            {
                isLoad ? [1,2,3].map(id => {
                        return <Item key={id} skeleton={true}/>
                })
                : (loadError !== null) ? <div className={style.empty_block}>Error: {loadError}</div>
                : (items && Object.keys(items).length) ? Object.keys(items).map((id) => {
                    return <Item key={id} id={id} skeleton={false} data={items[id]}/>
                })
                : <div className={style.empty_block}>Sorry, your cart is empty :(</div>
            }
        </div>
    )
};

export default ItemList;