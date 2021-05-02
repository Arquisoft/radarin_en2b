const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./features/register-form.feature");
const { getNewPageWhenLoaded } = require("../util.js");

defineFeature(feature, test => {
  beforeEach(async () => {
    await global.page.goto("http://localhost:3000", {timeout: 60000});
  });

  test("The user does not have a solid pod", ({given,when,then}) => {
    let solidPage;
    given("A user without a pod", () => {});

    when("I click on the Get a Pod link", async () => {
      await page.click("a[href='https://solidproject.org/users/get-a-pod']");
      const newPagePromise = getNewPageWhenLoaded();
      solidPage = await newPagePromise;
    });

    then("I should be redirected to https://solidproject.org/users/get-a-pod in a new tab", async () => {
      const pages = (await browser.pages());
      // blank, app, redirected: get a pod
      await expect(pages.length).toBe(3);
      await expect(await solidPage.url()).toBe("https://solidproject.org/users/get-a-pod");
      await expect(await pages[2].url()).toBe("https://solidproject.org/users/get-a-pod");
      await pages[2].close();
    });
  });

  test("The user wants a local solid pod", ({given, when, then}) => {
    let username;
    let password;

    given("A user without a pod", () => {
      username = "bobby";
      password = "oieyhcdf/&%19823Ayrfcpjh";
    });

    when("I fill the data in the form and press submit", async () => {
      await global.page.goto("https://localhost:8443/register", {timeout: 60000});
      await expect(page).toFillForm("form#RegisterForm", {
        username,
        password,
        repeat_password: password,
        name: username,
      });
      await Promise.all([
        expect(page).toClick("button#register"),
        page.waitForNavigation({
          waitUntil: "networkidle2",
        })
      ]);
      await expect(await page.url()).toBe("https://bobby.localhost:8443/");
    });

    then("I should be redirected to my pod", () => {

    });
  });
});