# How to Contribute

- Trying to build a database of 24/7 in-person shopping

- coordinate location and several attributes are needed
    - Attributes follow OSM schema

## Adding a store
 
- Create a branch

- Make commits to Stores.geojson in the following style 

'''
    {
        "type":"Feature","properties":{"Name":"","addr:city":"","addr:state":"","addr:postcode":,"addr:housenumber":,"addr:street":"","shop":""},"geometry":{"type":"Point","coordinates":[long,lat]}
    },
'''

- Submit a Pull Request, detailing the store you are adding

## Adding a png

- Create a branch

- png must be 50px by Xpx size

- add to png folder

- Submit pull request

## Adding symbology (of added png) to new store

- Create a branch

- Make commits to main.js in the following style

            {
            value: "", //add
            label: "", //add
            symbol: {
                type: "picture-marker",
                url: "png/", //add
                width: "50px",
                height: "" //add 
            }
            },

- Submit a Pull Request, detailing added PNG