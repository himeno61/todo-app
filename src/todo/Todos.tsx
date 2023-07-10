import React, {useMemo, useState} from "react";
import {TodoModel} from "./TodoModel.ts";
import DataTable, {TableColumn, createTheme} from "react-data-table-component"
import TextField from "../components/TextField.tsx";
import Button from "../components/Button.tsx";
import {useTodos} from "./useTodos.ts";
import {StyleSheetManager} from "styled-components";
import isPropValid from '@emotion/is-prop-valid';


const Todos = () => {

    const [filterTitleText, setFilterTitleText] = useState<string>('');
    const [filterUserIdText, setFilterUserIdText] = useState<string>('');
    const {todos, isInitialized} = useTodos();

    const filteredItems = todos.filter(item => {
        return item.title && item.title.toLowerCase().includes(filterTitleText.toLowerCase()) && item.user_id && item.user_id.toString().includes(filterUserIdText.toLowerCase());
    });

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterTitleText) {
                setFilterTitleText('');
            }
            if (filterUserIdText) {
                setFilterUserIdText('');
            }
        };

        return (
            <div className={"todos-table-header-wrapper"}>
                <div className={"todos-table-header"}>
                    <h5>
                        Total count: {filteredItems.length}
                    </h5>
                    <div className={"filter-textfield-label"}>
                        <label htmlFor="search-field-title">Title: </label>
                        <TextField
                            id="search-field-title"
                            type="text"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFilterTitleText(e.target.value)
                            }
                            value={filterTitleText}
                            placeholder={"Filter by title"}
                        />
                    </div>

                    <div className={"filter-textfield-label"}>
                        <label htmlFor="search-field-title">User id: </label>
                        <TextField
                            id="search-field-user-id"
                            type="text"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFilterUserIdText(e.target.value)
                            }
                            value={filterUserIdText}
                            placeholder={"Filter by user id"}
                        />
                    </div>
                    <Button type="button" onClick={handleClear}>X</Button>
                </div>
            </div>

        );

    }, [filterTitleText, filterUserIdText, filteredItems.length]);

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
                maxWidth: "100px"
            },
            {
                name: 'User id',
                selector: row => row.user_id,
                sortable: true,
                maxWidth: "100px",
            },
            {
                name: 'Title',
                selector: row => row.title,
                sortable: true,
                cell: ((row) => {
                    return (
                        <div className={"cell-title"}>
                            {row.title}
                        </div>
                    );
                })
            },
            {
                name: 'Due_on',
                selector: row => new Date(Date.parse(row.due_on)).toDateString(),
                sortable: true,
                maxWidth: "200px",
            },
            {
                name: 'Status',
                selector: row => row.status,
                sortable: true,
                maxWidth: "50px",
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
            <StyleSheetManager shouldForwardProp={isPropValid}>
                <DataTable
                    title="Todos"
                    columns={columns}
                    data={filteredItems}
                    theme="tableTheme"
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    progressPending={!isInitialized}
                    customStyles={customStyles}
                />
            </StyleSheetManager>
        </div>
    );

}
export default Todos;