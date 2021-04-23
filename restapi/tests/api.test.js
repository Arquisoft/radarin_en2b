const request = require("supertest");
const server = require("./server-for-tests");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await server.startdb();
    app = await server.startserver();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => await server.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await server.closeServer(); //finish the server
    await server.closeDB();
});

/**
 * Product test suite.
 */
describe("user ", () => {
    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it("can be created correctly", async () => {
        webId = "Pablo";
        location = {
            "type": "Point",
            "coordinates": [0.0, 0.0]
        };
        authKey = "pablo@uniovi.es";
        const response = await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webId);
        expect(response.body.location).toStrictEqual(location);
        expect(response.body.authKey).toBe(authKey);
    });

    /**
     * Tests that we can get user can be by its webId through the productService without throwing any errors.
     */
     it("can be got by its webId correctly", async () => {
        webId = "Pablo";
        location = {
            "type": "Point",
            "coordinates": [0.0, 0.0]
        };
        authKey = "pablo@uniovi.es";
        await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json");
        
        const response = await request(app).post("/api/users/getById").send({webId: webId}).set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webId);
    });

    /**
     * Tests that we can remove user can be by its webId through the productService without throwing any errors.
     */
     it("can be removed by its webId correctly", async () => {
        webId = "Pablo";
        location = {
            "type": "Point",
            "coordinates": [0.0, 0.0]
        };
        authKey = "pablo@uniovi.es";
        await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json");
        
        const response = await request(app).post("/api/users/removeById").send({webId: webId}).set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
        // response -> { n: 1, ok: 1, deletedCount: 1 } if the operation success
        expect(response.body.n).toBe(1);
        expect(response.body.ok).toBe(1);
        expect(response.body.deletedCount).toBe(1);
    });

    /**
     * Test that we can list users without any error.
     */
    it("can be listed",async () => {
        webId = "Pablo";
        location = {
            "type": "Point",
            "coordinates": [0.0, 0.0]
        };
        authKey = "pablo@uniovi.es";
        await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json");
        
        const response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
        const user = response.body.find(u => u); // returns an array with the unique user in the db at the moment
        expect(user.webId).toBe(webId);
    });

    /**
     * Test that we can list users with role normal and without any error.
     */
    it("can with role 'normal' be listed",async () => {
        webId = "Pablo";
        location = {
            "type": "Point",
            "coordinates": [0.0, 0.0]
        };
        authKey = "pablo@uniovi.es";
        await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json");
        
        const response = await request(app).get("/api/users/normal/list"); 
        expect(response.statusCode).toBe(200);
        const user = response.body.find(u => u); // returns an array with the unique user in the db at the moment
        expect(user.webId).toBe(webId);
    });

    /**
     * Tests that a user can update his/her location in the data base.
     */
    it("can update his/her location in the db correctly", async () => {
        webId = "Pablo";
        location = {
            "type": "Point",
            "coordinates": [0.0, 0.0]
        };
        authKey = "pablo@uniovi.es";
        await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json");

        webId = "Pablo";
        location = {
            "type": "Point",
            "coordinates": [90.0, 90.0]
        };
        authKey = "pablo@uniovi.es";
        const response = await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webId);
        expect(response.body.location).toStrictEqual(location);
    });

    /**
     * Tests that a user can know where he/she has friends nearby.
     */
    it("can find nearby friends", async () => {
        webId = "Pablo";
        location = {
            "type": "Point",
            "coordinates": [43.354731, -5.851250]
        };
        authKey = "pablo@uniovi.es";
        await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json");

        userLocation = {
            "type": "Point",
            "coordinates": [43.353390, -5.850649]
        };
        friends = [
            {
                "webId": "Pablo"  
            }
        ];
        const response = await request(app).post("/api/users/location/near").send({userLocation: userLocation, friends: friends}).set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
        const user = response.body.find(u => u); // returns an array with the unique user in the db at the moment
        expect(user.webId).toBe(friends[0].webId);
    });
});