import React, { Component } from 'react';
import List from './List';
import { Navbar, Form, Button } from 'react-bootstrap'
import { Tooltip, OverlayTrigger } from "react-bootstrap";


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
            chooseAllSoura: id === 0 ? true : false,
        })
        this.props.onSouraChange(id)
    }

    onAyaChange = (value) => {
        this.props.onAyaChange((value === 'الكل') ? 0 : Number(value))
    }

    onSystemChange = (value) => {
        this.props.onSystemChange(Number(value.split(':')[0].trim()))
    }

    onCharChange = (value) => {
        let [id, val] = value.split(':')
        id = Number(id.trim())
        this.setState({
            chooseAllChar: id === 0 ? true : false
        })
        this.props.onCharChange(id === 0 ? '' : val.trim(), id)
    }

    render() {
        return (
            <Navbar className="bg-primary justify-content-between">
                <Navbar.Brand style={{ color: "#fff" }}> إضافة حرف</Navbar.Brand>
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


                    <OverlayTrigger placement="top" overlay={<Tooltip id="remove_tooltip">إضافة الحرف</Tooltip>}>
                        <Button className={"button button5"} variant="success" onClick={this.props.onAdd}>+</Button>
                    </OverlayTrigger>

                </Form>
            </Navbar>
        );
    }
}

export default AddBar;
