// подключение express
const express = require("express");
const http = require('http');
const path = require('path');
const compression = require('compression');

// создаем объект приложения
const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, 'dist/social')));

// определяем обработчик для маршрута "*"
app.get('*', function(request, response){
     
    res.sendFile(path.join(__dirname, 'dist/social/index.html'));
});

const port = process.env.PORT || '9999';

app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('server running: ' + port));