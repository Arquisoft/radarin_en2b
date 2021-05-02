var NodeEnvironemnt = require("jest-environment-node");
var puppeteer = require("puppeteer");

class CustomEnvironment extends NodeEnvironemnt {

    constructor(config, context){
        super(config, context);
    }

    async setup(){
        await super.setup();
        this.global.browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            args: [`--window-size=1920,1080`],
            // WARNING:
            // If you set default viewport to null and headless false
            // test break when trying to find button for inrupt's login
            // If you don't change window size by default it will render
            // the mobile version which has a different navbar
            defaultViewport: null,
            headless: true,
            // slowMo: 60
        });
        this.global.page = await this.global.browser.newPage();
    }

    async teardown(){
        await this.global.browser.close();
        await super.teardown();
    }
}

module.exports = CustomEnvironment;