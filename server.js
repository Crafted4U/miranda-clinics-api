const express = require("express");
const cors = require("cors");
const queueData = require("./data/queue");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:4200",
        "https://queue.mirandaclinics.com",
    ]
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Miranda Clinics API");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/queue", (req, res) => {
  res.json(queueData);
});

app.put("/api/queue/:room", (req, res) => {
  const { room } = req.params;
  const { number } = req.body;

  if (!queueData[room]) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }

  queueData[room].number = String(number).padStart(3, "0");

  return res.json({ success: true, room: queueData[room] });
});

app.put("/api/queue/:room/doctor-status", (req, res) => {
  const { room } = req.params;
  const { doctorIn, isIn } = req.body;

  if (!queueData[room]) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }

  const nextDoctorStatus = typeof doctorIn === "boolean"
    ? doctorIn
    : (typeof isIn === "boolean" ? isIn : null);

  if (nextDoctorStatus === null) {
    return res.status(400).json({ success: false, message: "doctorIn or isIn must be a boolean" });
  }

  queueData[room].doctorIn = nextDoctorStatus;

  return res.json({ success: true, room: queueData[room] });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Miranda Clinics API running on http://localhost:${PORT}`);
});