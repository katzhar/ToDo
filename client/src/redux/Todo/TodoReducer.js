const initialState = {
    todos: []
};

function TodoReducer(state = initialState, action) {
    switch (action.type) {
        // case 'IS_USER_AUTH':
        //     return {
        //         ...state,
        //         isAuth: action.data
        //     };
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case 'SET_TODO':
            return {
                ...state,
                todos: action.data
            };
        case 'SORT_TODO':
            let res = [];
            let newState = [...state.todos];
            switch (action.param) {
                case "date":
                    res = newState.sort((a, b) => new Date(a[action.param]).getTime() - new Date(b[action.param]).getTime());
                    break;
                case "title":
                    res = newState.sort((a, b) => {
                        return a[action.param] - b[action.param];
                    })
                    break;
                case "type":
                    res = newState.sort((a, b) => a[action.param].localeCompare(b[action.param]));
                    break;
                case "sortby":
                default:
                    res = newState
            }
            return {
                ...state,
                todos: res
            };
        case 'EDITMODE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, editMode: !todo.editMode } : todo
                )
            };
        case 'EDIT_TODO_DATE':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, date: action.data } : todo
                )
            };
        case 'EDIT_TODO_TEXT':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, title: action.data } : todo
                )
            };
        case 'EDIT_TODO_TYPE':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, type: action.data } : todo
                )
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed } : todo
                )
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload)
            };
        default:
            return state;
    }
}

export default TodoReducer;