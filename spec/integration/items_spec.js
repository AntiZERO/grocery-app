const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3001/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;


describe("routes : items", () => {

  beforeEach((done) => {

    this.list;
    this.item;
    sequelize.sync({ force: true }).then((res) => {

      List.create({
        name: "Test Grocery List"
      })
        .then((list) => {
          this.list = list;

          Item.create({
            name: "Gallon of Milk",
            quantity: 1,
            purchased: false,
            listId: this.list.id
          })
            .then((item) => {
              this.item = item;

              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
        });
    });
  });

  describe("POST /lists/:listId/items/create", () => {

    it("should create a new item", (done) => {
      const options = {
        url: `${base}${this.list.id}/items/create`,
        json: {
          name: "Cream Cheese 8oz",
          quantity: 2,
          purchased: false
        }
      };
      request.post(options,
        (err, res, body) => {

          Item.findOne({ where: { name: "Cream Cheese 8oz" } })
            .then((item) => {
              expect(item).not.toBeNull();
              expect(item.name).toBe("Cream Cheese 8oz");
              expect(item.quantity).toBe(2);
              expect(item.purchased).toBe(false);
              expect(item.listId).not.toBeNull();
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
        }
      );
    });

  });

  describe("POST /lists/:listId/items/:id/destroy", () => {

    it("should delete the item with the associated ID", (done) => {


      expect(this.list.id).toBe(1);

      request.post(`${base}${this.list.id}/items/${this.item.id}/destroy`, (err, res, body) => {


        Item.findByPk(1)
          .then((item) => {
            expect(err).toBeNull();
            expect(item).toBeNull();
            done();
          })
      });

    });

  });

  describe("POST /lists/:listId/items/:id/update", () => {

    it("should update the item with the given values", (done) => {
      const options = {
        url: `${base}${this.list.id}/items/${this.item.id}/update`,
        json: {
          name: "Block of Cheese",
          quantity: 1,
          purchased: true,
        }
      };
      request.post(options,(err, res, body) => {
          expect(err).toBeNull();
          Item.findOne({
            where: { id: this.item.id } })
            .then((item) => {
              expect(item.name).toBe("Block of Cheese");
              expect(item.quantity).toBe(1);
              expect(item.purchased).toBe(true);
              done();
            });
        });
    });

  });
})