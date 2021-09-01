import sql from "./db.js"

// constructor
const Event = function(event) {
    this.eventName = event.eventName;
    this.eventDate = event.eventDate;
    this.eventHour = event.eventHour;
    this.eventLink = event.eventLink;
    this.eventAddress = event.eventAddress;
    this.eventDescription = event.eventDescription;
    this.typeEventId = event.typeEventId;
    this.canalEventId = event.canalEventId;
    this.userId = event.userId;
    this.eventImg = event.eventImg;
};

Event.create = (newEvent, result) => {
    let reqSql = "INSERT INTO evenements (eventName, eventDate, eventHour, eventLink, eventAddress, eventDescription, typeEventId, canalEventId, userId, eventImg) VALUES ? ";
    let record = [[newEvent.eventName, newEvent.eventDate, newEvent.eventHour, newEvent.eventLink, newEvent.eventAddress, newEvent.eventDescription, newEvent.typeEventId, newEvent.canalEventId, newEvent.userId, newEvent.eventImg]];
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

        console.log("EventTypes: ", res.length , " types");
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

        console.log("EventCanals: ", res.length, " canaux");
        result(null, res);
    });
};

Event.getAllWithDate = (objDates, result) => {
    var dateDebut = objDates.dateDebut;
    var dateFin = objDates.dateFin;
    sql.query(`SELECT * FROM evenements where eventDate between '${dateDebut} 00:00:00' and '${dateFin} 00:00:00'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("found evenements with dates: ", res.length, " événements");
        result(null, res);
    });
};

Event.getAllWithDateByUser = (objDates, userId, result) => {
    var dateDebut = objDates.dateDebut;
    var dateFin = objDates.dateFin;
    sql.query(`SELECT * FROM evenements where eventDate between '${dateDebut} 00:00:00' and '${dateFin} 00:00:00' AND userId = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("found evenements with dates: ", res.length, " événements");
        result(null, res);
    });
};

Event.updateById = (id, event, result) => {
    sql.query(
        "UPDATE evenements SET eventName = ?, eventDate = ?, eventHour = ?, eventLink = ?, eventAddress = ?, eventDescription = ?, typeEventId = ?, canalEventId = ?, eventImg = ? WHERE id = ?",
        [event.eventName, event.eventDate, event.eventHour, event.eventLink, event.eventAddress, event.eventDescription, event.typeEventId, event.canalEventId, event.eventImg, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated event: ", { id: id, ...event });
            result(null, { id: id, ...event });
        }
    );
};

Event.getAll = result => {
    sql.query("SELECT * FROM evenements", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (!res.length) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("found evenements: ", res.length, " événements");
        result(null, res);
    });
};

Event.getAllByUser = (userId, result) => {
    sql.query(`SELECT * FROM evenements where userId = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (!res.length) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("found evenements: ", res.length, " événements");
        result(null, res);
    });
};

Event.getAllOfTheDay = result => {
    sql.query("SELECT * FROM evenements WHERE eventDate = CURDATE()", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (!res.length) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("found evenements of the day: ", res.length, " événements");
        result(null, res);
    });
};

Event.getAllOfTheDayByUser = (userId, result) => {
    sql.query(`SELECT * FROM evenements where userId = ${userId} AND eventDate = CURDATE()`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (!res.length) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("found evenements of the day by user: ", res.length, " événéments");
        result(null, res);
    });
};

Event.findById = (eventId, result) => {
    sql.query(`SELECT * FROM evenements WHERE id = ${eventId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found event with id ", res[0].id);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
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
            console.log("found events by type: ", res.length , " événements");
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
            console.log("found events by canal : ", res.length , " événements");
            result(null, res);
            return;
        }

        // not found events with the type
        result({ kind: "not_found" }, null);
    });
};

Event.remove = (id, result) => {
    sql.query("DELETE FROM evenements WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted event with id: ", id);
        result(null, res);
    });
};

Event.getWithWord = (word, result) => {
    var word =  word;
    sql.query(`SELECT * FROM evenements where eventName LIKE '%${word}%'`, (err, res) => {
        console.log(`SELECT * FROM evenements where eventName LIKE '%${word}%'`);
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("found evenements with word : ", res.length, " événements");
        result(null, res);
    });
};

export default Event;
