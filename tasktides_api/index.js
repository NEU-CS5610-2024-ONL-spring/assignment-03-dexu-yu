import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.get("/ping", (req, res) => {
  res.send("pong");
});

// Checklists

// Get all the checklists
app.get("/checklists", async (req, res) => {
  try {
    const checklists = await prisma.Checklist.findMany({});
    res.status(200).json(checklists);
  } catch (err) {
    console.log("Can't get checklists!", err);
    res.status(500).json({
      message: "Can't get all the checklists!",
    });
  }
});

// Add a checklist
app.post("/checklist", async (req, res) => {
  try {
    const { title } = req.body;
    const checklist = await prisma.Checklist.create({
      data: {
        title,
      },
    });
    res.status(200).json(checklist);
  } catch (err) {
    console.log("Can't create the checklist", err);
    res.status(500).json({
      message: "Can't create the checklist!",
    });
  }
});

// Delete a checklist by id
app.delete("/checklist/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const checklist = await prisma.Checklist.delete({
      where: {
        id,
      },
    });
    res.status(200).json(checklist);
  } catch (err) {
    console.log("Can't delete the checklist", err);
    res.status(500).json({
      message: "Can't delete the checklist!",
    });
  }
});

// Delete all checklist items by checklistId
app.delete('/checklist/:checklistId/items', async (req, res) => {
  try {
    const checklistId = parseInt(req.params.checklistId, 10);
    const checklistExists = await prisma.Checklist.findUnique({
      where: { id: checklistId },
    });

    if (!checklistExists) {
      return res.status(404).json({ message: "Checklist not found" });
    }

    const deletedItems = await prisma.ChecklistsItem.deleteMany({
      where: {
        checklistId: checklistId,
      },
    });

    res.status(200).json({ deletedCount: deletedItems.count });
  } catch (err) {
    console.error("Can't delete the checklist items", err);
    res.status(500).json({
      message: "Can't delete checklist items",
      error: err.message,
    });
  }
});

// ChecklistsItems

// Get all the checklists items
app.get("/clitems", async (req, res) => {
  try {
    const items = await prisma.ChecklistsItem.findMany({});
    res.status(200).json(items);
  } catch (err) {
    console.log("Can't get all the checklists items!", err);
    res.status(500).json({
      message: "Can't get all the checklists items!",
    });
  }
});

// Get a checklists item by id
app.get("/clitems/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await prisma.ChecklistsItem.findUnique({
      where: {
        id,
      }
    });
    res.status(201).json(item);
  } catch (err) {
    console.log("Can't find a checklists item by id.", err);
    res.status(500).json({
      message: "Can't find a checklists item by id.",
    });
  }
})

// Add a checklists item
app.post("/clitem", async (req, res) => {
  try {
    const { checklistId, title, due, content, important, completed } = req.body;
    const item = await prisma.ChecklistsItem.create({
      data: {
        checklist: { connect: { id: checklistId, }, },
        title,
        due,
        content,
        important,
        completed,
      },
    });
    res.status(200).json(item);
  } catch (err) {
    console.log("Can't create the checklists item", err);
    res.status(500).json({
      message: "Can't create checklists item",
    });
  }
});

app.put("/clitem/:id", async (req, res) => {
  const { id } = req.params;
  const { title, due, content, important, completed } = req.body;

  try {
    const updatedItem = await prisma.checklistsItem.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        due,
        content,
        important,
        completed,
      },
    });
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error("Error updating the checklist item", err);
    res.status(500).json({
      message: "Error updating checklist item",
    });
  }
});

// Delete a checklists item
app.delete("/clitem/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const item = await prisma.ChecklistsItem.delete({
      where: {
        id,
      }
    });
    res.status(200).json(item);
  } catch (err) {
    console.log("Can't delete the checklists item", err);
    res.status(500).json({
      message: "Can't delete checklists item",
    });
  }
});

app.listen(8000, () => {
  console.log("listening on http://localhost:8000");
});
