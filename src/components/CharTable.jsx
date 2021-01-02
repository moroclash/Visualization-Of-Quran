import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import tashkeelVec from '../models/TashkeelVec';
import { AutoSizer, Column, Table } from 'react-virtualized';

import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
// import Button from "./CustomButton";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const RemoveButton = ({deleteHandler, id}) => {
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>
    return (
        <OverlayTrigger placement="top" overlay={remove}>
            <Button size="sm" variant="danger" type="button" onClick={() => {deleteHandler(id)}}>
                x
            </Button>
        </OverlayTrigger>
    )
}


const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
        },
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
});

// each cell in HeadNames consists of (name, type, key) -> type {0: for numerical, 1 for string}
const HeadNames = [['ID', 0, 'id'],
["السوره", 1, 'souraName'],
['الآية', 1, 'aya'],
['النظام', 0, 'system'],
["الحرف", 1, 'char'],
["العدد", 1, 'count'],
["img:1", 0, "t1"],
["img:2", 0, "t2"],
["img:3", 0, "t3"],
["img:4", 0, "t4"],
["img:5", 0, "t5"],
["img:6", 0, "t6"],
["img:7", 0, "t7"],
["img:8", 0, "t8"],
["img:9", 0, "t9"],
["img:10", 0, "t10"],
["img:11", 0, "t11"],
["img:12", 0, "t12"],
["", 0, "dbtn:"],
];


class MuiVirtualizedTable extends React.PureComponent {

    static defaultProps = {
        headerHeight: 49,
        rowHeight: 48,
    };

    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };
    cellRenderer = ({ cellData, columnIndex, rowData, dataKey }) => {
        // let { cellData, columnIndex, rowData, dataKey } = ll
        // console.log(ll)
        const { onDelet, classes, rowHeight, onRowClick } = this.props;
        // rowData.id
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align="center"//{(columnIndex != null && columns[columnIndex].numeric) || false ? 'center' : 'center'}
            >
                {(dataKey.startsWith('dbtn:')) ? <RemoveButton id={rowData.id} deleteHandler={onDelet}/> : cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex }) => {
        const { headerHeight, classes } = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight, backgroundColor: "#343a40" }}
                align="center"//{columns[columnIndex].numeric || false ? 'center' : 'center'}
            >{(label.startsWith('img:')) ?
                <img className="taskeel-images"
                    style={{ width: "28px", height: "48px", backgroundColor: "#343a40" }}
                    alt=""
                    src={tashkeelVec[Number(label.split(":")[1]) - 1]} /> :
                <span style={{ color: "#fff" }}> {label}</span>
                }            </TableCell>
        );
    };

    render() {
        const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);


export default function ReactVirtualizedTable(props) {
    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <VirtualizedTable
                rowCount={props.rows.length}
                rowGetter={({ index }) => props.rows[index]}
                onDelet={props.onDelete}
                columns={HeadNames.map((cell) => {
                    return ({
                        width: 200,
                        label: cell[0],
                        dataKey: cell[2],
                        numeric: cell[1],
                    })
                }
                )
                }
            />
        </Paper>
    );
}