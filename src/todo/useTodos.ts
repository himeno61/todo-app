import {useEffect, useRef, useState} from "react";
import {TodoModel} from "./TodoModel.ts";

export function useTodos() {
    const isInitialized = useRef(false);
    const [todos, setTodos] = useState<TodoModel[]>([]);

    const getApiData = () => {
        fetch(
            "https://gorest.co.in/public/v2/todos/"
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        }).then((values) => {
            setTodos(values);

        })
        .catch((error) => {
            console.log(error)
        });

    };

    useEffect(() => {
        if (isInitialized.current) return;
        isInitialized.current = true;

        getApiData();
    }, []);

    return {todos: todos, isInitialized: isInitialized.current};
}