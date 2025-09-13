-- Check if session table exists
SELECT 'Session table exists:' as check_message, 
       EXISTS (
         SELECT FROM information_schema.tables 
         WHERE table_name = 'session'
       ) as table_exists;

-- If it exists, show its structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'session';