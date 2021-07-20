//const sql = require("./db.js");
import sql from "./db.js"

// constructor
const Event = function(event) {
    this.eventName = event.eventName;
    this.eventDate = event.eventDate;
    this.eventLink = event.eventLink;
    this.eventAddress = event.eventAddress;
    this.eventDescription = event.eventDescription;
    this.typeEventId = event.typeEventId;
    this.canalEventId = event.canalEventId;
    this.userId = event.userId;
};

Event.create = (newEvent, result) => {
    let reqSql = "INSERT INTO evenements (eventName, eventDate, eventLink, eventAddress, eventDescription, typeEventId, canalEventId, userId) VALUES ? ";
    let record = [[newEvent.eventName, newEvent.eventDate, newEvent.eventLink, newEvent.eventAddress, newEvent.eventDescription, newEvent.typeEventId, newEvent.canalEventId, newEvent.userId]];
    sql.query(reqSql, [record] , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created event: ", { id: res.insertId, ...newEvent });
        result(null, { id: res.insertId, ...newEvent });
    });
};

Event.getAllEventTypes = result => {
    sql.query("SELECT * FROM type_evenement", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("EventTypes: ", res);
        result(null, res);
    });
};

Event.getAllEventCanals = result => {
    sql.query("SELECT * FROM canal_evenement", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("EventCanals: ", res);
        result(null, res);
    });
};

Event.getAll = result => {
    sql.query("SELECT * FROM evenements", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("evenements: ", res);
        result(null, res);
    });
};

Event.getAllByType = (typeId, userId, result) => {
    let reqSql = `SELECT * FROM evenements WHERE typeEventId = ${typeId}`
    if(userId != 'false'){
        reqSql = reqSql + " AND userId = " + userId
    }
    sql.query(reqSql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found events : ", res);
            result(null, res);
            return;
        }

        // not found events with the type
        result({ kind: "not_found" }, null);
    });
};

Event.getAllByCanal = (canalId, userId, result) => {
    let reqSql = `SELECT * FROM evenements WHERE canalEventId = ${canalId}`
    if(userId != 'false'){
        reqSql = reqSql + " AND userId = " + userId
    }
    sql.query(reqSql , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found events : ", res);
            result(null, res);
            return;
        }

        // not found events with the type
        result({ kind: "not_found" }, null);
    });
};

export default Event;
