const queue = require("../data/queue");

// GET /api/queue
const getQueue = (req, res) => {
    res.json(queue);
};

// PUT /api/queue/:room
const updateQueue = (req, res) => {

    const room = req.params.room;
    const { number } = req.body;

    console.log("Room:", room);
    console.log("Queue object:", queue);

    if (!queue[room]) {
        return res.status(404).json({
            success: false,
            message: "Room not found"
        });
    }

    queue[room].number = String(number).padStart(3, "0");

    res.json({
        success: true,
        room: queue[room]
    });

};

module.exports = {
    getQueue,
    updateQueue
};