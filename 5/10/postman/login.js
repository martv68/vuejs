const axios = require('axios');

axios.post('https://reqres.in/api/login', {
    email: "george.bluth@reqres.in",
    password: "qwerty"
}, {
    headers: {
        "x-api-key": "pub_3bd601787fe5a7413da7da955a138320ec69b5fe2033b26ab7f0c832ebfa55e7"
    }
})
.then(res => console.log(res.data))
.catch(err => console.log(err.response.data));