from flask import Flask, render_template, request, flash, redirect, url_for
import os

# Initialize Flask application
app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this in production

# Configuration
app.config['DEBUG'] = True

@app.route('/')
def home():
    """Home page route - displays hero section and introduction"""
    return render_template('index.html')

@app.route('/about')
def about():
    """About page route - displays detailed biography and profile information"""
    return render_template('about.html')

@app.route('/skills')
def skills():
    """Skills page route - showcases technical skills organized by category"""
    # Skills data (in production, this could come from a database)
    skills_data = {
        'frontend': ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Bootstrap'],
        'backend': ['Python', 'Flask', 'Django', 'Node.js', 'Express', 'FastAPI'],
        'tools': ['Git', 'Docker', 'AWS', 'PostgreSQL', 'MongoDB', 'Postman']
    }
    return render_template('skills.html', skills=skills_data)

@app.route('/projects')
def projects():
    """Projects page route - displays portfolio projects"""
    # Sample projects data (in production, this could come from a database)
    projects_data = [
        {
            'title': 'E-commerce Platform',
            'description': 'Full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.',
            'technologies': ['Flask', 'PostgreSQL', 'JavaScript', 'Bootstrap'],
            'image': 'placeholder.jpg',
            'demo_link': '#',
            'source_link': '#'
        },
        {
            'title': 'Task Management App',
            'description': 'Collaborative task management application with real-time updates and team collaboration features.',
            'technologies': ['React', 'Node.js', 'MongoDB', 'Socket.io'],
            'image': 'placeholder.jpg',
            'demo_link': '#',
            'source_link': '#'
        },
        {
            'title': 'Data Visualization Dashboard',
            'description': 'Interactive dashboard for data analysis with charts, graphs, and real-time data processing.',
            'technologies': ['Python', 'D3.js', 'Flask', 'Chart.js'],
            'image': 'placeholder.jpg',
            'demo_link': '#',
            'source_link': '#'
        }
    ]
    return render_template('projects.html', projects=projects_data)

@app.route('/resume')
def resume():
    """Resume page route - displays work experience and education"""
    # Resume data (in production, this could come from a database)
    experience = [
        {
            'title': 'Senior Full Stack Developer',
            'company': 'Tech Solutions Inc.',
            'period': '2022 - Present',
            'description': 'Led development of scalable web applications using Python, Flask, and React.'
        },
        {
            'title': 'Frontend Developer',
            'company': 'Digital Agency',
            'period': '2020 - 2022',
            'description': 'Developed responsive websites and interactive user interfaces for various clients.'
        }
    ]
    
    education = [
        {
            'degree': 'Bachelor of Science in Computer Science',
            'institution': 'University of Technology',
            'period': '2016 - 2020'
        }
    ]
    
    return render_template('resume.html', experience=experience, education=education)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact page route - handles contact form submissions"""
    if request.method == 'POST':
        # Get form data
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')
        
        # Log form data to console (in production, you'd save to database or send email)
        print(f"\\n--- Contact Form Submission ---")
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Subject: {subject}")
        print(f"Message: {message}")
        print(f"--- End Submission ---\\n")
        
        flash("Thank you for your message! I'll get back to you soon.", "success")
    return redirect(url_for("contact"))

    
    return render_template('contact.html')

@app.errorhandler(404)
def page_not_found(error):
    """Handle 404 errors"""
    return render_template('404.html'), 404

if __name__ == '__main__':
    # Run the Flask application
    app.run(host='0.0.0.0', port=5000, debug=True)