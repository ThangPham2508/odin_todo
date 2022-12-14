import pageLoad from './Modules/pageLoad.js';
import { DOMManip } from './Modules/DOM.js';
import { list, projectList } from './Modules/todo-list.js';
import { display } from './Modules/display.js';
import './style.css';
let ghpages = require('gh-pages');

pageLoad();

const addtask = document.querySelector('.addtask');
addtask.addEventListener('click', () => {
  const todo = list.addTodo();
  DOMManip.createTodo(todo);
  projectList.addTodo(todo);
});

const todolist = document.querySelector('.todolist');
const nav = document.querySelectorAll('.categories button');

nav.forEach((item) => {
  item.addEventListener(
    'click',
    (e) => {
      let { target } = e;
      while (target.tagName !== 'BUTTON') {
        target = target.parentElement;
      }
      todolist.textContent = '';
      for (const item of nav) {
        item.classList.remove('selected');
      }
      const projectNav = document.querySelectorAll('.projectList .project');
      for (const item of projectNav) {
        item.classList.remove('selected');
      }
      target.classList.add('selected');
      if (target.classList.contains('alltasks')) {
        display.displayAll();
      } else if (target.classList.contains('today')) {
        display.displayToday();
      } else {
        display.displayImportant();
      }
      projectList.setActive(null);
      console.log(target.classList[0]);
    },
    {
      capture: false,
    },
  );
});

const project = document.querySelector('.addproject');
project.addEventListener('click', () => {
  DOMManip.promptProject();
});

ghpages.publish('dist', function(err) {});