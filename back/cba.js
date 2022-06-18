const express = require('express');
const app = express();
const fs = require('fs');
const uuid = require('uuid');
const port = process.env.PORT || 3000;

 const cookies = [];

app.listen(port, () => {
    console.log('Server is running on port 3000');
})

function getID() {
    return uuid.v4();
}

const CreateData = () => {
    let cookie = {
        id: getID()
    }

    cookies.push(cookie);
    
    let data = JSON.stringify(cookies);

    fs.writeFileSync('data.json', data, 'utf-8');
    return data;
}

module.exports = fs, getID;