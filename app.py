from flask import Flask, render_template, jsonify, request, redirect, url_for, session
import os

import requests

app = Flask(__name__)
app.secret_key = 'replace-with-a-better-secret'


@app.route('/')
def home():
    # Simple session check so only logged-in users can see the dashboard
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('index.html', username=session.get('user'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()

        # Very simple demo credentials; adjust as needed
        if username == 'admin' and password == 'password':
            session['user'] = username
            return redirect(url_for('home'))
        else:
            error = 'Invalid username or password. Try admin / password.'

    # If already logged in, skip the login page
    if 'user' in session:
        return redirect(url_for('home'))

    return render_template('login.html', error=error)


@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))


@app.route('/api/data')
def get_data():
    return jsonify({
        'status': 'success',
        'message': 'Emergency Response System is running'
    })


@app.route('/api/chat', methods=['POST'])
def chat():
    """Proxy chat endpoint that talks to a local Ollama server.

    Expects JSON: {"message": "..."}
    Returns JSON: {"reply": "..."} or {"error": "..."}
    """

    # Optional: require login for using the assistant
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 401

    payload = request.get_json(silent=True) or {}
    message = (payload.get('message') or '').strip()

    if not message:
        return jsonify({'error': 'Message is required'}), 400

    ollama_url = os.environ.get('OLLAMA_URL', 'http://localhost:11434')
    ollama_model = os.environ.get('OLLAMA_MODEL', 'llama3.1')

    try:
        response = requests.post(
            f"{ollama_url.rstrip('/')}/api/chat",
            json={
                'model': ollama_model,
                'messages': [
                    {'role': 'user', 'content': message}
                ],
                'stream': False,
            },
            timeout=60,
        )
        response.raise_for_status()
        data = response.json() or {}

        reply = ''
        msg = data.get('message') or {}
        reply = msg.get('content') or ''

        if not reply:
            reply = 'The model returned an empty response.'

        return jsonify({'reply': reply})

    except requests.exceptions.RequestException as exc:
        # Network / connection issue talking to Ollama
        return jsonify({
            'error': 'Failed to reach Ollama server. Is it running on this machine?',
            'details': str(exc),
        }), 502
    except Exception as exc:  # noqa: B902
        return jsonify({
            'error': 'Unexpected error while generating response.',
            'details': str(exc),
        }), 500


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
