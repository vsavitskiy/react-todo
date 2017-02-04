/**
 * Created by vladimir on 04.02.17.
 */

export const addTodo = (list, item) => [...list, item];
export const generateId = () => Math.floor(Math.random() * 100000);