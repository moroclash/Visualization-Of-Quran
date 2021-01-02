import React, { Component } from 'react';
import List from './List';
import { Navbar, Form, Button } from 'react-bootstrap'
import { getState } from '../models/Prepare';

let defaultAya = 1
let defaultSystem = 0
let defaultChar = 0

class AddBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chooseAll: false,
            souraValue: this.props.currentSouraID,
            ayaValue: defaultAya,
            systemValue: defaultSystem,
            charValue: defaultChar,
        }
    }

    onSouraChange = (value) => {
        let id = Number(value.split(':')[0].trim())
        this.setState({
            chooseAll: value.localeCompare('0 : ALl') === 0 ? true : false,
            souraValue: id
        })
        this.props.onSouraChange(id)
    }

    onAyaChange = (value) => {
        this.setState({ ayaValue: (value === 'All') ? 0 : Number(value) })
    }

    onSystemChange = (value) => {
        let id = Number(value.split(':')[0].trim())
        this.setState({
            systemValue: id,
            systemChars: Object.keys(this.props.Soura.ayat[1].systems[id].groups)
        })
    }

    onCharChange = (value) => {
        this.setState({ charValue: value.trim() })
    }

    onAdd = () => {
        // console.log("aaaa" , props)
        this.props.onAdd(
            getState(0,
                (this.state.souraValue === 0) ? this.props.Quran : this.props.Soura,
                this.state.souraValue,
                this.state.aya_num,
                this.state.systemValue,
                this.props.Quran.systems_info[this.state.systemValue],
                this.state.charValue)
        )
    }

    render() {
        let systemChars = (this.props.Soura) ? Object.keys(this.props.Soura.ayat[1].systems[this.state.systemValue].groups) : []
        let ayatList =  (this.props.Soura) ? ['All', ...(this.props.Soura) ? Object.keys(this.props.Soura.ayat) : []] : []
        return (
            <Navbar className="bg-primary justify-content-between">
                <Navbar.Brand style={{ color: "#fff" }}> إضافه حرف</Navbar.Brand>
                <Form inline>
                    <List title="السوره" options={this.props.Quran.swar_names}
                        defaultIndex={this.state.souraValue}
                        handler={this.onSouraChange}
                        disable={false}
                        withIndex={true} />

                    <List title="ألأيه"
                        options={ayatList}
                        withIndex={false}
                        handler={this.onAyaChange}
                        defaultIndex={this.state.ayaValue}
                        disable={this.state.chooseAll} />

                    <List title="نظام الاحرف" options={this.props.Quran.systems_info}
                        defaultIndex={this.state.systemValue}
                        handler={this.onSystemChange}
                        withIndex={true}
                        disable={false} />

                    <List title="الحرف"
                        options={systemChars}
                        handler={this.onCharChange}
                        withIndex={false}
                        defaultIndex={this.state.charValue}
                        disable={false} />
                    <Button className={"button button5"} variant="danger" onClick={this.onAdd}>+</Button>
                </Form>
            </Navbar>
        );
    }
}

export default AddBar;
