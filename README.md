<<<<<<< HEAD
# Developer Skill & Career Graph

Full-stack CognoDB take-home project for WEXA AI.

## Use case
Explore relationships between developers, skills, projects, companies and roles.

## Why a graph database?
The core questions are relationship-heavy: developer -> skill -> project -> skill, shared skills between developers, and career/company paths. A relational implementation would require several join tables and increasingly complex multi-join queries. Graph traversal expresses these relationships directly.

## Model
```mermaid
graph TD
 D[Developer] -->|HAS_SKILL| S[Skill]
 D -->|WORKED_ON| P[Project]
 D -->|WORKED_AT| C[Company]
 D -->|HELD_ROLE| R[Role]
 P -->|USES_SKILL| S
 P -->|AT_COMPANY| C
 D -->|KNOWS| D2[Developer]
```

## Stack
React + Vite | Django REST Framework | official Neo4j Python driver | CognoDB | React Force Graph.

## Structure
```text
backend/
  config/
  graph/
    management/commands/seed_graph.py
    services/cognodb.py
    services/queries.py
    views.py
    urls.py
frontend/
  src/
    components/
    pages/
    services/
cypher/
docs/
docker/
Dockerfile
docker-compose.yml
```

## Setup

Create a CognoDB instance and copy its Bolt URI and password to `.env`.

```env
COGNODB_URI=bolt+s://<instance-id>.databases.cognodb.cloud
COGNODB_USER=cognodb
COGNODB_PASSWORD=<password>
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=True
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

Backend:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_graph
python manage.py runserver 8000
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

Set `frontend/.env`:
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## API
`GET /api/health/`
`GET /api/developers/`
`GET /api/developers/<id>/`
`GET /api/skills/`
`GET /api/projects/`
`GET /api/search/?q=python`
`GET /api/graph/developer/<id>/`
`GET /api/recommendations/<id>/`

## Graph requirements demonstrated
- Seed script with realistic data.
- Parameterized Cypher.
- Multi-hop traversal: Developer -> Skill -> Project -> Skill.
- Graph-native recommendation: developers sharing skills.
- Relationship path query in `cypher/queries.cypher`.
- Graceful CognoDB connection errors.
- Secrets read only from environment variables.

## Deployment
See `docs/DEPLOYMENT.md`.

## Recording
See `docs/SCREEN_RECORDING_SCRIPT.md`.

Replace the demo URL and screenshots after deployment.
=======
# -cognodb-developer-skill-graph
>>>>>>> 77604d5e51ab7ca8934b5562cfbb81d414ab41bb
