import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Global error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
