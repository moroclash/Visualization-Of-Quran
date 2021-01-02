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

function getDataObject(soura, systemNum){
    return ({Soura: soura,
             ayaList: Object.keys(soura.ayat),
             charList: Object.keys(soura.ayat[1].systems[systemNum].groups) 
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
            charIndex: 0,
        }
    }

    onSouraChange = (id) => {
        getData(id, (soura) => {
            this.setState(getDataObject(soura, this.state.systemValue))
        })
    }

    onSystemChange = (id) => {
        this.setState({
            systemValue: id,
        })
    }

    componentDidMount() {
        getData(this.state.souraID, (soura) => {
            let obj = getDataObject(soura, this.state.systemValue)
            obj.charValue = obj.charList[this.state.charIndex]
            this.setState(obj)
        });
    };

    render() {
        return (
            <AddBar currentSouraID={this.state.souraID}
                Quran={this.props.Quran}
                Soura={this.state.Soura}
                charList={this.state.charList}
                ayaList={this.state.ayaList}
                ayaValue={this.state.ayaValue}
                charValue={this.state.charValue}
                systemValue={this.state.systemValue}
                charIndex={this.state.charIndex}
                onSouraChange={this.onSouraChange}
                onAdd={this.props.onAdd}
                onSystemChange={this.props.onSystemChange} />
        );
    }
}

export default AddCharBar;