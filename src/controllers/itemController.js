const itemQueries = require("../db/queries.items.js");



module.exports = {

    getItems(req, res, next) {

        itemQueries.getItems(req.params.listId, (err, items) => {
            if (err) {
                res.status(500).send({ message: err })
            } else {
                res.status(200).send({ items })
            }
        })

    },

    create(req, res, next) {

        let newItem = {
            name: req.body.name,
            quantity: req.body.quantity,
            purchased: req.body.purchased,
            listId: req.params.listId
        };

        itemQueries.addItem(newItem, (err, list) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: err })
            } else {
                res.status(201).send({ message: newItem.name + " has been added." })
            }
        })
    },

    destroy(req, res, next) {

        itemQueries.deleteItem(req.params.id, (err, deletedRecordsCount) => {
            if (err) {
                res.status(500).send({ message: err })
            } else {
                res.status(200).send("Item Deleted");
            }
        })
    },

    update(req, res, next) {
        itemQueries.updateItem(req.params.id, req.body, (err, item) => {
            if (err || item == null) {
                res.redirect(404, `/lists/${req.params.listId}/`);
            } else {
                res.status(200).send("Item Updated");
            }
        })
    }

};