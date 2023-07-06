import {useEffect, useRef, useState} from "react";
import {TodoModel} from "./TodoModel.ts";

export function useTodos() {
    const isInitialized = useRef(false);
    const [todos, setTodos] = useState<TodoModel[]>([]);

    const getApiData = async () => {
        console.log("fetching")
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

    return {todos: todos, isInitialized : isInitialized.current};
}