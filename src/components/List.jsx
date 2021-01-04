import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from "react-bootstrap";

class List extends Component {
    onChange = (event) => {
        this.setState({ defaultValue: event.target.value })
        if (this.props.handler) {
            this.props.handler(event.target.value)
        }
    }

    render() {
        let defaultValue = `${this.props.withIndex ? `${this.props.defaultIndex} : ` : ""}${this.props.options[this.props.defaultIndex]}`
        return (
            <OverlayTrigger placement="top" overlay={<Tooltip id="remove_tooltip">{this.props.tooltipText}</Tooltip>}>

                <div>
                    <select className="browser-default custom-select mr-md-5"
                        value={defaultValue}
                        disabled={this.props.disable}
                        onChange={this.onChange}>
                        {
                            this.props.options.map((op, key) => {
                                let value = `${this.props.withIndex ? `${key} : ` : ""}${op}`
                                return (
                                    <option key={key} value={value}>{value}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </OverlayTrigger>

        );
    }
}

export default List;