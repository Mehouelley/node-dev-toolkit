# Node Dev Toolkit Test Project

This project demonstrates the usage of the node-dev-toolkit package with various features and utilities.

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Available Endpoints

### String Utilities
- GET `/api/utils/string/:text`
  Tests string manipulation utilities (capitalize, slugify, truncate)

### Date Utilities
- GET `/api/utils/date`
  Tests date formatting and manipulation

### Cache Operations
- POST `/api/cache/set`
  ```json
  {
    "key": "test-key",
    "value": "test-value"
  }
  ```
- GET `/api/cache/get/:key`
  Retrieves cached value by key

## Testing the Features

Using curl:

```bash
# Test string utilities
curl http://localhost:3000/api/utils/string/Hello%20World

# Test date utilities
curl http://localhost:3000/api/utils/date

# Test cache set
curl -X POST http://localhost:3000/api/cache/set \
  -H "Content-Type: application/json" \
  -d '{"key":"test","value":"hello world"}'

# Test cache get
curl http://localhost:3000/api/cache/get/test
```