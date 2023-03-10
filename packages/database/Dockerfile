FROM postgres:15.2-alpine

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password


# Copy the SQL script that creates the schema to the container
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432