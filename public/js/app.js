const socket = io();
// const socket = io({transports: ['websocket'], upgrade: false});
// const moment = require('moment');
//////////////////display function
const render = function () {
    runListQuery();
};

const renderList = function (outputPlace, dataList) {
    dataList.forEach(element => {
        const output = $(outputPlace);
        const temp = $(`<div class='entry'>`);
        const tempButton = $('<span class=left>');
        tempButton.append($("<button type='submit' class='delEntry'>").append($("<img src='./trash-alt-solid.svg' style='height:18px;'/>")));
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
            // tempButton
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
    const day = moment().format('dddd');
    const date =moment().format('MMM');
    const year = moment().format('YYYY');
    $('#day').innerHTML =`${day}`;
    $('#date').innerHTML=`${date}`;
    $('#year').innerHTML=`${year}`;

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
    }
)


$(document).on('click', '#submitButton', submitFunc);



//////////delete Function////////////////
// const deleteFunc = function (e) {
//     e.preventDefault();
//     console.log('get in delete');
//     let parent = $(this).parent().parent().text();
//     const selEntry = {
//         newInput: parent
//     };
//     console.log(selEntry);
//     $.ajax({ url: '/api/list', method: 'DELETE', data: selEntry }).then(
//         function (result) {
//             console.log('get in delete result function');  
//             alert('werwer');
//             if (result) {
//                 console.log('input data in delete method ajax', data);
//                 alert('You just deleted an entry!');
//             } else {
//                 alert("There's a problem with your submision");
//             }

//         }
//     );

// };


// $(document).on('click', '.delEntry', deleteFunc);


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
    }
)


$(document).on('click', '.inputBox', putFunc);






