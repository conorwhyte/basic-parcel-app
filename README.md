# Basic React and Parcel app

A basic react and parcel barebones app, inspired as an extension of create-react-app. Some changes include: 
    - Uses parcel for bundling assets rather than webpack, requires zero config which is much nicer for smaller React projects I think.
    - Everything build from scrath - no react-scripts npm package doing all the magic. 
    - Includes some basic examples of react-router and flux for state managment

## Commands 

To start the dev server: 
```
yarn start
``` 

To run the (very basic) Jest tests 
```
yarn test
``` 

To run the (also basic) Puppeteer intergration tests 
```
yarn puppet
``` 

To create a clean build 
```
yarn clean
``` 
 
## Technologies used 

- Parcel
- React
- Jest/Enzyme
- Puppeteer 
- Flux 
- React router
