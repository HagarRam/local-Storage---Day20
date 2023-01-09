'use strict';
const tableForm = document.getElementById('table-form');
const tableInput = document.getElementById('table-input');
const tableList = document.getElementById('table-list');
let tables = JSON.parse(localStorage.getItem('chair')) || [];

function addTable(event) {
	event.preventDefault();
	const chair = {
		id: Date.now(),
		text: tableInput.value,
		completed: false,
	};
	tables.push(chair);
	localStorage.setItem('tables', JSON.stringify(tables));
	tableInput.value = '';
	renderTasks();
}
function renderTasks() {
	tableList.innerHTML = '';
	for (let i = 0; i < tables.length; i++) {
		const chair = tables[i];
		const li = document.createElement('li');
		li.innerHTML = `
        <label id="label">
          <input type="checkbox" onchange="toggleCompletion(${chair.id})" 
          ${chair.completed && 'checked'} id="task-${chair.id}">
          ${chair.text}
        </label>
        <button type="button" id="delete-${chair.id}" 
        onclick="deleteTask(${chair.id})">Delete</button>
      `;

		li.className = chair.completed ? 'completed' : 'not-completed';
		tableList.appendChild(li);
		console.log(tableList);
	}
}
function toggleCompletion(id) {
	for (let i = 0; i < tables.length; i++) {
		const currentTask = tables[i];
		if (tables[i].id === id) {
			currentTask.completed = !currentTask.completed;
		}
	}
}
function deleteTask(id) {
	const chairIndex = tables.findIndex(function (chair) {
		return chair.id === id;
	});
	if (chairIndex !== -1 && tables[chairIndex].completed) {
		tables.splice(chairIndex, 1);
		localStorage.setItem('tasks', JSON.stringify(tables));
		renderTasks();
	} else {
		alert('Not Completed, please complete the task!');
	}
}
tableForm.addEventListener('submit', addTable);
renderTasks();
