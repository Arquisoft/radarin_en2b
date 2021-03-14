const request = require("supertest");
const server = require("./server-for-tests")

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await server.startdb()
    app = await server.startserver()
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => await server.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await server.closeServer() //finish the server
    await server.closeDB()
})

/**
 * Product test suite.
 */
describe("user ", () => {
    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it("can be created correctly", async () => {
        webId = "Pablo"
        location = {
            "type": "Point",
            "coordinates": [43.354731, -5.851250]
        }
        authKey = "pablo@uniovi.es"
        const response = await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json")
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webId);
        expect(response.body.location).toStrictEqual(location);
        expect(response.body.authKey).toBe(authKey);
    });

    /**
     * Test that we can list users without any error.
     */
    it("can be listed",async () => {
        webId = "Pablo"
        location = {
            "type": "Point",
            "coordinates": [43.354731, -5.851250]
        }
        authKey = "pablo@uniovi.es"
        await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json")
        
        const response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
        const user = response.body.find(u => u); // returns an array with the unique user in the db at the moment
        expect(user.webId).toBe(webId);
        expect(user.location).toStrictEqual(location);
        expect(user.authKey).toBe(authKey);
    });


    /**
     * Tests that a user can update his/her location in the data base.
     */
    it("can update his/her location in the db correctly", async () => {
        webId = "Pablo"
        location = {
            "type": "Point",
            "coordinates": [43.354731, -5.851250]
        }
        authKey = "pablo@uniovi.es"
        await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json")

        webId = "Pablo"
        location = {
            "type": "Point",
            "coordinates": [43.354474, -5.852441]
        }
        const response = await request(app).post("/api/users/location/submit").send({webId: webId, location: location}).set("Accept", "application/json")
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webId);
        expect(response.body.location).toStrictEqual(location);
    });

    /**
     * Tests that a user can update his/her location in the data base.
     */
    it("can find nearby friends", async () => {
        webId = "Pablo"
        location = {
            "type": "Point",
            "coordinates": [43.354731, -5.851250]
        }
        authKey = "pablo@uniovi.es"
        await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json")

        userLocation = {
            "type": "Point",
            "coordinates": [43.353390, -5.850649]
        }
        friends = [
            {
                "webId": "Pablo"  
            }
        ]
        const response = await request(app).post("/api/users/location/near").send({userLocation: userLocation, friends: friends}).set("Accept", "application/json")
        expect(response.statusCode).toBe(200);
        const user = response.body.find(u => u); // returns an array with the unique user in the db at the moment
        expect(user.webId).toBe(friends[0].webId);
    });
});