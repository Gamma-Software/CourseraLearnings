var task_counter = 0;
var tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks!= null && tasks!= undefined){
    tasks = tasks;
    console.log(tasks);
}
else{
    tasks = [{id: "task0", data: "This is my task", done: false}, {id: "task1", data: "This is my second task", done: false}];
}

initTasks(tasks);

function initTasks(data){
    task_counter = data.length;
    for (var i=0; i<data.length; i++){
        console.log(data[i]);
        if (data[i].done == true){
            task_counter = task_counter - 1;
            $('#list-tasks').append('<li class="task taskDone" id="task'+(i)+'" onclick="deleteTask('+i+')">'+data[i].data+'</li>');
        }else{
            $('#list-tasks').append('<li class="task" id="task'+(i)+'" onclick="deleteTask('+i+')">'+data[i].data+'</li>');
        }
    }
    updateCounter();
}


function addTask(event){
    form_input = $('#taskInput').val()
    event.preventDefault();
    if (form_input!= ""){
        task_counter = task_counter + 1;
        $('#list-tasks').append('<li class="task" id="task'+task_counter+'" onclick="deleteTask('+task_counter+')">'+form_input+'</li>');
        tasks = tasks.concat({id: 'task'+task_counter, data: form_input, done: false})
        localStorage.setItem('tasks',  JSON.stringify(tasks));
        monitorData();
        document.getElementById("form-add-task").reset();
        updateCounter();
    }
}
$('#form-add-task').submit(function(event){
    addTask(event);
});

$('#form-delete-all').submit(function(event){
    localStorage.clear();
});

function deleteTask(taskId){
    var task = $('#task'+taskId)
    if (!task.hasClass('taskDone')) {
        task_counter = task_counter - 1;
        task.addClass("taskDone");
        updateCounter()
        tasks[taskId].done = true;
    }else{
        task_counter = task_counter + 1;
        task.removeClass('taskDone');
        updateCounter();
        tasks[taskId].done = false;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    monitorData();
};

function updateCounter(){
    $('#totalTasks').html(task_counter)
}

function monitorData() {
    for (var i=0; i<tasks.length; i++){
        console.log(tasks[i]);
    }
}