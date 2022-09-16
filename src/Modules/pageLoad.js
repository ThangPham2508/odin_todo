import logoimg from './../Images/calendar.png';
import alltask from './../Images/alltask.png';
import today from './../Images/today.png';
import important from './../Images/important.png';

export default function pageLoad() {
    const content = document.querySelector('#content');

    const header = document.createElement('div');
    header.setAttribute('id', 'header');
    const logo = document.createElement('div');
    logo.classList.add('logo');
    const img = new Image();
    img.src = logoimg;
    img.classList.add('icon');
    const logotxt = document.createElement('div');
    logotxt.classList.add('logotxt');
    logotxt.textContent = 'TODO LIST';
    logo.appendChild(img);
    logo.appendChild(logotxt);
    header.appendChild(logo);

    const body = document.createElement('div');
    body.setAttribute('id', 'body');

    const navbar = document.createElement('div');
    navbar.setAttribute('id', 'navbar');
    const categories = document.createElement('div');
    categories.classList.add('categories');
    let arr1 = [alltask, today, important];
    let arr2 = ['All Tasks', 'Today', 'Important'];
    for (let i = 0; i < 3; i++) {
        const button = document.createElement('button');
        button.classList.add(arr2[i].toLowerCase().replace(/\s/g,''));
        const img = new Image();
        img.src = arr1[i];
        img.classList.add('icon');
        const div = document.createElement('div');
        div.textContent = arr2[i];
        button.appendChild(img);
        button.appendChild(div);
        categories.appendChild(button);
    }
    const projects = document.createElement('div');
    projects.classList.add('projects');
    const heading = document.createElement('div');
    heading.classList.add('heading');
    const text = document.createElement('div');
    text.textContent = 'Projects';
    const button = document.createElement('button');
    button.classList.add('addproject');
    button.textContent = '+';
    const projectList = document.createElement('div');
    projectList.classList.add('projectList');
    const prompt = document.createElement('div');
    prompt.classList.add('prompt');
    heading.appendChild(text);
    heading.appendChild(button);
    projects.appendChild(heading);
    projects.appendChild(projectList);
    projects.appendChild(prompt);
    navbar.appendChild(categories);
    navbar.appendChild(projects);

    const todos = document.createElement('div');
    todos.setAttribute('id', 'todos');
    const todolist = document.createElement('div');
    todolist.classList.add('todolist');
    todos.appendChild(todolist);

    /* addtask */
    const addtask = document.createElement('div');
    addtask.classList.add('addtask');
    const plus = document.createElement('span');
    plus.textContent = '+';
    addtask.appendChild(plus);
    const addtxt = document.createElement('span');
    addtxt.textContent = 'Add Task';
    addtask.appendChild(addtxt);
    todos.appendChild(addtask);
    

    body.appendChild(navbar);
    body.appendChild(todos);
    
    content.appendChild(header);
    content.appendChild(body);
}