const request = require('superagent');
const base64 = require('base-64');

const BASE_URL = 'https://api.github.com';
const TOKEN = 'BOT_ACCESS_TOKEN';

/*
(async () => {
  // Min code for Authorized Request
  const res = await request
    .get(BASE_URL)
    .set('Authorization', `token ${TOKEN}`)
  console.log('res.body', res.body);
})()
*/

(async() => {
  // Create file
  const COMMIT_MSG = process.argv[2];
  const FILE_CONTENT = process.argv[3];

  const OWNER = 'YOUR_NAME';
  const REPO_NAME = 'NAME_OF_YOUR_REPO'; //file will be created here.
  const FILE_PATH = 'folder-1/test.txt';

  const API_URL = `${BASE_URL}/repos/${OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
  try {
    const res = await request
      .put(API_URL)
      .send({
        message: COMMIT_MSG,
        content: base64.encode(FILE_CONTENT)
      })
      .set('Authorization', `token ${TOKEN}`);
    console.log('File Created, see: ', res.body.content.html_url);
  } catch (err) {
    if(err) {
      console.log('OOPS !! Some Error Occured ....')
    }
  }
})()
