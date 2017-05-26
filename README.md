# REACT WEATHER

A simple web app which is meant to search weather forecast of locations and save it as a list. The weather forecast is provided by openWeatherMap.org API, and the map is of course by googleMap API. The app is made using React, redux, json-server and so on.

## Usage

Clone the repo to your local storage, and run the following:
Go to the folder,
```sh
$ cd weather
```
install dependencies,
```sh
$ npm install
```
start the json-server using port 4000,
```sh
$ json-server --watch ./src/database/db.json --port 4000
```
in a new terminal tab start the react by default using port 3000,
```sh
$ npm start
```