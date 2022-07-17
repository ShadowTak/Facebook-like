require('events').EventEmitter.defaultMaxListeners = 0; 
const prompt = require('prompt-sync')();
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const sleep = require('await-sleep')

const postid = prompt('Id Post: ');
const file_token = prompt("File Token : ")
var i = 0
var token = fs.readFileSync(file_token, 'utf8');
var token_use = token.split('\r\n');


async function main() {
  for(var i = 0; i < token_use.length; i++) {
    await send(token_use[i]);
    await sleep(1000);
  }
}


async function send(token_use) {

  var data = new FormData();
  data.append('access_token', token_use);

  var config = {
    method: 'post',
    url: 'https://graph.facebook.com/'+postid+'/likes',
    headers: { 
      ...data.getHeaders()
    },
    data : data
  }

  await axios(config)
  .then(function (response) {
    if (response.status == 200) {
      i++
    }
    console.log("Count",i)
  })
  .catch(function (error) {
    console.log(error)
  });

}

main()