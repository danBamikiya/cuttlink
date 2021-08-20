CREATE SCHEMA IF NOT EXISTS urls;
CREATE TABLE IF NOT EXISTS urls.guest (
    ShortURL CHAR(7) PRIMARY KEY,
    OriginalURL VARCHAR(500) NOT NULL,
    CreationDate TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);