const express = require('express');
const app = express();
const port = 2220;
const expressHbs = require('express-handlebars');
const Handlebars = require('handlebars');

Handlebars.registerHelper('getUniqueValues', function (array, property, options) {
    const uniqueValues = [...new Set(array.map(item => item[property]))];
    return uniqueValues.map(value => options.fn(value));
  });

Handlebars.registerHelper('if_eq', function (a, b, options) {
    if (a == b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('unlessCond', function (v1, v2, options) {
    if (v1 !== v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});


app.use(express.static(__dirname + '/html'));

app.engine('hbs', expressHbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'layout',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        showDate: (date) => {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        showIndex: (index) => index + 1,
    }
}));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/danh-sach'));
app.use('/danh-sach', require('./routes/manageListRouter'));
app.use('/yeu-cau', require('./routes/requestRouter'));
app.use('/bao-cao', require('./routes/reportRouter'));
app.use('/diem-dat-bang-quang-cao', require('./routes/adsAddressRouter'));
app.use('/bang-quang-cao', require('./routes/adsManageRouter'));
app.use('/ho-so',require('./routes/profileRouter'));
app.use('/doi-mat-khau',require('./routes/changePasswordRouter'));


app.get('/createTables', (req, res) => {
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('Tables created!');
    });
});

// app.set('view engine', 'hbs');
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
