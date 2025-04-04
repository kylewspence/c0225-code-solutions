'use strict';
const $taskList = document.querySelector('.task-list');
if (!$taskList) throw new Error('.task-list query failed');
$taskList.addEventListener('click', handleTaskClick);
function handleTaskClick(event) {
  const eventTarget = event.target;
  console.log('event-target', event.target);
  console.log('Tag name', eventTarget.tagName);
  if (eventTarget.tagName === 'BUTTON') {
    const taskListItem = eventTarget.closest('.task-list-item');
    console.log('Closest .task list item', taskListItem);
    if (taskListItem) {
      console.log('Removing:', taskListItem);
      taskListItem.remove();
    }
  }
}
