# CodeKataBattle Web Application

**POLITECNICO DI MILANO - SOFTWARE ENGINEERING II**

A comprehensive web platform for organizing and managing programming tournaments and code kata battles between students, with automated evaluation and GitHub integration.

## 🎯 Project Overview

CodeKataBattle is a full-stack web application that enables educators to create programming tournaments where students compete in coding challenges. The platform features automated code evaluation, GitHub integration, team management, and real-time scoring systems.

## 🏗️ Architecture

The application follows a modern full-stack architecture:

- **Frontend**: React.js with Tailwind CSS and Chakra UI
- **Backend**: Django REST Framework with PostgreSQL
- **Task Queue**: Celery with Redis for background processing
- **Integration**: GitHub API for repository management
- **Authentication**: JWT-based authentication with social login

## 📁 Project Structure

```
ITD/CKBApp/
├── backend/                    # Django REST API
│   ├── user_management/        # User profiles and authentication
│   ├── tournament_management/  # Tournament and battle management
│   ├── team_github_integration/# GitHub integration and team management
│   ├── automated_evaluation/   # Code evaluation system
│   ├── scoring_system/         # Scoring and ranking algorithms
│   └── software_projects/      # Project template management
└── frontend/                   # React.js application
    ├── src/
    │   ├── components/         # Reusable UI components
    │   ├── views/              # Page components
    │   └── services/           # API integration
    └── public/
```

## 🚀 Key Features

### For Educators

- **Tournament Creation**: Design and manage programming tournaments
- **Battle Management**: Create coding challenges with automated evaluation
- **Student Monitoring**: Track student progress and performance
- **Scoring Configuration**: Set up custom scoring criteria
- **GitHub Integration**: Automatically fork repositories for teams

### For Students

- **Tournament Participation**: Join tournaments and form teams
- **Code Submission**: Submit solutions via GitHub repositories
- **Real-time Feedback**: Get automated evaluation results
- **Rankings**: View global and tournament-specific rankings
- **Profile Management**: Customize profiles and track achievements

### System Features

- **Automated Evaluation**: Background processing of code submissions
- **GitHub Integration**: Seamless repository management and forking
- **Real-time Updates**: Live tournament status and score updates
- **Responsive Design**: Mobile-friendly interface
- **Role-based Access**: Different interfaces for educators and students

## 🛠️ Technology Stack

### Backend

- **Django 4.2.9** - Web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Database
- **Celery** - Background task processing
- **Redis** - Message broker and caching
- **PyGithub** - GitHub API integration
- **JWT** - Authentication tokens

### Frontend

- **React 18.2** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Chakra UI** - Component library
- **Axios** - HTTP client
- **React Router** - Navigation
- **Framer Motion** - Animations

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL
- Redis
- Git

## 🔧 Installation & Setup

### Backend Setup

1. Navigate to the backend directory:

```bash
cd ITD/CKBApp/backend
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Configure environment variables:

```bash
# Create .env file with database and GitHub credentials
```

4. Run database migrations:

```bash
python manage.py migrate
```

5. Start the Django development server:

```bash
python manage.py runserver
```

6. Start Celery worker (in separate terminal):

```bash
celery -A backend worker --loglevel=info
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ITD/CKBApp/frontend
```

2. Install Node.js dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

## 📖 Documentation

- **RASD**: [Requirements Analysis and Specification Document](https://docs.google.com/document/d/1jUIibIr0-CjV3PfVqAuxTI0fDVvDnhLWrgBYxLqYKsI/edit?usp=sharing)
- **DD**: [Design Document](https://docs.google.com/document/d/1CYZAEXlCPdyZWeev4ro-wO1cGzP8o1JyO6zUGtj9F60/edit?usp=sharing)
- **ITD**: [Implementation and Testing Document](https://docs.google.com/document/d/1N2RyZKrJvkTAknL-LLb74XXQP1tU7UNW2QTBdnN7Cpk/edit?usp=sharing)
- **ATD**: [Acceptance Testing Document](https://docs.google.com/document/d/1wPn3aalsZyMzqkIkIC2HPSFeaRjfE7RRZMIlFtwRNzQ/edit?usp=sharing)

## 📱 API Endpoints

The backend provides RESTful APIs for:

- User authentication and profile management
- Tournament and battle operations
- Team formation and GitHub integration
- Automated evaluation and scoring
- Real-time notifications and updates

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- CORS configuration for cross-origin requests
- Secure environment variable management
- Input validation and sanitization

## 🧪 Testing

Run backend tests:

```bash
python manage.py test
```

Run frontend tests:

```bash
npm test
```

## 📈 Monitoring

- Celery beat for scheduled tasks
- Database query optimization
- Real-time tournament status updates
- GitHub API rate limiting handling

## 👨‍💻 Authors

- **Daniel Maurio Ruiz Suarez**
- **Sebastian Enrique Perea Lopez**

## 📄 License

This project is part of the Software Engineering II course at Politecnico di Milano.

---

_Built with ❤️ for competitive programming education_
