import React from "react";
import { Column, Table, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import TableCell from '@material-ui/core/TableCell';
import tashkeelVec from '../models/TashkeelVec';
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { tashkeelOrder, HeadNames } from '../models/Globals';
import '../assets/all.css';



const RemoveButton = ({ deleteHandler, id }) => {
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>
    return (
        <OverlayTrigger placement="top" overlay={remove}>
            <Button size="sm" variant="danger" type="button" onClick={() => { deleteHandler(id) }}>
                x
            </Button>
        </OverlayTrigger>
    )
}


const defaultProps = {
    headerHeight: 49,
    rowHeight: 48,
};

class ReactVirtualizedTable extends React.Component {

    headerRenderer = (label) => {
        return (
            <TableCell
                component="div"
                variant="head"
                style={{
                    height: defaultProps.headerHeight,
                    backgroundColor: "#343a40",
                    width: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    margin: 0,
                }}
            >
                <div
                    style={{ width: '100%', textAlign: 'center' }}
                >
                    {(label.startsWith('img:')) ?
                        <img className="taskeel-images"
                            style={{ width: "21px", height: "48px", backgroundColor: "#343a40" }}
                            alt=""
                            src={tashkeelVec[Number(label.split(":")[1]) - 1]} /> :
                        <span style={{ color: "#fff", width: '100%' }}> {label}</span>
                    }
                </div>
            </TableCell>
        );
    };


    cellRenderer = ({ cellData, rowData, dataKey }) => {
        return (
            <div
                component="div"
                variant="body"
                style={{
                    height: defaultProps.rowHeight,
                    textAlign: 'center',
                }}
                align="center"
            >
                {(dataKey.startsWith('dbtn:')) ? <RemoveButton id={rowData.id} deleteHandler={this.props.onDelete} /> : cellData}
            </div>
        );
    };

    render() {
        return (
            <div style={{ height: 400, marginTop: 2, width: '100%', textAlign: 'center' }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            width={width}
                            height={height}
                            headerHeight={defaultProps.headerHeight}
                            rowHeight={defaultProps.rowHeight}
                            rowCount={this.props.rows.length}
                            rowGetter={({ index }) => this.props.rows[index]}
                        >
                            {HeadNames.map((cell, index) =>
                                (<Column width={width * (100 / HeadNames.length) / 100}
                                    label={cell[0]}
                                    dataKey={cell[2]}
                                    headerRenderer={() =>
                                        this.headerRenderer(cell[0])
                                    }
                                    cellRenderer={this.cellRenderer}
                                    key={index}
                                />))}
                        </Table>
                    )}
                </AutoSizer>
            </div>
        );
    }

}

export default ReactVirtualizedTable;