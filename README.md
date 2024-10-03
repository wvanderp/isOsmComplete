# isOsmComplete

How complete is OSM, really? That's the question this website sets out to answer. We compare the number of features in OpenStreetMap to the number of features in official data sources, and the results are... well, let's say we're not quite there yet.

You can find the website at <https://wvanderp.github.io/isOsmComplete/>

## How to contribute

We are always looking for new data sources to compare to OSM. Please let us know by opening an issue or a pull request if you know of any.

If you want to add a new data source, you can add a new entry in one of the files in the `collect` folder.

Be aware that any changes to the `data` folder will be overwritten by the GitHub action that runs every day. You can run the collect script locally with `npm run collect` to test your changes.

## How to run locally

Install the dependencies with `npm install`

Run `npm run app` to start the vite development server. This will serve the website on <http://localhost:1234>

You can use `npm run build` to build the website for production. This will create a `gitBuild` folder with the website.

The data can be collected with `npm run collect`. This will update all the data files in the `data` folder.

## Architecture

The website is built with vite and is served from GitHub pages. The data is stored in the repository and is updated with GitHub actions.

This website is built with the idea that it should be a static site with no server-side components. This means all the data is collected beforehand, and the website is built with that data. This means that the website can be hosted on GitHub pages and that it can be served from a CDN.

The data is collected with a node script run periodically on GitHub actions. The data is then committed to the repository, and the website is built with that data.

When anything is pushed to the `main` branch, a GitHub action is triggered that builds the website and pushes it to the `gh-pages` branch. This branch is then served by GitHub pages.
