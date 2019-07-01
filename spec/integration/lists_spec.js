const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3001/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List

describe("routes : lists", () => {

  beforeEach((done) => {
    this.list;
    sequelize.sync({ force: true }).then((res) => {

      List.create({
        name: "This is a List",
      })
        .then((list) => {
          this.list = list;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

    });

  });

  describe("GET /lists", () => {


    it("should return a status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });

  describe("POST /lists/new", () => {

    const options = {
      url: `${base}new`,
      json: {
        name: "Family Grocery List"
      }
    };

    it("should create a new list", (done) => {
      request.post(options, (err, res, body) => {
        List.findOne({ where: { name: "Family Grocery List" } })
          .then((list) => {
            expect(res.statusCode).toBe(201);
            expect(list.name).toBe("Family Grocery List");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          })
      })
    })

  })

  describe("GET /lists/all", () => {

    it("should return data of all lists", (done) => {
      request.get(`${base}all`, (err, res, body) => {
        expect(body).toContain('This is a List')
        done();
      })
    })

  })

  describe("GET /lists/:id", () => {

    it("should return the data for only the list matching the id", (done) => {
      request.get(`${base}${this.list.id}`, (err, res, body) => {
        expect(err).toBeNull();
        done();
      })
    })

  })

  describe("POST /lists/:id/destroy", () => {

    it("should delete the list with the associated ID", (done) => {

      List.findAll()
        .then((lists) => {

          const listCountBeforeDelete = lists.length;
          expect(listCountBeforeDelete).toBe(1);

          request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
            List.findAll()
              .then((lists) => {
                expect(err).toBeNull();
                expect(lists.length).toBe(listCountBeforeDelete - 1);
                done();
              })

          })
        })

    })

  })

  describe("POST /lists/:id/update", () => {

    it("should update the list with the given value", (done) => {
      const options = {
        url: `${base}${this.list.id}/update`,
        json: {
          name: "My Grocery List (HEB)",
        }
      };

      request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          List.findOne({ where: { id: this.list.id } })
            .then((list) => {
              expect(list.name).toBe("My Grocery List (HEB)");
              done();
            })
        })
    })

  })

});