const db = require('./database');

const categories = [
    "Action", "Comedy", "Drama", "Sci-Fi"
];

const movies = [
    {
        title: "Dune: Part Two",
        description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
        category: "Sci-Fi",
        release_year: 2024,
        rating: 8.8,
        poster: "https://dunenewsnet.com/wp-content/uploads/2023/05/Dune-Part-Two-Movie-Poster.jpg",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        title: "Oppenheimer",
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        category: "Drama",
        release_year: 2023,
        rating: 8.6,
        poster: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
        title: "Barbie",
        description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
        category: "Comedy",
        release_year: 2023,
        rating: 7.2,
        poster: "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
    },
    {
        title: "Spider-Man: Across the Spider-Verse",
        description: "Miles Morales catapults across the Multiverse.",
        category: "Action",
        release_year: 2023,
        rating: 8.7,
        poster: "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    },
    {
        title: "Inception",
        description: "Cobb, a skilled thief who commits corporate espionage.",
        category: "Sci-Fi",
        release_year: 2010,
        rating: 8.8,
        poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
    },
    {
        title: "The Dark Knight",
        description: "Batman raises the stakes in his war on crime.",
        category: "Action",
        release_year: 2008,
        rating: 9.0,
        poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
    },
    {
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space.",
        category: "Sci-Fi",
        release_year: 2014,
        rating: 8.6,
        poster: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
        title: "Parasite",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        category: "Drama",
        release_year: 2019,
        rating: 8.5,
        poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
        title: "Avengers: Endgame",
        description: "After the devastating events of Infinity War, the universe is in ruins.",
        category: "Action",
        release_year: 2019,
        rating: 8.4,
        poster: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
        title: "The Hangover",
        description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night.",
        category: "Comedy",
        release_year: 2009,
        rating: 7.7,
        poster: "https://upload.wikimedia.org/wikipedia/en/b/b9/Hangoverposter09.jpg",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    {
        title: "The Matrix",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
        category: "Sci-Fi",
        release_year: 1999,
        rating: 8.7,
        poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    },
    {
        title: "Superbad",
        description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
        category: "Comedy",
        release_year: 2007,
        rating: 7.6,
        poster: "https://upload.wikimedia.org/wikipedia/en/8/8b/Superbad_Poster.png",
        video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
    }
];

// Wait for database connection and schema init
setTimeout(() => {
    db.serialize(() => {
        // Clear existing
        db.run("DELETE FROM movies");
        db.run("DELETE FROM categories");

        // Insert Categories
        const catStmt = db.prepare("INSERT INTO categories (name) VALUES (?)");
        categories.forEach(cat => catStmt.run(cat));
        catStmt.finalize();
        console.log("Categories seeded.");

        // Insert Movies
        const stmt = db.prepare("INSERT INTO movies (title, description, category, release_year, rating, poster, video_url) VALUES (?, ?, ?, ?, ?, ?, ?)");
        movies.forEach(movie => {
            stmt.run(movie.title, movie.description, movie.category, movie.release_year, movie.rating, movie.poster, movie.video_url);
        });
        stmt.finalize();
        console.log("Movies seeded!");
    });
}, 2000);
