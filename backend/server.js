const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// Importar features (esto lo harán todos)
const setupCalculadoraFeature = require('./features/feature-calculadora');