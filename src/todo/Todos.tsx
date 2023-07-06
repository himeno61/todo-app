import React, {useMemo, useState} from "react";
import {TodoModel} from "./TodoModel.ts";
import DataTable, {TableColumn, createTheme} from "react-data-table-component"
import TextField from "../components/TextField.tsx";
import Button from "../components/Button.tsx";
import {useTodos} from "./useTodos.ts";

const Todos = () => {

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const {todos,isInitialized} = useTodos();

    const filteredItems = todos.filter(item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),);

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className={"todos-table-header"}>
                <h5>
                    Total count: {filteredItems.length}
                </h5>
                <TextField
                    id="search"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFilterText(e.target.value)
                    }
                    value={filterText}
                    placeholder={"Filter by title"}
                />
                <Button type="button" onClick={handleClear}>X</Button>
            </div>
        );

    }, [filterText, filteredItems.length, resetPaginationToggle]);

    createTheme('tableTheme', {
        text: {
            primary: '#ffffff',
            secondary: '#2aa198',
        },
        divider: {
            default: '#ffffff',
        },
        background: {
            default: 'transparent',
            secondary: '#ffffff',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
        width: {}
    }, 'dark');

    const columns: TableColumn<TodoModel>[] = useMemo(() => {
        return [
            {
                name: 'Id',
                selector: row => row.id,
                sortable: true,
                width: "100px"
            },
            {
                name: 'User id',
                selector: row => row.user_id,
                sortable: true,
                width: "100px"
            },
            {
                name: 'Title',
                selector: row => row.title,
                sortable: true,
                width: "500px"
            },
            {
                name: 'Due_on',
                selector: row => new Date(Date.parse(row.due_on)).toDateString(),
                sortable: true,
                width: "200px",
            },
            {
                name: 'Status',
                selector: row => row.status,
                sortable: true,
                width: "90px",
                cell: ((row) => {
                    if (row.status === "pending") {
                        return (<div>⏳</div>);
                    } else {
                        return <div>✅</div>;
                    }
                })
            }
        ];
    }, []);

    const customStyles = {
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

    return (
        <div className={"wrapper"}>
            <DataTable
                title="Todos"
                columns={columns}
                data={filteredItems}
                theme="tableTheme"
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                progressPending={!isInitialized}
                customStyles={customStyles}
            />
        </div>

    );

}
export default Todos;