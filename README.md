# Company-Management-System
A project for companies to use, to manage their data and employees for better growth of the comp

# Project Structure
company-management-system/
│
├── app/
│   ├── __init__.py              # Flask application factory
│   ├── models.py                # Database models (Employee, Department, etc.)
│   ├── routes/                  # Route handlers separated by functionality
│   │   ├── __init__.py
│   │   ├── auth.py              # Authentication routes (login, logout, register)
│   │   ├── employees.py         # Employee management routes
│   │   ├── departments.py       # Department management routes
│   │   └── main.py              # Main routes (home, about, etc.)
│   ├── templates/               # HTML templates
│   │   ├── base.html            # Base template with navigation
│   │   ├── index.html           # Homepage
│   │   ├── auth/                # Authentication templates
│   │   │   ├── login.html
│   │   │   └── register.html
│   │   ├── employees/           # Employee-related templates
│   │   │   ├── list.html
│   │   │   ├── add.html
│   │   │   └── edit.html
│   │   └── departments/         # Department-related templates
│   │       ├── list.html
│   │       ├── add.html
│   │       └── edit.html
│   ├── static/                  # Static files
│   │   ├── css/
│   │   │   ├── style.css        # Main stylesheet
│   │   │   └── dashboard.css    # Dashboard-specific styles
│   │   ├── js/
│   │   │   ├── main.js          # Main JavaScript file
│   │   │   └── chart.js         # Charts and graphs
│   │   └── images/              # Images and icons
│   │       ├── logo.png
│   │       └── favicon.ico
│   ├── utils/                   # Utility functions
│   │   ├── __init__.py
│   │   ├── helpers.py           # Helper functions
│   │   └── validators.py        # Custom validators
│   └── config.py                # Configuration settings
│
├── migrations/                  # Database migration files (if using Flask-Migrate)
├── instance/                    # Instance-specific files (like config overrides)
│   └── config.py
├── tests/                       # Test files
│   ├── __init__.py
│   ├── test_models.py
│   ├── test_routes.py
│   └── test_utils.py
├── venv/                        # Virtual environment (not in version control)
├── requirements.txt             # Project dependencies
├── config.py                    # Main configuration
└── run.py                       # Application entry point