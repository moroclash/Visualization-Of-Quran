import React, { Component } from 'react';

class List extends Component {
    onChange = (event) => {
        this.setState({defaultValue: event.target.value})
        if(this.props.handler){
            this.props.handler(event.target.value)
        }
    }

    render() {
        let defaultValue = `${this.props.withIndex?`${this.props.defaultIndex} : `:""}${this.props.options[this.props.defaultIndex]}`
        return (
            <div>
                <select className="browser-default custom-select mr-md-5"
                        value={defaultValue}
                        disabled={this.props.disable}
                        onChange={this.onChange}>
                    {
                        this.props.options.map((op, key) => {
                            let value = `${this.props.withIndex?`${key} : `:""}${op}`
                            return (
                                <option key={key} value={value}>{value}</option>
                            )
                        })
                    }
                </select>
            </div>
        );
    }
}

export default List;