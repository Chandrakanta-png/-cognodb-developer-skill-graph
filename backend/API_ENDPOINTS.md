# SkillGraph API Documentation

## Base URL
```
http://localhost:8000/api/
```

## Health Check

### Get Health Status
```
GET /health/
```

**Response:**
```json
{
  "status": "ok",
  "cognodb": true,
  "message": null
}
```

---

## Developers

### List All Developers
```
GET /developers/
```

**Response:**
```json
[
  {
    "id": "dev-001",
    "name": "John Doe",
    "email": "john@example.com",
    "location": "San Francisco",
    "experience": 5,
    "title": "Senior Developer",
    "bio": "Full stack developer"
  }
]
```

### Get Developer Detail
```
GET /developers/<developer_id>/
```

**Response:**
```json
{
  "id": "dev-001",
  "name": "John Doe",
  "email": "john@example.com",
  "location": "San Francisco",
  "experience": 5,
  "title": "Senior Developer",
  "bio": "Full stack developer",
  "skills": [
    {"id": "skill-001", "name": "Python"},
    {"id": "skill-002", "name": "React"}
  ],
  "projects": [
    {"id": "proj-001", "name": "Project A"}
  ]
}
```

### Create Developer
```
POST /developers/create/
Content-Type: application/json

{
  "id": "dev-new-001",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "title": "Full Stack Developer",
  "location": "New York",
  "experience": 3,
  "bio": "Experienced in modern web technologies"
}
```

**Response (201 Created):**
```json
{
  "id": "dev-new-001",
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

### Update Developer
```
PUT /developers/<developer_id>/update/
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "email": "jane.new@example.com",
  "title": "Senior Full Stack Developer",
  "location": "Boston",
  "experience": 4,
  "bio": "Updated bio"
}
```

**Response:**
```json
{
  "id": "dev-001",
  "name": "Jane Smith Updated"
}
```

### Delete Developer
```
DELETE /developers/<developer_id>/delete/
```

**Response (204 No Content):**
```json
{
  "status": "deleted"
}
```

### Add Skill to Developer
```
POST /developers/<developer_id>/skills/add/
Content-Type: application/json

{
  "skill_id": "skill-001"
}
```

**Response (201 Created):**
```json
{
  "developer_id": "dev-001",
  "skill_id": "skill-001"
}
```

### Remove Skill from Developer
```
DELETE /developers/<developer_id>/skills/<skill_id>/remove/
```

**Response (204 No Content):**
```json
{
  "status": "deleted"
}
```

### Add Project to Developer
```
POST /developers/<developer_id>/projects/add/
Content-Type: application/json

{
  "project_id": "proj-001"
}
```

**Response (201 Created):**
```json
{
  "developer_id": "dev-001",
  "project_id": "proj-001"
}
```

### Remove Project from Developer
```
DELETE /developers/<developer_id>/projects/<project_id>/remove/
```

**Response (204 No Content):**
```json
{
  "status": "deleted"
}
```

---

## Skills

### List All Skills
```
GET /skills/
```

**Response:**
```json
[
  {
    "id": "skill-001",
    "name": "Python",
    "developer_count": 5
  },
  {
    "id": "skill-002",
    "name": "React",
    "developer_count": 8
  }
]
```

### Get Skill Detail
```
GET /skills/<skill_id>/
```

**Response:**
```json
{
  "id": "skill-001",
  "name": "Python",
  "developers": [
    {"id": "dev-001", "name": "John Doe"},
    {"id": "dev-002", "name": "Jane Smith"}
  ],
  "projects": [
    {"id": "proj-001", "name": "Project A"}
  ]
}
```

### Create Skill
```
POST /skills/create/
Content-Type: application/json

{
  "id": "skill-new-001",
  "name": "TypeScript"
}
```

**Response (201 Created):**
```json
{
  "id": "skill-new-001",
  "name": "TypeScript"
}
```

### Update Skill
```
PUT /skills/<skill_id>/update/
Content-Type: application/json

{
  "name": "Python 3.10+"
}
```

**Response:**
```json
{
  "id": "skill-001",
  "name": "Python 3.10+"
}
```

### Delete Skill
```
DELETE /skills/<skill_id>/delete/
```

**Response (204 No Content):**
```json
{
  "status": "deleted"
}
```

---

## Projects

### List All Projects
```
GET /projects/
```

**Response:**
```json
[
  {
    "id": "proj-001",
    "name": "CognoDB",
    "description": "Graph database project",
    "technology": "Neo4j, Django",
    "developer_count": 3
  }
]
```

### Get Project Detail
```
GET /projects/<project_id>/
```

**Response:**
```json
{
  "id": "proj-001",
  "name": "CognoDB",
  "description": "Graph database project",
  "technology": "Neo4j, Django",
  "developers": [
    {"id": "dev-001", "name": "John Doe"},
    {"id": "dev-002", "name": "Jane Smith"}
  ],
  "skills": [
    {"id": "skill-001", "name": "Python"},
    {"id": "skill-002", "name": "React"}
  ]
}
```

### Create Project
```
POST /projects/create/
Content-Type: application/json

