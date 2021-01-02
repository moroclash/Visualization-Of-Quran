import React, { Component } from 'react';
import { getSouraInfo } from '../models/Prepare';
import AddBar from './AddBar';

function getData(id, callback) {
    getSouraInfo(id)
        .then((soura) => {
            callback(soura)
        })
        .catch(err => err)
}


class AddCharBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Soura: null,
            souraID: 1,
        }
    }

    onSouraChange = (id) => {
        getData(id, (soura) => {
            this.setState({Soura: soura})
        })
    }

    componentDidMount() {
        getData(this.state.souraID, (soura) => {
            this.setState({Soura: soura})
        });
    };

    render() {
        return (
            <AddBar currentSouraID={this.state.souraID}
                Quran={this.props.Quran}
                Soura={this.state.Soura}
                onSouraChange={this.onSouraChange}
                onAdd={this.props.onAdd} />
        );
    }
}

export default AddCharBar;