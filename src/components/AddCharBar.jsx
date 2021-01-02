import React, { Component } from 'react';
import { getSouraInfo } from '../models/Prepare';
import AddBar from './AddBar';
import { getState } from '../models/Prepare';

function getData(id, callback) {
    getSouraInfo(id)
        .then((soura) => {
            callback(soura)
        })
        .catch(err => err)
}

function getDataObject(soura, systemNum) {
    return ({
        Soura: soura,
        ayaList: Object.keys(soura.ayat),
        charList: Object.keys(soura.ayat[1].systems[systemNum].groups),
        souraID: Number(soura.soura_num),
        souraValue: soura.soura_name
    })
}


class AddCharBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Soura: null,
            souraID: 1,
            charList: [],
            ayaList: [],
            systemValue: 0,
            ayaValue: 1,
            charValue: '',
            souraValue: '',
            charIndex: 0,
        }
    }

    onSouraChange = (id) => {
        if (id === 0) {
            this.setState({souraID: id})
        }
        else {
            getData(id, (soura) => {
                this.setState(getDataObject(soura, this.state.systemValue))
            })
        }
    }

    onSystemChange = (id) => {
        this.setState({
            systemValue: id,
            charList: Object.keys(this.state.Soura.ayat[1].systems[id].groups)
        })
    }


    onAyaChange = (id) => {
        this.setState({ ayaValue: id })
    }

    onCharChange = (char, id) => {
        this.setState({ charValue: char, charIndex: id })
    }

    onAdd = () => {
        this.props.onAdd(
            getState(0,
                (this.state.souraID === 0) ? this.props.Quran : this.state.Soura,
                 this.state.souraValue,
                 this.state.ayaValue,
                 this.state.systemValue,
                 this.props.Quran.systems_info[this.state.systemValue],
                 this.state.charValue)
        )
    }


    componentDidMount() {
        getData(this.state.souraID, (soura) => {
            let obj = getDataObject(soura, this.state.systemValue)
            obj.charValue = obj.charList[this.state.charIndex]
            obj.souraValue = this.props.Quran.swar_names[this.state.souraID]
            this.setState(obj)
        });
    };

    render() {
        return (
            <AddBar currentSouraID={this.state.souraID}
                Quran={this.props.Quran}
                data={this.state}
                onSouraChange={this.onSouraChange}
                onAyaChange={this.onAyaChange}
                onCharChange={this.onCharChange}
                onAdd={this.onAdd}
                onSystemChange={this.onSystemChange} />
        );
    }
}

export default AddCharBar;