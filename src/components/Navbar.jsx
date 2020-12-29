import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Navbar extends Component {
    constructor(props){
        super(props) 
        
        let swar_names = [1,2,3,4,5,6,7,8,9]

        this.state = {
            swar_names: swar_names
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
                            <DropdownButton id={`dropdown-variants-${variant}`}
                                            variant={variant.toLowerCase()}>
                                {this.state.swar_names.map( oneSora => {
                                    return (<Dropdown.Item key={oneSora}> {oneSora} </Dropdown.Item>); 
                                })}
                            </DropdownButton>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;