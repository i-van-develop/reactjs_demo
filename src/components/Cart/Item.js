import React from "react";
import {connect} from "react-redux";
import style from './style.module.css';
import { cartChangeItemCount, cartIncreaseItemCount, cartDecreaseItemCount, cartRemoveItem} from '../../redux/actions';
import removeLogo from './icons/remove.svg';

function validateNumberInput(e) {
    if (e.charCode < 48 || e.charCode > 57) {
        e.preventDefault();
    }
}

const Item = ({id, data, skeleton, cartChangeItemCount, cartIncreaseItemCount, cartDecreaseItemCount, cartRemoveItem}) => {
    return (
        <div className={style.item}>
            <div className={style.item_info}>
                <div className={style.item_image}>
                    { !skeleton ? <img src={data.url} alt={data.name} /> : ""}
                </div>
                <div className={style.item_signature}>
                    <div className={style.item_name}>{ !skeleton ? data.name : ""}</div>
                    <div className={style.item_description}>{ !skeleton ? data.description : ""}</div>
                </div>
            </div>
            <div className={style.purchase_info}>
                {
                    !skeleton ?
                    <div className={style.purchase_counter}>
                        <div onClick={() => cartDecreaseItemCount(id)} className={style.purchase_counter_decrease}>-</div>
                        <input name={`item_count[${id}]`} onKeyPress={e => validateNumberInput(e)} onChange={e => cartChangeItemCount(id, e.target.value)} className={style.purchase_counter_input} value={data.count} />
                        <div onClick={() => cartIncreaseItemCount(id)} className={style.purchase_counter_increase}>+</div>
                    </div> :
                    <div className={style.purchase_counter}></div>
                }
                <div className={style.purchase_price}>{ !skeleton ? (data.price * data.count).toFixed(2) + ' €' : ""}</div>
            </div>
            {
                !skeleton ?
                <div onClick={() => cartRemoveItem(id)} className={style.item_remove}>
                    <img alt='' src={removeLogo}/>
                </div> : ""
            }
        </div>
    )
};

export default connect(
    null,
    {cartChangeItemCount, cartIncreaseItemCount, cartDecreaseItemCount, cartRemoveItem}
)(Item);