import React, { Component } from 'react';
import List from './List';
import { Navbar, Form, Button } from 'react-bootstrap'

class AddBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chooseAllSoura: false,
            chooseAllChar: false,
        }
    }

    onSouraChange = (value) => {
        let id = Number(value.split(':')[0].trim())
        this.setState({
            chooseAllSoura: value.localeCompare('0 : All') === 0 ? true : false,
        })
        this.props.onSouraChange(id)
    }

    onAyaChange = (value) => {
        this.props.onAyaChange((value === 'All') ? 0 : Number(value))
    }

    onSystemChange = (value) => {
        this.props.onSystemChange(Number(value.split(':')[0].trim()))
    }

    onCharChange = (value) => {
        let [id, val] = value.split(':')
        this.setState({
            chooseAllChar: value.localeCompare('0 : All') === 0 ? true : false
        })
        this.props.onCharChange((val.trim() === 'All') ? '' : val.trim(), Number(id.trim()))
    }

    render() {
        return (
            <Navbar className="bg-primary justify-content-between">
                <Navbar.Brand style={{ color: "#fff" }}> إضافه حرف</Navbar.Brand>
                <Form inline>
                    <List title="السوره" options={this.props.Quran.swar_names}
                        tooltipText="السوره"
                        defaultIndex={this.props.data.souraID}
                        handler={this.onSouraChange}
                        disable={false}
                        withIndex={true} />


                    <List title="الآية"
                        tooltipText="الآية"
                        options={this.props.data.ayaList}
                        withIndex={false}
                        handler={this.onAyaChange}
                        defaultIndex={this.props.data.ayaValue}
                        disable={this.state.chooseAllSoura} />


                    <List title="نظام الأحرف" options={this.props.Quran.systems_info}
                        tooltipText="نظام الأحرف"
                        defaultIndex={this.props.data.systemValue}
                        handler={this.onSystemChange}
                        withIndex={true}
                        disable={this.state.chooseAllChar} />


                    <List title="الحرف"
                        tooltipText="الحرف"
                        options={this.props.data.charList}
                        handler={this.onCharChange}
                        withIndex={true}
                        defaultIndex={this.props.data.charIndex}
                        disable={false} />

                    <Button className={"button button5"} variant="success" onClick={this.props.onAdd}>+</Button>
                </Form>
            </Navbar>
        );
    }
}

export default AddBar;
