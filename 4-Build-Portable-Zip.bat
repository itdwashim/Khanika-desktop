@echo off
echo Building a portable ZIP (no installer)...
call npm run dist:zip
echo.
echo If it worked, the ZIP is in the dist folder.
pause
