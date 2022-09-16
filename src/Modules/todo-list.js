export {list, projectList}
import isToday from 'date-fns/isToday';

const Todo = (title, description, due, priority) => {
    let isDone = false;
    let id = null;
    
    const setID = (n) => {
        id = n;
    }
    const getID = () => id;
    const getTitle = () => title;
    const getPriority = () => priority;
    const getDue = () => due;
    const getStatus = () => isDone;
    const changeTitle = (n) => {
        title = n;
    };

    const changeDescription = (n) => {
        description = n;
    };

    const changeDue = (n) => {
        due = new Date(n.target.value);
    };

    const changePriority = () => {
        priority = !priority;
    };

    const changeStatus = (n) => {
        isDone = n;
    }

    return {
        setID,
        getID,
        changeTitle,
        changeDescription,
        changeDue,
        changePriority,
        changeStatus,
        getTitle,
        getDue,
        getStatus,
        getPriority,
    };
}

const list = (() => {
    let list = [];

    const getCount = () => list.length;

    const addTodo = () => {
        let todo = Todo('Title', 'description', null, false);
        todo.setID(list.length);
        list.push(todo);
        return todo;
    }

    const updateTodo = (id) => {
        for (let i = id; i < list.length; i++) {
            list[i].setID(i);
        }
    }

    const deleteTodo = (id) => {
        list.splice(id, 1);
    }

    const changeTitle = (title, id) => {
        list[id].changeTitle(title);
    }

    const changeDescription = (description, id) => {
        list[id].changeDescription(description);
    }

    const changeDue = (e) => {
        let id = e.target.parentElement.attributes.key.value;
        list[id].changeDue(e);
    }

    const changePriority = (e) => {
        let id = e.target.parentElement.parentElement.attributes.key.value;
        console.log('test');
        const todo = document.querySelector(`div[key="${id}"]`);
        todo.classList.toggle('priority');
        list[id].changePriority();
    }

    const changeStatus = (e) => {
        let id = e.target.parentElement.attributes.key.value;
        list[id].changeStatus(e.target.checked);
        const title = document.querySelector(`div[key="${id}"] .title`);
        title.classList.toggle('done');
    }

    const getAll = () => {  
        return list.filter(() => true);
    }

    const getToday = () => {
        return list.filter((item) => isToday(item.getDue()));
    }

    const getImportant = () => {
        return list.filter((item) => (item.getPriority() === true));
    }

    return {
        getCount,
        addTodo,
        updateTodo,
        deleteTodo,
        changeTitle,
        changeDescription,
        changeDue,
        changePriority,
        changeStatus,
        getAll,
        getToday,
        getImportant,
        
    }

})();

const Project = (title) => {
    let id = null;
    let todos = [];

    const getID = () => id;

    const setID = (n) => {
        id = n;
    }

    const getTitle = () => title;

    const addTodo = (todo) => {
        todos.push(todo);
    }

    const getAll = () => todos.filter(() => true);
    
    return {
        getID,
        setID,
        getTitle,
        addTodo,
        getAll,
    }
}

const projectList = (() => {
    let projects = [];
    let activeProject = null;

    const getCount = () => projects.length;

    const addProject = (title) => {
        title = title || 'Project';
        let project = Project(title);
        project.setID(projects.length);
        projects.push(project);
        return project;
    }

    const deleteProject = (id) => {
        for (let item in projects.splice(id, 1)) {
            list.deleteTodo(item.getID);
        }
    }

    const updateProject = (id) => {
        for (let i = id; i < projects.length; i++) {
            projects[i].setID(i);
        }
    }

    const setActive = (id) => {
        if (id === null) {
            activeProject = null;
            return;
        }
        activeProject = projects[id];
    }

    const addTodo = (todo) => {
        if (activeProject !== null) {
            activeProject.addTodo(todo);
        }
    }

    const getActiveTodos = () => {
        return activeProject.getAll();
    }

    return {
        addProject,
        deleteProject,
        updateProject,
        getCount,
        setActive,
        addTodo,
        getActiveTodos
    }
})();