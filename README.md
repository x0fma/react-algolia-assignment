This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This module provide a Material TextField that allows to query multiple Algolia indexes at the same time.

## Usage
Currently this module can only be used through this repo *(npm release coming soon)*

- Clone this repo and install dependancies with npm or yarn
- Start the react app: `yarn start`

Demo account keys and indexes are provided for tests purpose, but you can use your own account, the `AlgoliaSearchInput` can take the following props:

 | Props |  Type | Description |
| -------------- | ------ | --------------- |
| appId | string | **required** Your Algolia APP_ID |
| indexes | shape | **required** Algolia indexes configuration object  |
| inputLabel | string | **required** Label for the TextField component |
| searchApiKey | string | **required** Your Algolia SEARCH_API_KEY |

The indexes configuration object take a particular shape:
  ```
  const indexes = {
    'my-algolia-index-1': {
      label: 'Index 1',
      primary: 'name',
      secondary: 'country'
    },
    ...
  }
  ```
## Packages used
- React
- [Material-ui](https://github.com/mui-org/material-ui)
- [Hotkeys](https://github.com/jaywcjlove/hotkeys)  
 
 ## Next steps
- [ ] Publish package to npm
- [ ] Better CSS management
- [ ] Improve docs
- [ ] Tests
- [ ] i18n 
