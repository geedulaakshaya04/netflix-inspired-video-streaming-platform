const db = require('./database');

db.all("SELECT title, poster_path FROM movies WHERE title = 'Barbie'", [], (err, rows) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Current Barbie Record:", rows);
    }
});
