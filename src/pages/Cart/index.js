import React from "react";
import {connect} from "react-redux";
import ItemList from "../../components/Cart/ItemList";
import style from './style.module.css';
import {cartLoadData, cartSend, cartSendErrorCancel, cartRedirectSuccess} from "../../redux/actions";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";
import {Redirect} from "react-router";

class Cart extends React.Component{
    componentDidMount() {
        const {cartLoadData, items} = this.props;
        if (!Object.keys(items).length){
            cartLoadData();
        }
    }

    render() {
        const {items, isLoad, loadError, sendSuccess, isSend, sendError, cartSend, cartSendErrorCancel, cartRedirectSuccess} = this.props;
        return (
            <div className={style.wrap}>
                <div className={style.centered_wrap}>
                    <ItemList items={items} isLoad={isLoad} loadError={loadError}/>
                    <div className={style.cart_sum}>
                        {
                            !isLoad ?
                            (Object.keys(items).reduce((sum, id) => {
                            return sum + (items[id].price * items[id].count);
                        }, 0)).toFixed(2) + ' €' : ''
                        }
                    </div>
                    <div className={style.cart_submit_wrap}>
                        {
                            (isLoad || loadError !== null || isSend || sendError) ?
                                <button disabled className='button button-disabled'>BUY</button> :
                                <button className='button' onClick={() => {cartSend()}}>BUY</button>
                        }
                    </div>
                </div>
                {isSend ? <Loader/> : ""}
                {sendError ? <Modal message={sendError} callback={cartSendErrorCancel}/> : ""}
                {
                    sendSuccess ?
                        (() => {cartRedirectSuccess(); return <Redirect push to='/shipping'/>;})()
                    : ""
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.cart.itemsByIds,
        isLoad: state.cart.isLoad,
        loadError: state.cart.loadError,
        isSend: state.cart.isSend,
        sendError: state.cart.sendError,
        sendSuccess: state.cart.sendSuccess
    };
};

export default connect(mapStateToProps,{
    cartLoadData,
    cartSend,
    cartSendErrorCancel,
    cartRedirectSuccess
})(Cart);