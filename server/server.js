const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose')
const server = express();
const cors = require('cors');
const port = 8090;
const {readFile, writeFile, unlink} = require('fs').promises;

mongoose.connect('mongodb://localhost/users-db')

const middleware = [cors(), express.json({limit: '50mb'})];
middleware.forEach((it) => server.use(it));

const rFile = async () => {
    return await readFile(`${__dirname}/users.json`, {encoding: "utf8"})
        .then(text => {
            /* вернется текст из файла, а не объект джаваскрипта */
            return JSON.parse(text)
        })
        .catch(err => {
            axios(`https://jsonplaceholder.typicode.com/users`)
        .then(({data}) => {
                wFile(data)
            });
        });
};

const wFile = (data) => {
    return writeFile(`${__dirname}/users.json`, JSON.stringify(data), {encoding: 'utf8'})
};

server.get('/api/v1/users', async (req, res) => {
    const users = await rFile();
    await res.json(users)
});

server.post('/api/v1/users', async (req, res) => {
    const newUser = req.body;
    const users = await rFile();
    const usersId = users.sort((a, b) => {
        return  a.id - b.id
    })
    const id = usersId[usersId.length - 1].id + 1;
    const newUsersArr = [...users, {...newUser, id}];
    await wFile(newUsersArr);
    await res.json({status: 'success', id})
    console.log('id',newUser)
});

server.patch('/api/v1/users/:userId',async (req,res) => {
    const users = await rFile()
    const {userId} = req.params
    console.log(+userId)
    const updatedUser = req.body
    const usersUpdate = users.map((el)=> {
        return el.id === +userId
            ? {...el, ...updatedUser}
            : el
    })
    await wFile(usersUpdate)
    await res.json(usersUpdate)
})

server.delete('/api/v1/users/:userId', async (req, res) => {
    const users = await rFile()
    const {userId} = req.params
    console.log(userId)
    const deletedUser = users.filter((el) => {
        return el.id !==  +userId
    })
    await wFile(deletedUser)
    await res.json(deletedUser)
})

server.delete('/api/v1/users', (req, res) => {
    return unlink(`${__dirname}/users.json`)
    res.json({status: 'success delete'})
})

server.listen(port);

console.log(`Serving on http://localhost:${port}`);