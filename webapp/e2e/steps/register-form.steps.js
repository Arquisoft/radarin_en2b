const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./features/register-form.feature");

defineFeature(feature, test => {
  beforeEach(async () => {
    await global.page.goto("http://localhost:3000", {timeout: 60000});
  });

  test("The user does not have a solid pod", ({given,when,then}) => {
    given("A user without a pod", () => {});

    when("I click on the Get a Pod link", async () => {
      await Promise.all([
        page.click("a"),
        page.waitForNavigation({
          waitUntil: "networkidle2",
        })
      ]);
    });

    then("I should be redirected to https://solidproject.org/users/get-a-pod in a new tab", async () => {
      const pages = (await browser.pages());
      // blank, app, redirected: get a pod
      await expect(pages.length).toBe(3);
      await expect(await pages[2].url()).toBe("https://solidproject.org/users/get-a-pod");
    });
  });

  test("The user wants a local solid pod", ({given, when, then}) => {
    let username;
    let password;

    given("A user without a pod", () => {
      username = "alice";
      password = "oieyhcdf/&%19823Ayrfcpjh";
    });

    when("I fill the data in the form and press submit", async () => {
      await global.page.goto("https://localhost:8443/register", {timeout: 60000});
    });

    then("I should be redirected to my pod", () => {

    });
  });
});