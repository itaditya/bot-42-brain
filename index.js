require('dotenv').config();
const request = require('superagent');
const base64 = require('base-64');

const BASE_URL = 'https://api.github.com';
const TOKEN = process.env.TOKEN;

(async() => {
  // Create file
  const COMMIT_MSG = process.argv[2];
  const FILE_CONTENT = process.argv[3];

  const OWNER = 'itaditya';
  const REPO_NAME = 'test-for-my-gitbot';
  const FILE_PATH = 'folder-2/test5.txt';

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
    console.log('OOPS !! Some Error Occured ....');
    console.log('err', err);
  }
})()
