import React from "react";
import style from './style.module.css';
import Select from "../../components/Select/Select";
import {connect} from 'react-redux';
import {
    shippingChangeAddress,
    shippingChangeEmail,
    shippingChangeName,
    shippingChangePhone,
    shippingChangeShippingOption,
    shippingPay,
    cartLoadData
} from '../../redux/actions';
import Loader from "../../components/Loader/Loader";

const SO_FREE_SHIPPING = "Free Shipping";
const SO_FREE_EXPRESS_SHIPPING = "Free Express Shipping";
const SO_EXPRESS_SHIPPING = "Express Shipping - additional 9.99 €";
const SO_COURIER_SHIPPING = "Courier Shipping - additional 19.99 €";

class Shipping extends React.Component{
    generateShippingOption(){
        const {cart} = this.props;
        if (!cart.isLoad && Object.keys(cart.itemsByIds).length){
            const sum = Object.keys(cart.itemsByIds).reduce((sum, id) => {
                return sum + (cart.itemsByIds[id].price * cart.itemsByIds[id].count);
            });
            if (sum > 300){
                return {
                    3 : SO_FREE_EXPRESS_SHIPPING,
                    4 : SO_COURIER_SHIPPING
                };
            }
        }
        return {
            1 : SO_FREE_SHIPPING,
            2 : SO_EXPRESS_SHIPPING,
            4 : SO_COURIER_SHIPPING
        };
    }

    componentDidMount() {
        const {cartLoadData, cart} = this.props;
        if (!Object.keys(cart.itemsByIds).length){
            cartLoadData();
        }
    }

    render() {
        const {
            data,
            cart,
            shippingChangeName,
            shippingChangeAddress,
            shippingChangePhone,
            shippingChangeEmail,
            shippingChangeShippingOption,
            shippingPay
        } = this.props;

        return (
            <div className={style.wrap}>
                <div>
                    <div className={style.field_line}>
                        <div className={style.field_label}>Name*</div>
                        <div className={!data.nameValid ? style.field_line_validation_failure : ""}>
                            <input onChange={e => {shippingChangeName(e.target.value)}} value={data.name} className={style.field}/>
                            <div className={style.field_validation_alert}>Name cannot be empty</div>
                        </div>
                    </div>
                    <div className={style.field_line}>
                        <div className={style.field_label}>Address*</div>
                        <div className={!data.addressValid ? style.field_line_validation_failure : ""}>
                            <input onChange={e => {shippingChangeAddress(e.target.value)}} value={data.address} className={style.field}/>
                            <div className={style.field_validation_alert}>Address cannot be empty</div>
                        </div>
                    </div>
                    <div className={style.field_line}>
                        <div className={style.field_label}>Phone</div>
                        <div className={!data.phoneValid ? style.field_line_validation_failure : ""}>
                            <input onChange={e => {shippingChangePhone(e.target.value)}} value={data.phone} className={style.field}/>
                            <div className={style.field_validation_alert}>Invalid Phone</div>
                        </div>
                    </div>
                    <div className={style.field_line}>
                        <div className={style.field_label}>E-mail</div>
                        <div className={!data.emailValid ? style.field_line_validation_failure : ""}>
                            <input onChange={e => {shippingChangeEmail(e.target.value)}} value={data.email} className={style.field}/>
                            <div className={style.field_validation_alert}>Invalid E-mail</div>
                        </div>
                    </div>
                    <div className={style.field_line}>
                        <div className={style.field_label}>Shipping options</div>
                        <Select changeId={(id) => shippingChangeShippingOption(id)} values={this.generateShippingOption()} currentId={data.shippingOption}/>
                    </div>
                    <div className={style.button_wrap}>
                        {
                            !data.isValid || cart.isLoad || cart.loadError ?
                                <button disabled className='button button-disabled'>PAY</button> :
                                <button onClick={shippingPay} className='button'>PAY</button>
                        }
                    </div>
                </div>
                { cart.isLoad ? <Loader/> : ""}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        data: state.shipping,
        cart : state.cart
    };
};

export default connect(mapStateToProps, {
    shippingChangeName,
    shippingChangeAddress,
    shippingChangePhone,
    shippingChangeEmail,
    shippingChangeShippingOption,
    shippingPay,
    cartLoadData
})(Shipping);