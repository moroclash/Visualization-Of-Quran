import React, { Component } from 'react';
import List from './List';
import { Navbar, Form, Button } from 'react-bootstrap'
import { getState } from '../models/Prepare';

class AddBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chooseAll: false,
            souraValue: this.props.currentSouraID,
            ayaValue: null,
            charValue: null,
            charIndex: null,
            systemValue: null,
        }
    }


    componentWillReceiveProps(nextProps){
        this.setState({
            souraValue: nextProps.currentSouraID,
            ayaValue: nextProps.ayaValue,
            charValue: nextProps.charValue,
            charIndex: nextProps.charIndex,
            systemValue: nextProps.systemValue,
        })
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
        })
        this.props.onSystemChange(id)
    }

    onCharChange = (value) => {
        let [id, val] = value.split(':')
        this.setState({ charValue: val.trim(), charIndex: Number(id.trim()) })
    }

    onAdd = () => {
        // console.log(this.state)
        this.props.onAdd(
            getState(0,
                (this.state.souraValue === 0) ? this.props.Quran : this.props.Soura,
                this.state.souraValue,
                this.state.ayaValue,
                this.state.systemValue,
                this.props.Quran.systems_info[this.state.systemValue],
                this.state.charValue)
        )
    }

    render() {
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
                        options={this.props.ayaList}
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
                        options={this.props.charList}
                        handler={this.onCharChange}
                        withIndex={true}
                        defaultIndex={this.state.charIndex}
                        disable={false} />
                    <Button className={"button button5"} variant="success" onClick={this.onAdd}>+</Button>
                </Form>
            </Navbar>
        );
    }
}

export default AddBar;
