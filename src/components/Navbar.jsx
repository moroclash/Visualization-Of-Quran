import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let variant = 'Secondary'

        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <a to="#" className="navbar-brand">الْمُعْجَم الترددي لِلْحُرُوف الْعَرَبِيَّةِ فِي الْقُرْآنِ الْكَرِيمِ</a>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {/* <li className="navbar-item">
                            <LongList main_title={this.state.current_sora}
                                      options={this.state.swar_names}/>
                        </li> */}
                        {/* <li className="navbar-item">
                            <LongList main_title={this.state.systems_info[0]} 
                                      options={this.state.systems_info}/>
                        </li> */}
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Navbar;