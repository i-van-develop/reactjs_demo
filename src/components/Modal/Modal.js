import React from "react";
import style from './style.module.css';

export default ({message, callback}) => {
    return (
        <div className={style.wrap}>
            <div className={style.modal}>
                <div className={style.message}>{message}</div>
                <div className={style.button_wrap}>
                    <button className='button' onClick={callback}>OK</button>
                </div>
            </div>
        </div>
    )
}