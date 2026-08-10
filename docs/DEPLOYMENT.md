# Deployment

Use any free Docker-capable host.

1. Create CognoDB and save credentials as hosting secrets.
2. Build backend with `Dockerfile`.
3. Build frontend with `npm run build`.
4. Serve frontend through Nginx and proxy `/api/` to Django.
5. Set HTTPS, allowed hosts and CORS to the deployed domain.
6. Run the seed command once.
7. Keep CognoDB running during review.

See `docker-compose.yml` and `docker/nginx.conf`.
