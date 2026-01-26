-- 1. Create necessary extensions (must run as superuser)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. Ensure application user ('swift_seller_user') has necessary rights on public schema
GRANT USAGE ON SCHEMA public TO swift_seller_user;
GRANT CREATE ON SCHEMA public TO swift_seller_user;

-- 3. Grant default rights for future objects created by 'swift_seller_user'
ALTER DEFAULT PRIVILEGES FOR USER swift_seller_user IN SCHEMA public GRANT ALL ON TABLES TO swift_seller_user;
ALTER DEFAULT PRIVILEGES FOR USER swift_seller_user IN SCHEMA public GRANT ALL ON SEQUENCES TO swift_seller_user;

-- 4. Grant all current object rights (for a clean environment reset, if applicable)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO swift_seller_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO swift_seller_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO swift_seller_user;