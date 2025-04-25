# Node.js Application Template

A modern, secure, and scalable template for Node.js applications built with Express.js.

## Features

- User authentication and authorization
- Role-based access control
- Session management with MySQL
- Modern UI with Bootstrap 5
- Responsive design
- Form validation
- Password strength checking
- Error handling
- Logging
- Rate limiting
- Security best practices

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd app-template
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=app_template
SESSION_KEY=your_session_key
SESSION_SECRET=your_session_secret
```

4. Create the database:
```sql
CREATE DATABASE app_template;
```

5. Start the application:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Project Structure

```
app-template/
├── bin/                # Application entry point
├── config/            # Configuration files
├── middleware/        # Custom middleware
├── models/           # Database models
├── public/           # Static files
│   ├── css/         # Stylesheets
│   ├── js/          # Client-side JavaScript
│   └── images/      # Images
├── routes/           # Route handlers
├── views/            # Pug templates
├── __tests__/        # Test files
├── __mocks__/        # Mock files for testing
├── app.js            # Express application setup
├── config.js         # Application configuration
└── package.json      # Project dependencies
```

## Available Scripts

- `npm start`: Start the application
- `npm run dev`: Start the application with auto-reload
- `npm test`: Run tests
- `npm run lint`: Run ESLint

## Security Features

- Password hashing with bcrypt
- Session management with MySQL
- Rate limiting
- CSRF protection
- XSS protection
- SQL injection prevention
- Secure headers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Express.js
- Bootstrap
- Sequelize
- Pug
- And all other open-source contributors 