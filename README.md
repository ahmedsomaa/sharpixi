# Sharpixi

An awesome image processing api built with Node.js, TypeScript & [Sharp](https://sharp.pixelplumbing.com/).

---

## Tech Stack

- Node.js & Express for building the API server.
- [Handlebars](https://handlebarsjs.com/) as the default view engine.
- [Sharp](https://sharp.pixelplumbing.com/) for image processing.
- [Bootstrap](https://getbootstrap.com/) for styling.

## Architecture

![diagram](https://user-images.githubusercontent.com/29373629/190209541-58dbb03b-955a-457e-99e5-983fbe288120.jpg)

## Run locally

- Install dependencies `npm install`.

- Run `npm run build` to create a production build.

- Rename `.env.example` to `.env` file and provide a value for `PORT`.

- Run `npm run start` to start the server.

- Open you browser and navigate to `http://localhost:<PORT>/` to see the resizer page.

## Unit tests

The tests are written in jasmine. To run the tests: `npm run build && npm run test`.

### Coverage

- Express App Tests Suit
  - Serve Favicon
  - Serve Static Files
  - Use Handlebars as view engine
- Main Router Tests Suit
  - Return 200
  - Return html document
- Image Router Tests Suit
  - `GET /api/{resize | convert}` Requests
    - Return 400 for empty query string
    - Return 422 for invalid query string
    - Return 404 if image does not exist
    - Return 200 with resized image for valid query string
    - Return 200 with resized image for the same query string
- Image Helper Tests Suit
  - `imageExists` method
    - Return file name with extension if file exists in directory
    - Return "File does not exist" if file does not exist in directory
  - `getAllImages` method
    - Return a list of 5 images
  - `resolveImageDirectoryPath` method
    - Return directory full path as string
  - `resolveToSourceAndTarget` method
    - Return an object with source & target keys
- Sharp Service Tests Suit
  - `resize` service
    - Should delete the resized file if exists & create a new fresh one
    - Return "File does not exist" if file does not exist in directory
  - `convert` service
    - Should delete the resized file if exists & create a new fresh one

## Available Scripts

- `dev`: to start the development server
- `start`: to start the production server
- `test`: to run jasmine tests on production build
- `lint`: to run eslint on the project's typescript files
- `clean`: to remove old builds before building a new one
- `lint:fix`: to fix issues identified by eslint
- `postbuild`: to copy views folder to the production build folder.
- `format`: to run prettier on the project's typescript files

## Available APIs

- `/api/resize` to resize an image with a given query string for example `?filename=fjord&width=200&height=600`.

- `/api/convert` to convert an image qith a given query string to the given format for example
  `?filename=fjord&format=png`. Supported conversion types are `[jpg, png, avif, jpeg, wbep]`.

- `/{full | thumbs}/{image_name}` to serve static image files for example `/full/fjord.jpg`.

## Demo

https://user-images.githubusercontent.com/29373629/190127515-60a97f3f-fc40-4225-9c01-584974aa8743.mp4
