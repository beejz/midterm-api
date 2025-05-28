import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult } from 'express-validator';

const app = express();
const PORT = process.env.PORT || 5001;

// Default data mapping rules
const defaultPost = {
  name: 'Shuntaro Chishiya',
  description: 'Jack/King + Queen', // birthdate mapping
  price: 11038                      // last 5 digits of your ID
};

const defaultPut = {
  name: 'Le Sserafim',
  description: 'Act like an angel and dress like crazy\nAll the girls are girling, girling',
  price: 13247534                   // monthly Spotify listeners
};

// In-memory store
let products = [];

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

// Helper: centralized error formatter
function handleErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// CRUD routes

// GET /products → list all
app.get('/products', (req, res) => {
  res.json(products);
});

// GET /products/:id → fetch one
app.get('/products/:id', (req, res) => {
  const prod = products.find(p => p.id === req.params.id);
  if (!prod) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(prod);
});

// POST /products → create
app.post(
  '/products',
  // validations
  body('name').optional().isString().notEmpty(),
  body('description').optional().isString().notEmpty(),
  body('price').optional().isInt({ min: 0 }),
  handleErrors,
  (req, res) => {
    const { name, description, price } = req.body;
    const newProduct = {
      id: uuidv4(),
      name: name || defaultPost.name,
      description: description || defaultPost.description,
      price: price != null ? price : defaultPost.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  }
);

// PUT /products/:id → update
app.put(
  '/products/:id',
  body('name').optional().isString().notEmpty(),
  body('description').optional().isString().notEmpty(),
  body('price').optional().isInt({ min: 0 }),
  handleErrors,
  (req, res) => {
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx < 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const { name, description, price } = req.body;
    const updated = {
      id: req.params.id,
      name: name || defaultPut.name,
      description: description || defaultPut.description,
      price: price != null ? price : defaultPut.price
    };
    products[idx] = updated;
    res.json(updated);
  }
);

// DELETE /products/:id → remove
app.delete('/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx < 0) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products.splice(idx, 1);
  res.sendStatus(204);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
