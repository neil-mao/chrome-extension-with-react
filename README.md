# chrome-extension-with-react

A template for chrome extension developed with react.


## Installation

```bash
# clone it
$ git clone https://github.com/neil-mao/chrome-extension-with-react.git

# Install dependencies
$ yarn install
```
## Directory Structure
    .
    ├── gulpfile.babel.js       # gulp build script with babel enabled
    ├── chrome                  # chrome extension 
    │   ├── assets              # assets of chrome extenssion
    │   ├── background.js       # background script
    │   └── content.js          # content script
    ├── config                  # for build chrome extension config
    ├── src                     # created by create-react-app 
    └── public                  # created by create-react-app 
    

## Development

```bash
# gulp
# It do such works:
# 1) copy chrome assets to build dir
# 2) resize icon to different size
# 3) run webpack config to genereate background and content script
# 4) run react-script to build app

$ gulp

```

## Hava a fun!
You can freely modify the script for youself.

