exports.login = async (provider, username, password) => {
    const client = await page.target().createCDPSession();
	await client.send('Network.clearBrowserCookies');

    const input = await page.$("input");
    await input.click({ clickCount: 3 })
    await input.type(provider);
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
    await expect(page).toMatch("Welcome", {timeout: 5000});
}
// FROM https://github.com/puppeteer/puppeteer/issues/3718
exports.getNewPageWhenLoaded =  async () => {
    return new Promise(x =>
        browser.on('targetcreated', async target => {
            if (target.type() === 'page') {
                const newPage = await target.page();
                const newPagePromise = new Promise(y =>
                    newPage.once('domcontentloaded', () => y(newPage))
                );
                const isPageLoaded = await newPage.evaluate(
                    () => document.readyState
                );
                return isPageLoaded.match('complete|interactive')
                    ? x(newPage)
                    : x(newPagePromise);
            }
        })
    );
};