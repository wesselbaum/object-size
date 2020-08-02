#!/usr/bin/env node

const findUp = require('find-up');

const argv = require('yargs').argv;
const fs = require('fs');
const sortObjectsArray = require('sort-objects-array')

const {firefox} = require('playwright');
console.log(`argv.config: ${argv.config}`);
if (argv.v) {
    console.log(JSON.parse(fs.readFileSync('./package.json')).version);
    return;
}
// return;
//region Find settings file

if (argv.config && argv.config.length > 0) {
    if (fs.existsSync(argv.config)) {
        console.log("Provided config was found")
        app(argv.config);
        return;
    } else {
        console.log("Provided config could not be found. Try finding config file up the tree.");
        findUp(['.os-config.json', '.os-config.js']).then(filepath => {
            if (filepath) {
                app(filepath);
            } else {
                console.warn("No configuration file could be found.")
            }
        });
    }
} else {
    console.log("Finding up the tree...")
    findUp(['.os-config.json', '.os-config.js']).then(filepath => {
        if (filepath) {
            app(filepath);
        } else {
            console.warn("No configuration file could be found.")
        }
    });
}


//endregion

async function app(configFilePath) {
    const browser = await firefox.launch({
        headless: false,
        slowMo: true
    });

    const config = JSON.parse(fs.readFileSync(configFilePath));

    console.log(config);

    const page = await browser.newPage();

    const scenarios = config.scenarios;

    const viewports = config.viewports;

    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];
        console.log(scenario.selectors);
        await page.goto(scenario.url);

        for (let j = 0; j < scenario.selectors.length; j++) {
            // TODO add iteration for each selector
            const selector = scenario.selectors[j];
            console.log(`Scenario ${scenario.label} selector ${selector}`)
            for (let k = 0; k < viewports.length; k++) {
                const viewport = viewports[k];
                console.log('Viewport: ' + viewport.label);

                page.setViewportSize(viewport);

                const ulElementsHandle = await page.$$(selector);
                let nameSelector = selector.replace(/([^a-zA-Z])/g, "_");
                while (nameSelector.indexOf("__") > -1) {
                    nameSelector = nameSelector.replace(/__/g, "_")
                }

                let results = [];

                for (let i = 0; i < ulElementsHandle.length; i++) {
                    const a = ulElementsHandle[i];

                    const width = await a.evaluate(ulElement => getComputedStyle(ulElement).getPropertyValue('width'));
                    // const height = await a.evaluate(ulElement => getComputedStyle(ulElement).getPropertyValue('height'));
                    results.push(width);
                }

                console.log(uniqueCount(results.sort().reverse()));
            }

        }
    }


    await browser.close();
}

function uniqueCount(hay) {
    return hay.reduce((acc, val) => {
        acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
        return acc;
    }, {});
}

function stripSelector(selector) {
    let strippedSelector = selector.replace(/([^a-zA-Z])/g, "_");
    while (strippedSelector.indexOf("__") > -1) {
        strippedSelector = strippedSelector.replace(/__/g, "_")
    }
    return strippedSelector;
}
