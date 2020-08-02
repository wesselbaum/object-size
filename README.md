# object-size
<!--[![Coverage Status](https://coveralls.io/repos/github/wesselbaum/object-size/badge.svg?branch=Unit_tests_%26_coverage)](https://coveralls.io/github/wesselbaum/object-size?branch=Unit_tests_%26_coverage)
[![Build Status](https://travis-ci.org/wesselbaum/object-size.svg?branch=master)](https://travis-ci.org/wesselbaum/object-size)
[![dependencies Status](https://david-dm.org/wesselbaum/object-size/status.svg)](https://david-dm.org/wesselbaum/object-size)-->

Find out Object size by URL and selector. 

# Install 

## Global
`npm install -g object-size`

## For one project
`npm install object-size`

# Usage

## Basic command line call
`object-size`

## Call with configuration
You can either specify a configuration location with the `config` option `object-size --config="path/to/config.json"` or you put a `.os-config.json` somewhere up the tree structure.

## `package.json` call
If you have installed this tool for the project you can reference it in your `package.json` in the `scripts` by calling `node_modules/.bin/convention-commit-log [parameters]`. Take a look in this projects `package.json` for more information.

## Configuration

| Property        | Description |
|:------------------|:-------------|
| `scenarios` | An array of scenarios |
| `viewports` | An array of viewports  |

### Scenario

One Scenario is an Object which defines one page with its selectors.

| Property        | Description | 
|:------------------|:-------------|
| `label` | A label for the scenario as a string. This will be used in the output |
| `url` | An URL of the page as a string |
| `selectors` | An array selector strings  |


### Viewport

One viewport describes one resolution at which objects will be measured.

| Property        | Description | 
|:------------------|:-------------|
| `label` | A label for the viewport as a string. This will be used in the output |
| `width` | Browser width. Consider adding an amount of px (12 works currently well) for the scrollbar |
| `height` | Browser height  |
