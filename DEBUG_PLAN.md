# Database Data Not Showing on UI - Debug Plan

## Objective
Investigate and fix why database has data but UI is not displaying it.

## Steps to Debug

- [ ] 1. Examine the current view page (app/view/page.js) - How data is being fetched and displayed
- [ ] 2. Check API routes for data retrieval (app/api/content/route.js)
- [ ] 3. Verify database connection and configuration (lib/supabase.js)
- [ ] 4. Test database queries directly (scripts/inspect-db.js)
- [ ] 5. Check for console errors or network issues
- [ ] 6. Verify data flow from database to UI components
- [ ] 7. Fix identified issues and test the fix

## Files to Examine
- app/view/page.js (main view component)
- app/api/content/route.js (API endpoint for fetching content)
- lib/supabase.js (database configuration)
- scripts/inspect-db.js (database inspection script)
