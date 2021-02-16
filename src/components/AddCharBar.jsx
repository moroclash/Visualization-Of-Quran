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

function addAtBegining(list) {
    list.unshift('الكل')
    return list
}

function getDataObject(soura, systemNum) {
    return ({
        Soura: soura,
        ayaList: addAtBegining(Object.keys(soura.ayat)),
        charList: Object.keys(soura.ayat[1].systems[systemNum].groups),
        souraID: Number(soura.soura_num),
        souraValue: soura.soura_name
    })
}


const defaultCharIndex = 1
const defaultAyaVlaue = 1
const defaultSystemValue = 0
const defaultSoura = 1

class AddCharBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Soura: null,
            souraID: defaultSoura,
            charList: [],
            ayaList: [],
            systemValue: defaultSystemValue,
            ayaValue: defaultAyaVlaue,
            charValue: [],
            souraValue: '',
            charIndex: defaultCharIndex,
        }
    }

    onSouraChange = (id) => {
        if (id === 0) {
            this.setState({ souraID: id, souraValue: '' })
        }
        else {
            getData(id, (soura) => {
                this.setState(getDataObject(soura, this.state.systemValue))
            })
        }
    }

    onSystemChange = (id) => {
        let charList = addAtBegining(Object.keys(this.state.Soura.ayat[1].systems[id].groups))
        this.setState({
            systemValue: id,
            charValue: charList[defaultCharIndex],
            charIndex: defaultCharIndex,
            charList: charList
        })
    }


    onAyaChange = (id) => {
        this.setState({ ayaValue: id })
    }

    onCharChange = (char, id) => {
        this.setState({ charValue: char, charIndex: id })
    }

    onAdd = () => {
        if (typeof(this.state.charValue) === 'object' && this.state.charValue.length > 0) 
            this.props.onAdd(
                getState(0,
                    (this.state.souraID === 0) ? this.props.Quran : this.state.Soura,
                    this.state.souraValue,
                    this.state.ayaValue,
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
                rows={this.props.rows}
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