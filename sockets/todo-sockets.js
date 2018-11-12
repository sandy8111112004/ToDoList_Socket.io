task={};
module.exports = function(io){
    console.log('running');
    io.on('connection', (socket)=>{
        socket.on('new-task',function(data){
            console.log('socket new-name',data);
            task[data.newInput]=socket;
            io.emit('emit-task',object.keys(task));   
        });

        //SOCKET ROUTEs
        socket.on('update-task',function(updateData){
            console.log('socket update-task',updateData);
            io.emit('emit-updateTask',updateData);
            
        });
    })
}