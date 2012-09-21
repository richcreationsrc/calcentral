var calcentral = calcentral || {};
calcentral.Widgets = calcentral.Widgets || {};
/**
 * @class tasks
 *
 * @description
 * The 'tasks' widget (i.e. Tasks and Assignments) displays aggregated set of tasks and
 * assignments from Canvas, bCal, or other sources, divided into groups per due-date.
 * Tasks are not editable in this version.
 *
 * @version 0.0.1
 * @param {String} tuid Unique id of the widget
 */
calcentral.Widgets.tasks = function(tuid) {

	/** VARIABLES. **/

	var $tasksContainer = $('#cc-widget-tasks');
	var $tasksList = $('.cc-tasks-list', $tasksContainer);
	var $tasksListTemplate = $('#cc-widget-tasks-template', $tasksContainer);
	var $taskLoopTemplate = $('#cc-taskloop-template', $tasksContainer);

	/**
	 * Given data for task/assignments, adds additional fields to each element,
	 * and outputs new data structure organized into time sections (past/present/future)
	 * @param {object} data JSON from Canvas and bSpace
	 */
	var renderTasksAssignments = function(data) {

		var currentTime = new Date();
		// "Tomorrow" is 1 second after midnight on the next calendar date, NOT 24 hours from now.
		var tomorrow = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 0, 0, 1);

		// Init an empty object into which we'll rewrite the data structure, separating tasks into today, tomorrow, future
		// We do some in-place modification of the data object first, then write the completed objects out to sections of newData.
		var newData = {
			'today': [],
			'tomorrow': [],
			'future': []
		};

		// Convert timestamps to friendly dates and set overdue flags.
		$.each(data.tasksAssignments, function(index, value){

			// **** TODO: POC ONLY **** monkey-patch dates so we always have items for today, tomorrow, and future
			// Ignore the stored timestamps and dynamically generate new ones at a variety of ranges.
			var theDateEpoch = currentTime.getTime() / 1000;

			if (index < 2) {
				data.tasksAssignments[index].dueDate = theDateEpoch; // Today
			} else if (index < 4) {
				data.tasksAssignments[index].dueDate = theDateEpoch + 86400; // Tomorrow
			} else if (index < 6) {
				data.tasksAssignments[index].dueDate = theDateEpoch + 172800; // Upcoming
			} else {
				data.tasksAssignments[index].dueDate = theDateEpoch + 1672800; // Far future
			}
			// END POC TEMPORARY


			var dueDate = new Date(value.dueDate * 1000);
			var friendlyDate = dueDate.getMonth() + '/' + dueDate.getDate();
			data.tasksAssignments[index].friendlyDate = friendlyDate;

			// Set overdue property
			if (currentTime > dueDate && value.completed === false) {
				data.tasksAssignments[index].overdue = true;
			}

			// Set today/tomorrow/future properties. Using .toDateString() for compares because JS' getDate() reckoning is brain-dead.
			// 8/20/2012 != 9/20/2012 Solved via http://stackoverflow.com/questions/6921606/javascript-today-function
			if (currentTime.toDateString() === dueDate.toDateString()) { // Today
				newData.today.push(data.tasksAssignments[index]);

			} else if (tomorrow.toDateString() === dueDate.toDateString()) { // Tomorrow
				newData.tomorrow.push(data.tasksAssignments[index]);

			} else if (dueDate > currentTime) {
				newData.future.push(data.tasksAssignments[index]);
			}
		});

		// Sort each sub-array by dueDate.
		// In future, we may want to presort data rather than post (but if we have a lot of past tasks it'll be inefficient)
		var sortDate = function(a, b) {
			return parseFloat(a.dueDate - b.dueDate);
		};

		newData.today = newData.today.sort(sortDate);
		newData.tomorrow = newData.tomorrow.sort(sortDate);
		newData.future = newData.future.sort(sortDate);

		var partials = {
			'taskLoop': $taskLoopTemplate.html()
		};

		calcentral.Api.Util.renderTemplate({
			'container': $tasksList,
			'data': newData,
			'partials': partials,
			'template': $tasksListTemplate
		});
	};

	var loadTasksAssignments = function() {
		return $.ajax({
			'url': '/dummy/tasks-assignments.json'
		});
	};

	if($tasksContainer.length) {
		$.when(loadTasksAssignments()).done(renderTasksAssignments);
	}

};
