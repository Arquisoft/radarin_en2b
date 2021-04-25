const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./features/navigate-app.feature");
const nss = "https://localhost:8443/";

defineFeature(feature, test => {
    beforeEach(async () => {
        await global.page.goto("http://localhost:3000", {timeout: 60000});
    });

    test("User with a pod logs in to radarin", ({given, when, then}) => {
        given("A user with a pod", () => {
            let username = "alice";
            let password = "1234";
        });


        when("I select my provider and log in with it", async () => {
            await page.type("input", nss);
            await Promise.all([
                expect(page).toClick("button"),
                page.waitForNavigation({
                  waitUntil: "networkidle2",
                })
            ]);
            await page.type("input#username", username);
            await page.type("input#password", password);
            await Promise.all([
                expect(page).toClick("button#login"),
                page.waitForNavigation({
                  waitUntil: "networkidle0",
                })
            ]);
            try {
                await page.waitForSelector("button[name=consent]", { timeout: 400 });
                // Add default permissions if not given already
                await Promise.all([
                    expect(page).toClick("button[name=consent]"),
                    page.waitForNavigation({
                      waitUntil: "networkidle0",
                    })
                ]);
            } catch (error) {
                console.log("User has already given permision")
            }
        });

        then("I should see the main radarin page", async () => {
            await expect(page).toMatch("Welcome!");
        });

    });
});