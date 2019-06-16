import './../../Styles/DropDownButton.css';
import React, {Component} from 'react';

class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            labelItem: null,
            typeDropdown: null
        };
        this.checkType = this.checkType.bind(this)
        this.showDropdown = this.showDropdown.bind(this)
        this.hideDropdown = this.hideDropdown.bind(this)
        this.chooseItem = this.chooseItem.bind(this)
        this.renderDataDropDown = this.renderDataDropDown.bind(this)
        this.exposedLabelState = this.exposedLabelState.bind(this)
    }

    exposedLabelState(value){
        this.setState({
            labelItem: value
        });
    }

    componentWillMount() {
        const { label } = this.props.list[0];
        let firstItem = null;
        if (typeof label != 'undefined') {
            this.checkType(false);
            firstItem = label;
        } else {
            this.checkType(true);
            firstItem = this.props.list[0];
        }
        this.setState({
            labelItem: firstItem
        });
    }
    checkType(value){
        this.setState({
            typeDropdown: value
        });
    }
    showDropdown(){
        this.setState({ isOpen: true })
        // This is to make
        document.addEventListener("click", this.hideDropdown)
    }
    hideDropdown(){
        this.setState({ isOpen: false })
        document.removeEventListener("click", this.hideDropdown)
    }
    chooseItem(value){
        if (this.state.labelItem !== value) {
            this.setState({
                labelItem: value
            })
            this.props.onClick(value)
        }
    }

    renderDataDropDown(item, index){
        const {value, label} = this.state.typeDropdown ? {value: index, label: item} : item
        let display = null
        if(this.state.labelItem == label){
            display =  <a><span style={{color:"green",fontSize:20}}>&#10004;</span>  {label}</a>
        } else
            display =  <a><span>&nbsp; &nbsp; &nbsp; {label}</span></a>


        return (
            <li
                key={index}
                value={value}
                onClick={() => this.chooseItem(label)}
            >
                {display}
            </li>
        )
    }
    render(){
        const { list } = this.props
        return (
            <div className={`dropdown ${this.state.isOpen ? 'open' : ''}`}>
                <button className="dropdown-toggle" type="button" onClick={this.showDropdown}>
                    {this.props.labelText || ""} <b>{this.state.labelItem}</b>
                </button>
                <ul className="dropdown-menu">
                    {list.map(this.renderDataDropDown)}
                </ul>
            </div>
        )
    }
}

export default Dropdown;



