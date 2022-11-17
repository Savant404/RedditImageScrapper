const axios = require('axios');


const reddit_url = 'https://www.reddit.com/r/aww/new.json?limit=1';

axios.get(reddit_url)
    .then(response => {
        console.log(response.data.data.children[0].data.title);
    })