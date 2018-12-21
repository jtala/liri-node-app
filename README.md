# liri-node-app

LIRI (which stands for Language Interpretation and Recognition Interface) is a command line node.js  entertainment application which will takes in three types of parameters for either movies, nearby concerts, or songs, and will return information about that given parameter to the user.


## Getting Started

This application uses 5 node modules.

1. axios
2. moment
3. fs
4. node-spotify-api
5. dotenv

These modules are included as dependencies in the original node module. Be sure to either run

```
npm i
```

or
```
npm i axios
npm i moment
npm i fs
npm i node-spotify-api
npm i dotenv

```
The spotify node application does have client and secret ID keys which requires registration. Visit https://developer.spotify.com/dashboard/ to create your account and receive your keys.

Your unique Spotify ID and Spotify Secret key should be saved under a .env under a template like so:

```
SPOTIFY_ID= "Your Unique ID Here"
SPOTIFY_SECRET= "Your Unique Secret Here"
```

## Running the Application

There are 4 commands that can be given to the application to receive data.

### Finding Movies

Terminal commands should follow the format of : node liri.js movie-this "The Movie You Want"

```
node liri.js movie-this Interstellar

```
This command returns a wide selection of information, as seen below:
<img src="/assets/images/movie-this-example.JPG" alt="Interstellar Example">


Movies with multiples words can be queried simply with spaces between their words.

```
node liri.js movie-this The Sisterhood of the Traveling Pants

```

### Finding Songs

Terminal commands should follow the format of : node liri.js spotify-this-song "The Song That You Want"

```
node liri.js spotify-this-song Somebody Told Me

```

```
node liri.js spotify-this-song Livin' on a Prayer

```

### Finding Nearby Concerts

Terminal commands should follow the format of : node liri.js concert-this "The Band You Want"

```
node liri.js concert-this The Killers

```

```
node liri.js concert-this Weezer

```

### Extracting data from a text.

This application can also read text files and return commands if the text is formatted correctly.

The given text file should mimic the commands from the previous three examples, and will return information about the command. 

Insert the command into the given random.txt file, and the command can be simply be run as:

```
node liri.js do-what-it-says

```

## Built With

* [Axios] (https://www.npmjs.com/package/axios) - makes http requests
* [moment] (https://www.npmjs.com/package/moment) - converts time into readable formats
* [fs] (https://www.npmjs.com/package/fs) - file system
* [node-spotify-api] (https://www.npmjs.com/package/node-spotify-api) - spotify api
* [dotenv] (https://www.npmjs.com/package/dotenv) - environmental variable loader





