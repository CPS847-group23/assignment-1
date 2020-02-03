# assignment-1
This is assignment 1 for CPS847.

## About
This is the readme for the first assignment.

## Shrimp Bot Usage
The Shrimp echo bot requires you to run the API locally and forward HTTP requests to it.

The Event Subscription URL changes each time you start ngrok, so the endpoint needs to be changed each time at `https://api.slack.com/apps/ATBRYLD6K`

To run the bot locally:
* Add `shrimp_config.json` to the `shrimp_bot/config` folder
* When inside `shrimp_bot` dir, use `npm install` to install dependencies
* start ngrok using : `ngrok http 3000`
* Modify the slash command to use the url from ngrok. For example: `http://a7aa3003.ngrok.io/shrimp_echo`
* In another terminal, start the API: `npm start`
* Use the shrimp bot in slack: > `@shrimp hello world`
* If you type the name of a city, shrimp bot will send you the weather
* If the city isn't found, NLP will be applied to attempt to correct your spelling

## Authors
* **Brian Kenney** - *Team member* - [BKMotoz](https://github.com/BKmotoz)
* **Matthew Ham** - *Team member* - [matthewninja](https://github.com/matthewninja)
