-- Create a simple results table we can see
CREATE TEMPORARY TABLE IF NOT EXISTS debug_results (
    result_text TEXT
);

-- Clear any previous results
TRUNCATE TABLE debug_results;

-- Check if session table exists
INSERT INTO debug_results (result_text)
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'session') 
        THEN 'SUCCESS: Session table exists ✓' 
        ELSE 'ERROR: Session table does NOT exist ❌' 
    END;

-- Show all tables
INSERT INTO debug_results (result_text)
SELECT CONCAT('Table: ', table_name) 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Show session table structure if it exists
INSERT INTO debug_results (result_text)
SELECT CONCAT('Column: ', column_name, ' | Type: ', data_type, ' | Nullable: ', is_nullable)
FROM information_schema.columns 
WHERE table_name = 'session'
ORDER BY ordinal_position;

-- Show the results
SELECT * FROM debug_results;

-- Clean up
DROP TABLE IF EXISTS debug_results;