let express = require('express');
let fs = require('fs');

let app = express();
let port = 3000;

app.use(express.static('public'));
app.use(express.json());

//Sending a list of competitors to the client
app.get('/get_competitors', (req, res) => {
    console.log(`A request for competitors...`);
    let data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

    //TODO: z objektu data poslat závodníky

    res.json(data);
});

//Adding new competitor to the database
app.post('/add_competitor', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./data.json', 'utf8')); //reads and parses data from the database
    let categoryExists = false; //keeps track if the recieved category is new or not

    //searches through catergories, if it exist, it writes a new competitor in it
    for (const [key, value] of Object.entries(data)) {
        if (data[key].category == req.body.category) {
            categoryExists = true;
            data[key]['contestanst'].push({ 'name': req.body.name, 'yearOfBirth': req.body.yearOfBirth });
        }
    }   

    //if no such category exist, it creates a new category
    if (!categoryExists) {
        console.log("Adding a new category!")
        data[req.body.category] = { 'category': req.body.category, 'contestanst': [{ 'name': req.body.name, 'yearOfBirth': req.body.yearOfBirth }]};
    }

    //writes new data in the database
    fs.writeFile('./data.json', JSON.stringify(data), 'utf8', () => { console.log("New competitor saved successfully!") });
    res.json({msg: 'Success!', data: req.body}); //sends back success message and the request data
});

let server = app.listen(port, () => {
    console.log(`Server started on ${port}`);
});