{
  "id": "proj-new-001",
  "name": "New Project",
  "description": "Amazing new project",
  "technology": "React, Node.js, MongoDB"
}
```

**Response (201 Created):**
```json
{
  "id": "proj-new-001",
  "name": "New Project"
}
```

### Update Project
```
PUT /projects/<project_id>/update/
Content-Type: application/json

{
  "name": "Updated Project Name",
  "description": "Updated description",
  "technology": "React, Django, PostgreSQL"
}
```

**Response:**
```json
{
  "id": "proj-001",
  "name": "Updated Project Name"
}
```

### Delete Project
```
DELETE /projects/<project_id>/delete/
```

**Response (204 No Content):**
```json
{
  "status": "deleted"
}
```

### Add Skill to Project
```
POST /projects/<project_id>/skills/add/
Content-Type: application/json

{
  "skill_id": "skill-001"
}
```

**Response (201 Created):**
```json
{
  "project_id": "proj-001",
  "skill_id": "skill-001"
}
```

### Remove Skill from Project
```
DELETE /projects/<project_id>/skills/<skill_id>/remove/
```

**Response (204 No Content):**
```json
{
  "status": "deleted"
}
```

---

## Search

### Search Developers, Skills, and Projects
```
GET /search/?q=python
```

**Response:**
```json
[
  {
    "type": "developer",
    "id": "dev-001",
    "name": "John Doe"
  },
  {
    "type": "skill",
    "id": "skill-001",
    "name": "Python"
  },
  {
    "type": "project",
    "id": "proj-001",
    "name": "Python Project"
  }
]
```

**Query Parameters:**
- `q` (required): Search query string

---

## Graph and Recommendations

### Get Developer Graph
```
GET /graph/developer/<developer_id>/
```

**Response:**
```json
{
  "nodes": [
    {"id": "dev-001", "label": "John Doe", "type": "developer"},
    {"id": "skill-001", "label": "Python", "type": "skill"},
    {"id": "proj-001", "label": "Project A", "type": "project"}
  ],
  "links": [
    {"source": "dev-001", "target": "skill-001", "relationship": "HAS_SKILL"},
    {"source": "dev-001", "target": "proj-001", "relationship": "WORKED_ON"}
  ]
}
```

### Get Developer Recommendations
```
GET /recommendations/<developer_id>/
```

**Response:**
```json
[
  {
    "id": "dev-002",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "title": "Full Stack Developer",
    "location": "New York",
    "shared_skills": ["Python", "React", "Django"],
    "score": 3
  }
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields: ['id', 'name', 'email']"
}
```

### 404 Not Found
```json
{
  "error": "Developer not found"
}
```

### 503 Service Unavailable
```json
{
  "error": "Could not connect to database"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Example Usage with cURL

### Create a Developer
```bash
curl -X POST http://localhost:8000/api/developers/create/ \
  -H "Content-Type: application/json" \
  -d '{
    "id": "dev-003",
    "name": "Alex Johnson",
    "email": "alex@example.com",
    "title": "DevOps Engineer",
    "location": "London",
    "experience": 4,
    "bio": "Kubernetes and Docker expert"
  }'
```

### Add a Skill to Developer
```bash
curl -X POST http://localhost:8000/api/developers/dev-001/skills/add/ \
  -H "Content-Type: application/json" \
  -d '{"skill_id": "skill-005"}'
```

### Search
```bash
curl -X GET "http://localhost:8000/api/search/?q=python"
```

### Update Developer
```bash
curl -X PUT http://localhost:8000/api/developers/dev-001/update/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "email": "john.new@example.com",
    "title": "Lead Developer",
    "location": "San Jose",
    "experience": 6,
    "bio": "Now a lead developer"
  }'
```

---

## Status Codes

- `200 OK`: Successful GET, PUT request
- `201 Created`: Successful POST request
- `204 No Content`: Successful DELETE request
- `400 Bad Request`: Invalid request or missing fields
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Database connection error

---

## Features

✅ **Complete CRUD Operations**
- Create, Read, Update, Delete developers, skills, projects

✅ **Relationship Management**
- Add/remove skills from developers
- Add/remove projects from developers
- Add/remove skills from projects

✅ **Search Functionality**
- Full-text search across developers, skills, and projects

✅ **Graph Visualization Support**
- Get graph nodes and edges for visualization

✅ **Developer Recommendations**
- Find developers with similar skills

✅ **Error Handling**
- Comprehensive error messages and status codes

---

## Notes

- All IDs should be unique strings
- Experience should be an integer (years)
- Use proper HTTP methods: GET for retrieval, POST for creation, PUT for updates, DELETE for removal
- All requests should include `Content-Type: application/json` header
- Response times depend on database performance
