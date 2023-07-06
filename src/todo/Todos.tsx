import {useEffect, useRef, useState} from "react";
import {TodoModel} from "./TodoModel.ts";

const Todos = () => {
    const isInitialized = useRef(false);
    const [todos, setTodos] = useState<TodoModel[]|undefined>();

    const getApiData = async () => {
        const response = await fetch(
            "https://gorest.co.in/public/v2/todos/"
        ).then((response) => response.json()) as TodoModel[];

        setTodos(response);
    };

    useEffect(() => {
        if (isInitialized.current) return;
        isInitialized.current = true;

        getApiData();
    }, []);


    return (<>{}</>);

}
export default Todos;