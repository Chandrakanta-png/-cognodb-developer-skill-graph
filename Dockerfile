FROM python:3.12-slim
WORKDIR /app
COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt
COPY backend backend
CMD ["gunicorn","--chdir","backend","config.wsgi:application","--bind","0.0.0.0:8000"]
