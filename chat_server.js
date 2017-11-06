var io = require('socket.io')();

var nicknames = [];

io.sockets.on('connection', function (socket) {
    socket.on('nickname',function (data, callback){
    	if(nicknames.indexOf(data) != -1 || data ==''){
    		callback(false);
    	}else{
    		callback(true);
    		nicknames.push(data);
    		socket.nickname = data;
        	console.log('Nicknames are: ' + nicknames);
        	io.sockets.emit('nicknames', nicknames);
    	}
    });
    socket.on('user message', function (data, callback) {
        if(data ==''){
            callback(false);
        }else{
            callback(true);
            io.sockets.emit('user message', { 
                nick: socket.nickname, 
                message: data 
            });
        }
    });
    socket.on('disconnect', function(){
    	if(!socket.nickname) return;
    	if(nicknames.indexOf(socket.nickname) > -1){
    		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    	}
    	console.log('Nicknames are: ' + nicknames);
    	io.sockets.emit('nicknames', nicknames);
    });
});

exports.listen = function (server) {
    return io.listen(server);
};