from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with a real secret key


# --- Data for the Website ---

# In a real application, this data would likely come from a database.

SKILLS = {
    'Front-End': ['HTML', 'CSS', 'JavaScript', 'React'],
    'Back-End': ['Python', 'Flask', 'Node.js', 'Express'],
    'Databases': ['MongoDB', 'PostgreSQL', 'SQLite'],
    'DevOps': ['Docker', 'Git', 'GitHub Actions']
}

PROJECTS = [
    {
        'title': 'Project One',
        'description': 'A full-stack web application that does amazing things.',
        'image': 'project1.jpg',
        'category': 'fullstack'
    },
    {
        'title': 'Project Two',
        'description': 'A beautiful and responsive front-end design for a fictional company.',
        'image': 'project2.jpg',
        'category': 'frontend'
    },
    {
        'title': 'Project Three',
        'description': 'A robust and scalable REST API for a mobile application.',
        'image': 'project3.jpg',
        'category': 'backend'
    }
]


# --- Route Definitions ---

@app.route('/')
def home():
    """Render the home page."""
    return render_template('index.html')

@app.route('/about')
def about():
    """Render the about page."""
    return render_template('about.html')

@app.route('/skills')
def skills():
    """Render the skills page with a list of skills."""
    return render_template('skills.html', skills=SKILLS)

@app.route('/projects')
def projects():
    """Render the projects page with a list of projects."""
    return render_template('projects.html', projects=PROJECTS)

@app.route('/resume')
def resume():
    """Render the resume page."""
    return render_template('resume.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Render the contact page and handle form submissions."""
    if request.method == 'POST':
        # In a real application, you would handle the form data here
        # (e.g., send an email, save to a database).
        flash('Thank you for your message!', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')


# --- Error Handlers ---

@app.errorhandler(404)
def not_found_error(error):
    """Render a custom 404 error page."""
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    """Render a custom 500 error page."""
    return render_template('500.html'), 500


# --- Main Application Runner ---

if __name__ == '__main__':
    app.run(debug=True)
