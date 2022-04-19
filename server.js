const http = require('http')
const midi = require('midi')
const express = require('express')
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
const bodyParser = require('body-parser');
const app = express()
app.use(express.static('public'))

app.set('port', '3000')

const output = new midi.Output();

// Count the available output ports.
output.getPortCount();

// Get the name of a specified output port.
console.log(output.getPortName(1))

// Open the first available output port.
output.openPort(1);

process.stdin.on('keypress', (str) => {
    if(str==='c'){
        output.sendMessage([144,60,127]);
        output.sendMessage([128,60,127]);

    }
  });

const server = http.createServer(app)
server.on('listening', () => {
 console.log('Listening on port 3000')
})

let io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log("We have a new client: " + socket.id);

    socket.on('input',
    function(data) {

      var mapRange = function(from, to, s) {
        return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
      };
      
     let ccA = Math.floor(mapRange([0,1],[0,127],data.a));
     let ccB = Math.floor(mapRange([0,1],[0,127],data.b));
     let ccC = Math.floor(mapRange([0,1],[0,127],data.c));
     let ccD = Math.floor(mapRange([0,1],[0,127],data.d));


    output.sendMessage([176,1,ccA]);
    output.sendMessage([176,2,ccB]);     
    // output.sendMessage([177,3,ccC]);     
    // output.sendMessage([177,4,ccD]);     

    


    }
  );
  }
);


server.listen('3000')



