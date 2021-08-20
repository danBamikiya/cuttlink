CREATE SCHEMA IF NOT EXISTS urls;
CREATE TABLE IF NOT EXISTS urls.guest (
    ShortURL CHAR(7) PRIMARY KEY,
    OriginalURL VARCHAR(500) NOT NULL,
    CreationDate TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON SCHEMA urls IS 'Data related to urls.';
COMMENT ON TABLE urls.guest IS 'Table for urls related to guest users.';
COMMENT ON COLUMN urls.guest.ShortURL IS 'The short url a guest user gets.';
COMMENT ON COLUMN urls.guest.OriginalURL IS 'The long url a guest user wants to shortens.';
COMMENT ON COLUMN urls.guest.CreationDate IS 'The date and time with a timezone a guest user shortened the long url.';