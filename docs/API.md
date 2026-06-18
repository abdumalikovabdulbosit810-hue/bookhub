# REST API Documentation

Base URL:

```text
/api/v1
```

## Authentication

```http
POST /auth/login
POST /auth/logout
GET /auth/session
```

Production requirements:

- Use HTTPS only.
- Store session in HTTP-only, Secure, SameSite=Lax cookie.
- Require CSRF token for all mutating requests.

## Books

```http
GET /books?search=&category=&rating=&maxPrice=&sort=&page=&pageSize=
GET /books/:id
POST /books
PATCH /books/:id
DELETE /books/:id
```

Validation:

- `title`: required, 2-180 characters
- `price`: integer, positive
- `discountPrice`: integer, positive, less than or equal to price
- `stock`: integer, min 0
- `rating`: number, 0-5

## Orders

```http
GET /orders?page=&pageSize=&status=
GET /orders/:id
POST /orders
PATCH /orders/:id/status
```

## Users, Roles, Permissions

```http
GET /users
PATCH /users/:id
GET /roles
POST /roles
PATCH /roles/:id
GET /permissions
```

## Activity Logs

```http
GET /activity-logs?page=&pageSize=&actorId=&action=
```

Every privileged admin mutation should write an activity log row with actor, action, resource, metadata, IP hash, and timestamp.

## Error Shape

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request payload",
    "details": {}
  }
}
```
