import http from 'http';
import path from 'path';
import serveStatic  from 'serve-static';
import finalhandler from 'finalhandler';
import { Server } from "socket.io";
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serve =  serveStatic(path.join(__dirname, 'public'), {index: 'index.html'});
const httpServer = http.createServer((req,res) =>
    serve(req, res, finalhandler(req, res))
);

httpServer.listen(9001, () => { console.log(`http://localhost:9001`); });

const newUsers = [];
const io = new Server(httpServer);
io.on('connection', (socket) => {
    socket.on('pseudo:newUser', (pseudo) => {
        if(newUsers.includes(pseudo)) {
            socket.emit("pseudo:newUser:exists") 
        } else {
            newUsers.push(pseudo)
            socket.emit("pseudo:newUser:connected") 
        }
    })
});