const axios = require('axios');

axios.get('https://json.geoiplookup.io/')
  .then(res => console.log('Статус:', res.status, '\nДлина HTML:', res.data.length))
  .catch(err => console.error('Ошибка:', err.message));