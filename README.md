# Node Dev Toolkit

A comprehensive toolkit for Node.js developers providing essential utilities for common development tasks.

[![npm version](https://badge.fury.io/js/node-dev-toolkit.svg)](https://badge.fury.io/js/node-dev-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install node-dev-toolkit
```

## Features

### 1. String Utilities

```typescript
import { StringUtils } from 'node-dev-toolkit';

// Capitalize text
StringUtils.capitalize('hello world'); // 'Hello world'

// Create URL-friendly slugs
StringUtils.slugify('Hello World!'); // 'hello-world'

// Truncate long text
StringUtils.truncate('Long text here', 8); // 'Long...'

// Validate email
StringUtils.isEmail('user@example.com'); // true
```

### 2. Date Utilities

```typescript
import { DateUtils } from 'node-dev-toolkit';

// Format dates
DateUtils.format(new Date(), 'yyyy-MM-dd'); // '2024-01-01'

// Parse date strings
const date = DateUtils.parse('2024-01-01');

// Add days
DateUtils.addDays(new Date(), 5);

// Check for weekends
DateUtils.isWeekend(new Date()); // true/false
```

### 3. Number Utilities

```typescript
import { NumberUtils } from 'node-dev-toolkit';

// Format numbers
NumberUtils.format(1234.56); // '1,234.56'

// Format currency
NumberUtils.formatCurrency(1234.56, 'EUR'); // '€1,234.56'

// Clamp numbers
NumberUtils.clamp(5, 0, 10); // 5
NumberUtils.clamp(-5, 0, 10); // 0

// Generate random numbers
NumberUtils.random(1, 100); // Random number between 1 and 100
```

### 4. Object Utilities

```typescript
import { ObjectUtils } from 'node-dev-toolkit';

// Pick specific properties
ObjectUtils.pick({ a: 1, b: 2, c: 3 }, ['a', 'b']); // { a: 1, b: 2 }

// Omit properties
ObjectUtils.omit({ a: 1, b: 2, c: 3 }, ['a']); // { b: 2, c: 3 }

// Deep clone objects
const clone = ObjectUtils.deepClone(complexObject);

// Merge objects
ObjectUtils.merge(target, source1, source2);
```

### 5. Internationalization (i18n)

```typescript
import { Translator } from 'node-dev-toolkit';

const translator = new Translator('en');

// Add translations
translator.addTranslations('en', {
  welcome: 'Welcome {{name}}!',
  messages: {
    hello: 'Hello {{name}}'
  }
});

// Use translations
translator.translate('welcome', { name: 'John' }); // 'Welcome John!'
translator.translate('messages.hello', { name: 'Jane' }); // 'Hello Jane'
```

### 6. Security

#### Password Management
```typescript
import { PasswordManager } from 'node-dev-toolkit';

// Hash passwords
const hash = await PasswordManager.hash('myPassword');

// Verify passwords
const isValid = await PasswordManager.verify('myPassword', hash);
```

#### Token Management
```typescript
import { TokenManager } from 'node-dev-toolkit';

const tokenManager = new TokenManager('your-secret-key');

// Generate tokens
const token = tokenManager.generate({ userId: 123 }, { expiresIn: '1h' });

// Verify tokens
const payload = tokenManager.verify(token);

// Decode tokens
const decoded = tokenManager.decode(token);
```

### 7. Validation

```typescript
import { SchemaValidator } from 'node-dev-toolkit';

// Create schemas
const userSchema = SchemaValidator.object({
  name: SchemaValidator.string(),
  age: SchemaValidator.number(),
  email: SchemaValidator.email()
});

// Validate data
const result = userSchema.safeParse({
  name: 'John',
  age: 30,
  email: 'john@example.com'
});
```

### 8. Error Handling

```typescript
import { ValidationError, NotFoundError, UnauthorizedError } from 'node-dev-toolkit';

// Custom errors with status codes and details
throw new ValidationError('Invalid input', { field: 'email' });
throw new NotFoundError('User not found');
throw new UnauthorizedError();
```

## Testing

The package includes comprehensive tests for all features. To run the tests:

```bash
npm test
```

### Test Coverage

- String Utilities: Format, validation, and manipulation
- Date Utilities: Parsing, formatting, and calculations
- Number Utilities: Formatting and mathematical operations
- Object Utilities: Property manipulation and deep operations
- Internationalization: Translation management and string interpolation
- Security: Password hashing and token management
- Validation: Schema validation and data verification
- Error Handling: Custom error types and status codes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.