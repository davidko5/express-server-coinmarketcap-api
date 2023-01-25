const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { json } = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//----------------HARDCODED DATA----------------
let events = 
[
  {
    id: 1,
    name: 'Charity Ball',
    category: 'Fundraising',
    description: 'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
    featuredImage: 'https://placekitten.com/500/500',
    images: [
      'https://placekitten.com/500/500',
      'https://placekitten.com/500/500',
      'https://placekitten.com/500/500',
    ],
    location: '1234 Fancy Ave',
    date: '12-25-2019',
    time: '11:30'
  },
  {
    id: 2,
    name: 'Rescue Center Goods Drive',
    category: 'Adoptions',
    description: 'Come to our donation drive to help us replenish our stock of pet food, toys, bedding, etc. We will have live bands, games, food trucks, and much more.',
    featuredImage: 'https://placekitten.com/500/500',
    images: [
      'https://placekitten.com/500/500'
    ],
    location: '1234 Dog Alley',
    date: '11-21-2019',
    time: '12:00'
  }
];
//--------------------------------------------------------------
app.get('/events', (req, res) => {
    res.send(events);
});

app.get('/events/:id', (req, res) => {
    const id = Number(req.params.id);
    const event = events.find(event => event.id === id);
    res.send(event);
});

app.get('/', (req, res) => {
    const axios = require('axios');

    let response = null;
    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,ADA&convert=USD', {
            headers: {
                'X-CMC_PRO_API_KEY': 'PUT YOUR API KEY HERE',
            },
            });
        } catch(ex) {
            response = null;
            // error
            console.log(ex);
            reject(ex);
        }
        if (response) {
            // success
            const json = response.data;
            console.log(json);
            // SENDS DATA BACK
            res.send(json)
            resolve(json);
        }
    });
    
});

// listen on the port
app.listen(port);