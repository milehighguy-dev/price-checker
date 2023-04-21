Hello, this node app will alert the user if the percent difference between any two currencies exceeds a given limit. It uses the API provided by Uphold.

# Requirements:

node v14+
npm v6+
docker v20+ (if you plan to build from the Dockerfile)

(these are just what I had installed when building this. There may be some wiggle room)

# Running with Node ----------------------------

Instructions for use:

from the project folder run:

install dependencies:
`npm install`

run the app:

`node app.js <arguments>`

 -or-

`npm start -- <arguments>`

if you would like to run the test suite run:

`npm test`

This app has default arguments to alert price changes between BTC and USD. You can provide arguments to change the defualts.

```
Options:
  -i, --input-file <type>  Input csv file with format: first currency, second currency, percent threshold, and check rate (sec). Optionally multi line
  -c1, --first <type>      first currency (default: "BTC")
  -c2, --second <type>     second currency (default: "USD")
  -p, --percent <type>     threshold of percent difference (default: 0.01)
  -t, --interval <type>    interval (in seconds) between each ticker retreival (default: 5)
  -h, --help               display help for command
  ```

if you provide an input .csv file, that will override any other arguments.

example: 

`node app.js -c1 ETH -c2 EUR -p 0.02 -t 4`

`node app.js -i multi_input.csv`

a multi_input.csv is provided to you for illustrative purposes.

# Running with Docker -------------------------

To build the Docker image:

`docker build -t <image_name> .`

To run the Docker image:

`docker run --name <container_name> <image_name> <arguments>`

if you want to provide a .csv file you will have to mount the directory where it is located

`docker run -v <csv_location>:/app --name <container_name> <image_name> -i <csv_filename>`

`docker run --name pricecheck_container pricecheck_image -i test.csv`

example command (ran on linux where \`pwd\` resolved to the current directory, where the test.csv file lived)

``docker run -v `pwd`:/app --name pricecheck_container pricecheck_image -i test.csv``

to stop the container run:

`docker stop <container_name>`

and to remove it:

`docker container rm <container_name>`

