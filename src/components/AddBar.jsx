import React, { Component } from 'react';
import List from './List';
import CheckBox from './CheckBox';
import { Navbar, Form, Button } from 'react-bootstrap'
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import CsvDownloader from 'react-csv-downloader';
import { HeadNames } from '../models/Globals';

const divStyle = { marginRight: "43px" }

const columns = HeadNames.map(x => {return {id: x[2], displayName: x[2]}})

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
        this.props.onCharChange(value.length == this.props.data.charList.length ? ['*'] : value, 0)
    }

    render() {
        return (
            <Navbar className="bg-primary justify-content-between">
                <Navbar.Brand style={{ color: "#fff" }}> إضافة حرف</Navbar.Brand>
                <div style={{ display: "-webkit-box" }}>
                    <div style={divStyle}>
                        <List title="السوره" options={this.props.Quran.swar_names}
                            tooltipText="السوره"
                            defaultIndex={this.props.data.souraID}
                            handler={this.onSouraChange}
                            disable={false}
                            withIndex={true} />
                    </div>

                    <div style={divStyle}>
                        <List title="الآية"
                            tooltipText="الآية"
                            options={this.props.data.ayaList}
                            withIndex={false}
                            handler={this.onAyaChange}
                            defaultIndex={this.props.data.ayaValue}
                            disable={this.state.chooseAllSoura} />
                    </div>


                    <div style={divStyle}>
                        <CheckBox title="الأحرف"
                            tooltipText="الأحرف"
                            options={this.props.data.charList}
                            handler={this.onCharChange} />
                    </div>

                    <div style={divStyle}>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="remove_tooltip">إضافة الحرف</Tooltip>}>
                            <Button className={"button button5"} variant="success" onClick={this.props.onAdd}>+</Button>
                        </OverlayTrigger>
                    </div>

                    <OverlayTrigger placement="top" overlay={<Tooltip id="remove_tooltip">Download as CSV</Tooltip>}>
                        <CsvDownloader 
                            filename="Table"
                            separator=","
                            wrapColumnChar=""
                            columns={columns}
                            datas={this.props.rows}>
                            <Button className={"button button5"} variant='dark'>CSV</Button>
                        </CsvDownloader>
                    </OverlayTrigger>

                </div>
            </Navbar>
        );
    }
}

export default AddBar;
