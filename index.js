const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyPaser = require('body-parser');
const { response } = require('express');
const app = express();

app.use(bodyPaser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
var dataz = [];


async function getSubsInfo(subreddits, count, category) {
    const subArray = subreddits.split(',');
    let reddit_url = '';
    var results = [];


    try{

         subArray.forEach((sub, index) => {
            let reddit_url = (`https://www.reddit.com/r/${sub}/${category}.json?limit=${count}`);

            //console.log(reddit_url);
            //console.log(index);
            axios.get(reddit_url)
                .then(response => {
                    x = response
                    for (let i = 0; i < count; i++){
                        const items = x.data.data.children[i].data;
                        var results = {
                            url: items.url,
                            title: items.title,
                            subreddit: items.subreddit
                        };
    
                        dataz.push(results);
   }
                
                })
                .catch(error => {
                    console.log(error);
                })
    
        });
        
    }
 catch(error) {
    console.log(error);

    }

}


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/bot', (req, res) => {
    const { subreddits, count, category } = req.body;
 
    getSubsInfo(subreddits, count, category)
    .then(console.log(dataz))
   
    res.render('results', {  
       dataz: dataz
    });

    dataz = [];

})


app.listen(3000, () => {
    console.log('Server Started at Port 3000...');
});


