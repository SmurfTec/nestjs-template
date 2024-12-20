CREATE DATABASE orion;
REVOKE ALL ON DATABASE orion FROM PUBLIC;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;

CREATE ROLE orion_app WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOREPLICATION CONNECTION LIMIT -1 ENCRYPTED PASSWORD 'admin';
grant all privileges on database orion to orion_app;
GRANT CREATE,USAGE ON SCHEMA public TO orion_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON ALL TABLES TO orion_app;
ALTER DEFAULT PRIVILEGES FOR ROLE orion_app IN SCHEMA public GRANT ALL ON TABLES TO orion_app;

-- GRANT CONNECT ON DATABASE orion TO orion_app;
-- GRANT USAGE ON SCHEMA public TO orion_app;
-- GRANT ALL ON TABLES IN SCHEMA public TO orion_app;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO orion_app;
-- GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE, ALTER, TRUNCATE, REFERENCES, EXECUTE, TEMPORARY ON ALL TABLES IN SCHEMA public TO orion_app;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE, ALTER, TRUNCATE, REFERENCES, EXECUTE, TEMPORARY ON TABLES TO orion_app;
