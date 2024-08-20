# wisdar2
Project Name: Wisdar
Description
Wisdar is a Django-based web application designed for a news agency. The application is currently under development and features minimal HTML and front-end elements. Future updates will include a more comprehensive interface with additional filtering options.

Features
User authentication with email verification (using django-allauth).
Admin interface for content management.
Debug toolbar for development purposes.
Modular structure with the ability to add new apps.
Installation
Clone the Repository:

bash
#####
git clone https://github.com/bagdadinvest/wisdar2
cd wisdar
Create a Virtual Environment:

bash
#####
python3 -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
Install Dependencies:

bash
#####
pip install -r requirements.txt
Environment Variables:
Set up the following environment variables in a .env file or your system environment:

env
#####
DJANGO_SECRET_KEY=your-secret-key
DJANGO_PRODUCTION=false  # Set to true in production
Run Migrations:

bash
#####
python manage.py migrate
Create a Superuser:

bash
#####
python manage.py createsuperuser
Run the Development Server:

bash
#####
python manage.py runserver
Configuration
ASGI and WSGI:
The application supports both ASGI and WSGI interfaces for deployment.

Static Files:
Ensure static files are collected in production by running:

bash
#####
python manage.py collectstatic
Deployment on Azure Websites
Deployment Process:

The Wisdar application will be deployed on Azure Websites for trial purposes, particularly targeting non-developers. We have set up an automated workflow to deploy the application directly from GitHub.
Each time changes are pushed to the GitHub repository, the deployment will automatically trigger, including managing migrations and other necessary tasks.
Accessing the Admin Panel:

After deployment, non-developers will be provided with a username and password to access the Django admin panel. The admin panel can be accessed at https://your-app-url.azurewebsites.net/admin/.
All administrative tasks, including content management, can be performed through this panel. We will handle migrations, user management, and other backend tasks during deployment.
Installed Applications
Django Admin: For managing the application content.
Django Allauth: For handling user registration, login, and social account integration.
Debug Toolbar: Enabled in development mode for debugging.
URL Configuration
The main URL patterns are defined in urls.py:

/admin/ for the admin panel.
/accounts/ for user authentication.
Root URL includes the main app’s URLs.
Email Configuration
The application uses SMTP with Office365 for sending emails. Set up the following in settings.py:

python
#####
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.office365.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@outlook.com'
EMAIL_HOST_PASSWORD = 'your-password'
DEFAULT_FROM_EMAIL = 'your-email@outlook.com'
License
Include licensing information here, if applicable.

Documentation Outline
1. Introduction
Overview of the application.
Key features and technologies used.
2. Setup and Installation
Detailed steps for setting up the project locally.
Configuration options and environment variables.
3. Architecture
Description of the project structure.
Key components (apps, settings, URL routing).
4. Database and Models
Overview of the database setup and models used.
Migration instructions.
5. Authentication
Detailed explanation of user authentication and registration processes.
Email verification and social authentication.
6. Static and Media Files
How static files are managed and where they are located.
Instructions for collecting static files in production.
7. Deployment
Azure Websites Deployment: Instructions for deploying the application to Azure Websites.
Accessing the Admin Panel: Details on how non-developers can access and manage the application via the admin panel.
Automated Workflow: Explanation of the automated deployment process from GitHub, including migrations and environment management.
8. Testing
How to run tests (if applicable).
Explanation of any test cases provided.
9. Additional Resources
Links to Django documentation, packages used, etc.
Further reading or tutorials for extending the application.
Next Steps
Please provide the settings file from your current Azure website deployment, and I will adapt the settings.py for the Wisdar project accordingly. This will ensure that the application is configured correctly for deployment on Azure Websites. Once that is done, we can proceed with any additional customizations or instructions you require.






