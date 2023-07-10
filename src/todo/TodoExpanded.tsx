import {TodoModel} from "./TodoModel.ts";

interface TodoExpandedProps {
    data: TodoModel
}

const TodoExpanded = ({data}: TodoExpandedProps) => {

    return (
        <div className={"todo-expanded"}>
            {Object.entries(data).map(([key, value]) => {
                console.log(`key: ${key}`);
                return (<TodoExpandedRow name={key} value={value}/>);
            })}
        </div>
    );
};

interface TodoExpandedRowProps {
    name: string;
    value: any
}

const TodoExpandedRow = (props: TodoExpandedRowProps) => {
    const {name, value} = props;
    console.log(name)
    return (
        <div className={"todo-expanded-row"}>
            <h4>{name}</h4>
            <h5>{value}</h5>
        </div>
    );
};

export default TodoExpanded;