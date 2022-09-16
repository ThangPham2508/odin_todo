import bin from './../Images/delete.png';
import priority from './../Images/priority.png';
import { display } from './display';
import {list, projectList} from './todo-list.js';

export const DOMManip = (() => {
    const showTextBox = (e) => {
        const textBox = document.createElement('input');
        textBox.setAttribute('type', 'text');

        const todo = document.querySelector(`div[key="${e.target.parentElement.attributes.key.value}"]`);
        e.target.removeEventListener('click', showTextBox);
        textBox.value = todo.childNodes[1].textContent;
        todo.childNodes[1].textContent = '';
        todo.childNodes[1].appendChild(textBox);
        
        textBox.addEventListener('keydown', (e) => {
            if (e.code === 'Enter') {
                const title = todo.querySelector('.title');
                title.textContent = e.target.value;
                title.addEventListener('click', showTextBox);
                list.changeTitle(e.target.value, todo.getAttribute('key'));
            }
        });
        
        
    }
    const updateTodo = (id) => {
        for (let i = id; i < list.getCount(); i++) {
            const todo = document.querySelector(`.todolist div[key="${+i+1}"]`);
            todo.setAttribute('key', i);
        }
        list.updateTodo(id);
    }
    const deleteTodo = (e) => {
        const todo = document.querySelector(`div[key="${e.target.parentElement.parentElement.attributes.key.value}"]`);
        const todolist = document.querySelector('.todolist');
        list.deleteTodo(todo.getAttribute('key'));
        updateTodo(todo.getAttribute('key'));
        todolist.removeChild(todo);
    }
    const createTodo = (item) => {
        const todolist = document.querySelector('.todolist');
        const todo = document.createElement('div');
        todo.classList.add('todo');
        todo.setAttribute('key', item.getID());
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'checkbox');
        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = item.getTitle();
        title.addEventListener('click', showTextBox);
        if (item.getStatus()) {
            title.classList.add('done');
            checkbox.checked = true;
        }
        const priorityButton = document.createElement('button');
        const priorityIcon = new Image();
        priorityIcon.classList.add('icon');
        priorityIcon.src = priority;
        priorityButton.appendChild(priorityIcon);
        if (item.getPriority()) {
            todo.classList.add('priority');
        }
        const due = document.createElement('input');
        due.setAttribute('type', 'date');
        due.valueAsDate = item.getDue();
        const deleteButton = document.createElement('button');
        const deleteIcon = new Image();
        deleteIcon.classList.add('icon');
        deleteIcon.src = bin;
        deleteButton.appendChild(deleteIcon);

        deleteButton.addEventListener('click', deleteTodo);
        due.addEventListener('change', list.changeDue);
        priorityButton.addEventListener('click', list.changePriority);
        checkbox.addEventListener('change', list.changeStatus);
        

        todo.appendChild(checkbox);
        todo.appendChild(title);
        todo.appendChild(priorityButton);
        todo.appendChild(due);
        todo.appendChild(deleteButton);
        todolist.appendChild(todo);
    }
    const updateProject = (id) => {
        for (let i = id; i < projectList.getCount(); i++) {
            const project = document.querySelector(`.project[key="${+i+1}"]`);
            project.setAttribute('key', i);
        }
        projectList.updateProject(id);
    }
    const deleteProject = (e) => {
        const project = document.querySelector(`.project[key="${e.target.parentElement.parentElement.attributes.key.value}"]`);
        const projects = document.querySelector('.projectList');
        projectList.deleteProject(project.getAttribute('key'));
        updateProject(project.getAttribute('key'));
        projects.removeChild(project);
    }
    const selectProject = (e) => {
        const todolist = document.querySelector('.todolist');
        const nav = document.querySelectorAll('.categories button');
        const projectNav = document.querySelectorAll('.projectList .project');
        let target = e.target;
        while (target.tagName !== 'BUTTON' || target.attributes.key === undefined) {
            target = target.parentElement;
        }
        projectList.setActive(target.attributes.key.value);
        todolist.textContent = '';
        for (let item of nav) {
            item.classList.remove('selected');
        }
        for (let item of projectNav) {
            item.classList.remove('selected');
        }
        target.classList.add('selected');
        display.displayProject();
    }
    const createProject = (item) => {
        const projects = document.querySelector('.projectList');
        const project = document.createElement('button');
        project.classList.add('project');
        project.setAttribute('key', item.getID());
        project.addEventListener('click', selectProject)
        const projectTitle = document.createElement('div');
        projectTitle.textContent = item.getTitle();
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        let deleteImg = new Image();
        deleteImg.src = bin;
        deleteImg.classList.add('icon');
        deleteBtn.addEventListener('click', deleteProject)
        deleteBtn.appendChild(deleteImg);

        project.appendChild(projectTitle);
        project.appendChild(deleteBtn);
        projects.appendChild(project);
    }
    const promptProject = () => {
        const prompt = document.querySelector('.prompt');
        const promptTxt = document.createElement('input');
        promptTxt.setAttribute('type', 'text');
        promptTxt.setAttribute('placeholder', 'project name');
        const add = document.createElement('button');
        add.classList.add('add');
        add.textContent = 'Add';
        add.addEventListener('click', () => {
            createProject(projectList.addProject(promptTxt.value));
            prompt.textContent = '';
        });
        const cancel = document.createElement('button');
        cancel.classList.add('cancel');
        cancel.textContent = 'Cancel';
        cancel.addEventListener('click', () => {
            prompt.textContent = '';
        })
        prompt.appendChild(promptTxt);
        prompt.appendChild(add);
        prompt.appendChild(cancel);
    }
    return {
        createTodo,
        createProject,
        promptProject,
    }
})();