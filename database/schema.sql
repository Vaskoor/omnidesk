
CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, name TEXT, role TEXT DEFAULT 'agent', created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT, email TEXT, phone TEXT, company TEXT, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE tickets (id SERIAL PRIMARY KEY, customer_id INT REFERENCES customers(id), assigned_agent_id INT REFERENCES users(id), subject TEXT NOT NULL, description TEXT, priority TEXT DEFAULT 'medium', status TEXT DEFAULT 'open', category TEXT, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW());
CREATE TABLE ticket_messages (id SERIAL PRIMARY KEY, ticket_id INT REFERENCES tickets(id) ON DELETE CASCADE, sender_type TEXT CHECK (sender_type IN ('agent','customer','system')), content TEXT NOT NULL, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE sla_policies (id SERIAL PRIMARY KEY, name TEXT, priority TEXT, response_time_hours INT, resolution_time_hours INT, created_at TIMESTAMP DEFAULT NOW());
CREATE INDEX idx_tickets_customer ON tickets(customer_id);
CREATE INDEX idx_tickets_agent ON tickets(assigned_agent_id);
CREATE INDEX idx_messages_ticket ON ticket_messages(ticket_id);
