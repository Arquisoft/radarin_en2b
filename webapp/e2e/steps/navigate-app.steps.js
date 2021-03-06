const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./features/navigate-app.feature");
const { login } = require("../util.js");
const nss = "https://localhost:8443/";

defineFeature(feature, test => {
    beforeEach(async () => {
        await global.page.goto("http://localhost:3000", {timeout: 60000});
    });

    test("User with a pod logs in to radarin", ({given, when, then}) => {
        let username;
        let password;
        
        given("A user with a pod", () => {
            username = "alice";
            password = "1234";
        });


        when("I select my provider and log in with it", async () => {
            const input = await page.$("input");
            await input.click({ clickCount: 3 })
            await input.type(nss);
            await Promise.all([
                page.click("button"),
                page.waitForNavigation({
                  timeout: 5000
                })
            ]);
            await page.type("input#username", username);
            await page.type("input#password", password);
            await Promise.all([
                page.click("button#login"),
                page.waitForNavigation({
                  timeout: 5000
                })
            ]);
            try {
                // Add default permissions if not given already
                await Promise.all([
                    page.click("button[name=consent]"),
                    page.waitForNavigation({
                        timeout: 5000
                    })
                ]);
            } catch (error) {
                console.log("User has already given permision")
            }
        });

        then("I should see the main radarin page", async () => {
            await expect(page).toMatch("Welcome", {timeout: 5000});
        });

    });
    test("A logged in user navigates to myLocations", ({ given, when, then }) => {
    	given("A logged in user", async () => {
            // login clears cookies, so we can use it with the same user
            // without autologin messing with the tests
            await login(nss, "alice", "1234");
    	});

    	when("I navigate the page using the navbar", async () => {
            await expect(page).toClick("a", {text: "My Locations"});
    	});

    	then("I should go to the myLocations page", async () => {
            await expect(page).toMatchElement("button", {text: "Delete All Locations"});
            await expect(page).toMatch("Locations");
            await expect(page).toMatch("Date and time");
            await expect(page).toMatchElement("th", {text: "Actions"});
    	});
    });
});