import React from "react";
import { Column, Table,  AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import TableCell from '@material-ui/core/TableCell';
import tashkeelVec from '../models/TashkeelVec';
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import '../assets/all.css';
import {tashkeelOrder} from '../models/Globals';


const HeadNames = [['ID', 0, 'id'],
["السوره", 1, 'souraName'],
['الآية', 1, 'aya'],
['النظام', 0, 'system'],
["الحرف", 1, 'char'],
["العدد", 1, 'count'],
["img:1", 0, tashkeelOrder[0]],
["img:2", 0, tashkeelOrder[1]],
["img:3", 0, tashkeelOrder[2]],
["img:4", 0, tashkeelOrder[3]],
["img:5", 0, tashkeelOrder[4]],
["img:6", 0, tashkeelOrder[5]],
["img:7", 0, tashkeelOrder[6]],
["img:8", 0, tashkeelOrder[7]],
["img:9", 0, tashkeelOrder[8]],
["img:10", 0, tashkeelOrder[9]],
["img:11", 0, tashkeelOrder[10]],
["img:12", 0, tashkeelOrder[11]],
["", 0, "dbtn:"],
];

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
                    margin:0,
                }}
            >
                {(label.startsWith('img:')) ?
                    <div 
                        style={{width: '100%', textAlign: 'center'}}
                    ><img className="taskeel-images"
                        style={{ width: "21px", height: "48px", backgroundColor: "#343a40" }}
                        alt=""
                        src={tashkeelVec[Number(label.split(":")[1]) - 1]} /></div> :
                    <span style={{ color: "#fff", width:'100%'}}> {label}</span>
                }
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
        console.log(this.props.rows)
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

                                />))}
                        </Table>
                    )}
                </AutoSizer>
            </div>
        );
    }

}

export default ReactVirtualizedTable;