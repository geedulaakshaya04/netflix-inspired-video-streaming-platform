const db = require('./database');

const correctBarbiePoster = "https://image.tmdb.org/t/p/original/iuFNMS8U5s6Lz14KzVHKEh5PNhM.jpg";

db.serialize(() => {
    db.run(
        "UPDATE movies SET poster_path = ? WHERE title = 'Barbie'",
        [correctBarbiePoster],
        function (err) {
            if (err) {
                console.error("Error updating poster:", err.message);
            } else {
                console.log(`Updated Barbie poster. Rows affected: ${this.changes}`);
            }
        }
    );
});
