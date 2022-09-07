# Salve Tech test

## Notes

- This has been tested on Node v16.16.0

## Backend

This is a serverless backend application. The local deployment runs on port 4003

### Running the application

```
$ cd server
$ npm i
$ npm run local
```


## Frontend

This is a Nextjs frontend application. The local deployment runs on port 3000

### Running the application

```
$ cd frontend
$ npm i
$ npm run dev
```

## Future upgrades

- due to the time limit the following things have either been left off completely, or would be ideal to be upgraded / fixed
- the types folder is not shared due to TSC complaining when not in the root folder.
- cors has been left open for development purposes
- there is no authentication, caching or rate limiting on the API
- no testing was added to either front or backend due to the time limit
- I would generally prefer styled components over css modules, but again for speed of development I used the default nextjs styles
- error handling is extremely basic, and no real error messages are sent from the API, or expected in the frontend and handled accordingly. This is the same for any 404 pages
- the applications have been generally typed, but there could be improvements, e.g. the types for the ordering was not added due to complexity and time