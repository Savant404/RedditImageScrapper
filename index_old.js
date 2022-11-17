const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyPaser = require('body-parser');
const { response } = require('express');
require('dotenv').config();
const app = express();

app.use(bodyPaser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/bot', (req, res) => {
    const { subreddits, count, category } = req.body;
    const subArray = subreddits.split(',');
    let reddit_url = '';
    var results = [];
    var data = [];
 
    subArray.forEach((sub, index) => {
        let reddit_url = (`https://www.reddit.com/r/${sub}/${category}.json?limit=${count}`);
        //console.log(reddit_url);
        //console.log(index);
        axios.get(reddit_url)
            .then(response => {
                for (let i = 0; i < count; i++){
                    const items = response.data.data.children[i].data;
                    var results = [
                        {url: items.url},
                        {title: items.title},
                        {subreddit: items.subreddit}
                    ];

                    data.push(results);
                    console.log(data);
                    //console.log(data);
                    //console.log(response.data.data.children[i].data.url);
                    //console.log(response.data.data.children[i].data.title);
                    //console.log(response.data.data.children[i].data.subreddit);
                }
            

            })
            .catch(error => {
                console.log(error);
            })

    });

    console.log(data);
    console.log("data from outside loop");
    res.render('results', {
        data       
    });

});

app.get('/bot', (req, res) => {
    res.render('searchbar');
});

app.listen(3000, () => {
    console.log('Server Started at Port 3000...');
});


