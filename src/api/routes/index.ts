import express, { NextFunction, Request, Response } from "express";
import { writeFileSync } from "fs";
import type { Character } from "../../lib/types";
import jsonDB from "../data/db.json";
import Busboy from "busboy";
import path from "path";

// Express Router
const router = express.Router();

// Json DB
let DB = JSON.parse(JSON.stringify(jsonDB));

// Schema Exists Middleware
const schemaExists = (req: Request, res: Response, next: NextFunction) => {
  // Check that schema exists
  if (!DB[req.params.schema]) {
    res.status(404).send("Invalid Schema");

    // Check that id is a valid number
  } else if (req.params.id && isNaN(parseInt(req.params.id))) {
    res.status(404).send("Invalid ID");

    // Check that id exists
  } else if (
    req.params.id &&
    !DB[req.params.schema].find(
      (it: Character) => it.id === parseInt(req.params.id)
    )
  ) {
    res.status(404).send("Invalid ID - ID does not exist");
  } else {
    next();
  }
};

// GET all
router.get("/:schema", schemaExists, (req, res, next) => {
  console.log("GET");
  res.json(DB[req.params.schema]);
});

// PUT
router.put("/:schema/:id", (req, res, next) => {
  console.log("PUT");
  const id = parseInt(req.params.id);
  const index = DB[req.params.schema].findIndex(
    (it: Character) => it.id === id
  );
  DB[req.params.schema][index] = { ...req.body, id };
  saveDb();
  res.status(201);
  res.json(DB[req.params.schema][index]);
});

// POST
router.post("/:schema", (req, res, next) => {
  if (!DB[req.params.schema]) {
    DB[req.params.schema] = [];
  }
  const item = { ...req.body, id: nextId(req.params.schema) };
  DB[req.params.schema].push(item);
  saveDb();
  res.status(201);
  res.json(item);
});

// DELETE
router.delete("/:schema/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = DB[req.params.schema].findIndex(
    (it: Character) => it.id === id
  );
  DB[req.params.schema].splice(index, 1);
  saveDb();
  res.status(200).json("");
});

// Persist schema to file storage
const saveDb = () => {
  writeFileSync(
    path.join(__dirname, "../data/db.json"),
    JSON.stringify(DB, null, 2)
  );
};

// Find the next largest ID in the schema
const nextId = (schema: string) => {
  const item =
    (DB &&
      DB[schema] &&
      DB[schema].length &&
      DB[schema].reduce((prev: Character, curr: Character) =>
        prev.id > curr.id ? prev : curr
      )) ||
    0;
  return item.id + 1;
};

// File Upload
router.post("/", (req, res, next) => {
  const busboy = Busboy({ headers: req.headers });
  let contents: Buffer | null = null;
  busboy.on("file", (fieldname: string, file: NodeJS.ReadableStream) => {
    file.on("data", (data: Buffer) => {
      contents = !contents ? data : Buffer.concat([contents, data]);
    });
  });
  busboy.on("finish", function () {
    const data = contents ? contents.toString() : "";
    try {
      const json = JSON.parse(data);
      res.status(200).json(json);
    } catch (e) {
      res.status(400).send("Unable to parse file data");
    }
  });
  req.pipe(busboy);
});

export default router;
