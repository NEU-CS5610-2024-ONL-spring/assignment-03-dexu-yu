import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

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
app.get("/checklists", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });
  const checklists = await prisma.Checklist.findMany({
    where: {
      userId: user.id,
    },
  });
  res.status(200).json(checklists);
});

// Add a checklist
app.post("/checklist", requireAuth, async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).send("Title can't be empty!");
    return;
  }
  const auth0Id = req.auth.payload.sub;
  const checklist = await prisma.Checklist.create({
    data: {
      title,
      user: { connect: { auth0Id } },
    },
  });
  res.status(200).json(checklist);
});

// Delete a checklist by id
app.delete("/checklist/:id", requireAuth, async (req, res) => {
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
app.delete('/checklist/:checklistId/items', requireAuth, async (req, res) => {
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


// Get all items from a list of checklists
app.post("/checklist-items", requireAuth, async (req, res) => {
  const checklistIds = req.body.checklistIds;

  console.log("checklistIds", checklistIds);

  if (!checklistIds) {
    return res.status(400).json({ message: "Not provide checklistIds." });
  }

  if (!checklistIds.length) {
    console.log("No checklist items found");
    return res.status(200).json([]);
  }

  try {
    const checklistItems = await prisma.checklistsItem.findMany({
      where: {
        checklistId: {
          in: checklistIds,
        },
      },
    });
    console.log("checklistItems", checklistItems);

    res.status(200).json(checklistItems);
  } catch (error) {
    console.error("Error fetching checklist items: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all the checklists items
app.get("/clitems", requireAuth, async (req, res) => {
  const checklists = req.body;
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
app.get("/clitems/:id", requireAuth, async (req, res) => {
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
app.post("/clitem", requireAuth, async (req, res) => {
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

// Update a checklists item
app.put("/clitem/:id", requireAuth, async (req, res) => {
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
app.delete("/clitem/:id", requireAuth, async (req, res) => {
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

// Verify user
app.post("/verify-user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        auth0Id,
        name,
        avatar: `${process.env.DEFAULT_AVATAR}`,
      },
    });

    res.json(newUser);
  }
});

// Get profile
app.get("/profile", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  res.json(user);
});

// Update profile
app.put("/profile", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const { name, avatar } = req.body;

  const user = await prisma.user.update({
    where: {
      auth0Id,
    },
    data: {
      name,
      avatar,
    },
  });

  res.json(user);
});

app.listen(8000, () => {
  console.log("listening on http://localhost:8000");
});
