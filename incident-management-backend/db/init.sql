-- Crear la tabla Users
CREATE TABLE IF NOT EXISTS "Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'warrior'
);

-- Crear la tabla Incidents
CREATE TABLE IF NOT EXISTS "Incidents" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'OPEN',
    priority VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
    assignedTo INTEGER REFERENCES "Users"(id) ON DELETE SET NULL
);

-- Insertar datos de ejemplo en la tabla Users
INSERT INTO "Users" (username, password, role) VALUES ('guerrero', 'password123', 'warrior');
INSERT INTO "Users" (username, password, role) VALUES ('admin', 'adminpassword', 'admin');

-- Insertar datos de ejemplo en la tabla Incidents
INSERT INTO "Incidents" (title, status, priority, assignedTo) VALUES ('Primera Incidencia', 'OPEN', 'HIGH', 1);
INSERT INTO "Incidents" (title, status, priority, assignedTo) VALUES ('Segunda Incidencia', 'OPEN', 'LOW', 1);
