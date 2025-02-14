const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {

    console.log('req >>',req.query);

    res.send('Hello World!');
})

const mysql_route = require('./routes/mysql-route')

app.get('/sysinfo', async (req, res) => {

    const sysinfo = await mysql_route.system_info();

    console.log(sysinfo)

    res.send(sysinfo);
})



const alchemy_route = require('./routes/alchemy-route')

app.get('/alchemy', async (req, res) => {

    const alchemy = await alchemy_route.alchemy_test();

 //   console.log(alchemy)

    res.send(alchemy);
})


app.listen(port, () => {

  console.log(`Example app listening on port ${port}`)
})

