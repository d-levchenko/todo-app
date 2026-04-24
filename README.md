# Todo App

A simple todo application built with vanilla JavaScript, HTML, and CSS using Vite as the build tool.

## Features

- Add new todos
- Mark todos as completed
- Delete todos
- Filter todos by all, active, completed
- Clear completed todos
- Dark and light theme toggle
- Persistent storage using localStorage

## Tech Stack

- **Vanilla JavaScript**: No frameworks, pure JS for logic
- HTML5
- CSS3
- Vite: For development and build

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:d-levchenko/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

- `src/index.html`: Main HTML file
- `src/js/main.js`: Main application logic
- `src/js/refs.js`: DOM references
- `src/js/storage.js`: Storage utilities
- `src/css/`: Stylesheets
- `src/partials/`: HTML partials

## Author

Dmytro Levchenko <dl.qubb@gmail.com>

## License

ISC
