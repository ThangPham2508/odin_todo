import {list, projectList} from './todo-list.js';
import {DOMManip} from './DOM.js';

export const display = (() => {

    const displayAll = () => {
        for (const item of list.getAll()) {
            DOMManip.createTodo(item);
        }
    }

    const displayToday = () => {
        for (const item of list.getToday()) {
            DOMManip.createTodo(item);
        }
    }

    const displayImportant = () => {
        for (const item of list.getImportant()) {
            DOMManip.createTodo(item);
        }
    }

    const displayProject = () => {
        for (const item of projectList.getActiveTodos()) {
            DOMManip.createTodo(item);
        }
    }

    return {
        displayAll,
        displayToday,
        displayImportant,
        displayProject
    }
})();