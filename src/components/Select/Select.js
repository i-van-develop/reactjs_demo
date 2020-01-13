import React from "react";
import ReactDOM from "react-dom"
import style from './style.module.css';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            currentId: null,
            currentValue: 'undefined'
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(event) {
        const domNode = ReactDOM.findDOMNode(this);
        if ((!domNode || !domNode.contains(event.target))) {
            this.toggle();
        }
    }

    componentDidMount() {
        this.setId(this.props.currentId);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let needUpdate = false;
        const curPropsValueKeys = Object.keys(this.props.values);
        const prevPropsValuesKeys = Object.keys(prevProps.values);
        if (curPropsValueKeys.length !== prevPropsValuesKeys.length){
            needUpdate = true;
        } else {
            prevPropsValuesKeys.forEach(id => {
                if (!curPropsValueKeys.includes(id)){
                    needUpdate = true;
                }
            });
        }
        if (needUpdate){
            this.setId(this.props.currentId);
        }
    }

    renderList() {
        document.addEventListener('click', this.handleClickOutside, false);
        return (
            <div className={style.list_wrap_line}>
                <div className={style.list_wrap}>
                    {Object.keys(this.props.values).reduce((result, id) => {
                        if (id !== this.state.currentId) result.push( <div onClick={e => {
                            this.setId(id);
                            this.toggle();
                            if (this.props.changeId) this.props.changeId(id);
                        }} className={style.list_item} key={id}>{this.props.values[id]}</div> );
                        return result;
                    },[])}
                </div>
            </div>
        );
    }

    setId(id) {
        const currentId = (id && this.props.values && this.props.values.hasOwnProperty(id)) ? id :
            (this.props.values && Object.keys(this.props.values).length > 0) ? Object.keys(this.props.values)[0] : this.state.currentId;
        const currentValue = currentId ? this.props.values[currentId] : this.props.currentValue;

        this.setState({
            currentId: currentId,
            currentValue: currentValue
        });
    }

    toggle() {
        this.setState({
            isOpened: !this.state.isOpened
        });
    }

    render() {
        document.removeEventListener('click', this.handleClickOutside, false);

        return (
            <div>
                <div onClick={e => {
                    this.toggle();
                }}
                     className={`${style.select} ${style.toggle_wrap}`}>
                    <div className={style.value_wrap}>
                        <div className={style.value}>{this.state.currentValue}</div>
                        <div className={style.toggle}>{this.state.isOpened ? '▲' : '▼'}</div>
                    </div>
                </div>
                {this.state.isOpened ? this.renderList() : ''}
            </div>
        )
    }
}

export default Select;