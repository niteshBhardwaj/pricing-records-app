import express, { Request, Response } from "express";
import csvParser from "csv-parser";
import fs from "fs";
import multer from "multer";
import cors from 'cors';

const upload = multer({ dest: 'uploads/' })

interface PricingRecord {
  id: number,
  storeID: string;
  SKU: string;
  productName: string;
  price: number;
  date: string;
}
// temporary id creation;
let getId = () => {
  return +new Date() + Math.round(Math.random() * 1000)
}

// memory price record array
let pricingRecords: PricingRecord[] = [{
      id: getId(),
      storeID: "1",
      SKU: "2",
      productName: "XYZ server",
      price: 123,
      date: "24 Sep 2022"
    }];

const app = express();
app.use(cors())
app.use(express.json());
// GET all pricing records
app.get("/pricing-records", (_req: Request, res: Response) => {
  res.send(pricingRecords);
});

// GET pricing record by ID
app.get("/pricing-records/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const record = pricingRecords.find((record) => record.storeID === id);

  if (!record) {
    res.status(404).send({ message: "Pricing record not found" });
    return;
  }

  res.send(record);
});

// POST new pricing record
app.post("/pricing-records", (req: Request, res: Response) => {
  const newRecord: PricingRecord = req.body;
  pricingRecords.push(newRecord);
  res.status(201).send(newRecord);
});

// PUT pricing record by ID
app.put("/pricing-records/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedRecord: PricingRecord = req.body;
  const index = pricingRecords.findIndex((record) => record.storeID === id);

  if (index === -1) {
    res.status(404).send({ message: "Pricing record not found" });
    return;
  }

  pricingRecords[index] = updatedRecord;
  res.send(updatedRecord);
});

// DELETE pricing record by ID
app.delete("/pricing-records/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const index = pricingRecords.findIndex((record) => record.storeID === id);

  if (index === -1) {
    res.status(404).send({ message: "Pricing record not found" });
    return;
  }

  pricingRecords.splice(index, 1);
  res.sendStatus(204);
});

// POST endpoint for uploading CSV files
app.post(
  "/pricing-records/upload",
  upload.single("file"),
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).send({ message: "No file uploaded" });
      return;
    }
    const filePath = req.file.path;
    const results: PricingRecord[] = [];
    // Parse CSV file    
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data: any) => {
        const record: PricingRecord = {
          id: getId(),
          storeID: data["Store ID"],
          SKU: data.SKU,
          productName: data["Product Name"],
          price: parseFloat(data.Price),
          date: new Date(data.Date).toDateString()
        };

        results.push(record);
      })
      .on("end", () => {
        // Add parsed records to in-memory store
        pricingRecords.push(...results);

        // Delete uploaded file
        fs.unlinkSync(filePath);

        res.send({ message: "File uploaded successfully", records: results });
      });
  }
);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
