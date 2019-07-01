const listQueries = require("../db/queries.lists.js");

module.exports = {
  index(req, res, next) {
    res.send("Lists");
  },

  create(req, res, next) {
    let newList = {
      name: req.body.name
    };
    listQueries.addList(newList, (err, list) => {
      if (err) {
        //  res.send(err);
        res.status(500).send({ message: err })
      } else {
        res.status(201).send("New List Created: " + newList.name);
      }
    })
  },

  getAllLists(req, res, next) {
    listQueries.getAllLists((err, lists) => {
      if (err) {
        res.status(500).send({ message: err })
      } else {
        res.status(200).send({ lists });
      }
    })
  },

  show(req, res, next) {

    listQueries.getList(req.params.id, (err, list) => {

      if (err || list == null) {
        res.status(500).send({ message: err })
      } else {
        res.status(200).send({ list });
      }
    });
  },


  destroy(req, res, next) {
    listQueries.deleteList(req.params.id, (err, topic) => {
      if (err) {
        res.status(500).send({ message: err })
      } else {
        res.status(200).send({message: "List Deleted Successfully"})
      }
    });
  },

  update(req, res, next) {

    listQueries.updateList(req.params.id, req.body, (err, list) => {
      if (err || list == null) {
        res.status(500).send({ message: err })
      } else {
        res.status(200).send({message: "List with id of '" + req.params.id + "' updated."});
      }
    })
  }

}