const socket = io();
// const moment = require('moment');
//////////////////display function
const render = function () {
    runListQuery();
};

const renderList = function (outputPlace, dataList) {
    dataList.forEach(element => {
        const output = $(outputPlace);
        const temp = $(`<div class='entry'>`);
        const tempSpan = $("<span class='entryText'>").text(`${element.newInput}`);
        let renderCheck = 'unchecked';
        if(element.inputBox){
            renderCheck = 'checked';
        }else{
            renderCheck = 'unchecked';
        }
        temp.append(
            tempSpan,
            $(`<input type='checkbox' class='inputBox' ${renderCheck}>`)

        );
        output.append(temp);
    });
};

const runListQuery = function () {
    $.ajax({ url: "/api/list", method: "GET" }).then(
        function (e) {
            renderList('#displayList', e);
        }
    );
}

render();


const renderDate = function(){
    const day = moment().format('ddd');
    const date =moment().format('MMM D');
    const year = moment().format('YYYY');
    $('#day').text(`${day}`);
    $('#date').text(`${date}`);
    $('#year').text(`${year}`);
    console.log(day,date,year);

}


renderDate();

///////////////////////////submit function
const submitFunc = function (e) {
    e.preventDefault();
    console.log('get in submit');
    const newEntry = {
        newInput: $('#newInput').val().trim(),
        inputBox: false
    };
    console.log(newEntry);
    for (let key in newEntry) {
        if (newEntry[key] === '') {
            alert('Please enter the task');
            return;
        }
    }

    $.ajax({ url: '/api/list', method: 'POST', data: newEntry }).then(
        function (data) {
            if (data) {
                console.log('input data in post method ajax', data);
                // alert('You just added a new entry!');
                $('#newInput').val('');
            } else {
                alert("There's a problem with your submision");
            }

        }
    );
    console.log('before new-task emit',newEntry);
    socket.emit('new-task',newEntry);
};
console.log('in app.js');

socket.on('emit-task',function(data){
        console.log('emit-task',data);
        //render task here
        const output = $('#displayList');
        const temp = $(`<div class='entry'>`);
        const tempSpan = $("<span class='entryText'>").text(`${data.newInput}`);
        let renderCheck = 'unchecked';
        if(data.inputBox){
            renderCheck = 'checked';
        }else{
            renderCheck = 'unchecked';
        }
        temp.append(
            tempSpan,
            $(`<input type='checkbox' class='inputBox' ${renderCheck}>`)

        );
        output.append(temp);
    }
)


$(document).on('click', '#submitButton', submitFunc);


/////////put function: for update and delete/////////////

const putFunc = function (e) {
    e.preventDefault();
    console.log('get in putFunc');
    let parent = $(this).parent();
    const selEntry = {
        newInput: parent.text()
    };
    console.log(selEntry);
    $.ajax({ url: '/api/list', method: 'PUT', data: selEntry }).then(
        function (data) {
            if (data) {
                console.log('input data in put method ajax', data);
                // alert('You just updated a new entry!');
            } else {
                alert("There's a problem with your submision");
            }

        }
    );

    socket.emit('update-task',selEntry);
};

socket.on('emit-updateTask',function(data){
    console.log('emit-updateTask',data);
    //update display here
    // let checkBox = $(this.)
    // $.ajax({ url: "/api/list", method: "GET" }).then(
    //     function (e) {
    //         updateList(e,data);
    //     }
    // );

    // if(!data.inputBox){
    //     $(this).parent().text('');
    // }else{
    //     $(this).parent().childNodes().checked=true;
    // }
    location.reload();
})

const updateList=function(dataList,dataText){
    const result = dataList.find(e=>{
        e.newInput===dataText.newInput;
    });
    return result;
    if(result.inputBox){
    }
}


$(document).on('click', '.inputBox', putFunc);






