import express from "express";
import ejs from "ejs";
import morgan from 'morgan';
import bodyParser from "body-parser";

const app = express();
app.set('views-engine', ejs);

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('public'));
app.use(logger)

function logger(res, req, next) {
    console.log("My first middleware");
    next();
}

let newListItems = [];

app.get('/', (req, res) => {
    let date = new Date();
    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    let day = date.toLocaleDateString('en-US', options);
    res.render('index.ejs', {todayDate: day, newListItems: newListItems});
});

app.post('/', (req, res) => {
    let newItem = req.body.newItem;
    newListItems.push(newItem);
    res.redirect('/');
});

app.listen(3000, () => console.log("listening..."));
