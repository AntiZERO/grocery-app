const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3001";

describe("routes: static", () => {

  describe("GET /", () => {
   
    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });
  
});