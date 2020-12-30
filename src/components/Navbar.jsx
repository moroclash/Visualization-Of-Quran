import React, { Component } from 'react';
import LongList from './LongList';

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            swar_names: props.swar_names,
            current_sora: props.swar_names[1],
            systems_info: props.systems
        }
    }

    render() {
        let variant = 'Secondary'

        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <a to="#" className="navbar-brand">القرأن الكريم</a>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <LongList main_title={this.state.current_sora}
                                      options={this.state.swar_names}/>
                        </li>
                        <li className="navbar-item">
                            <LongList main_title={this.state.systems_info[0]}
                                      options={this.state.systems_info}/>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Navbar;