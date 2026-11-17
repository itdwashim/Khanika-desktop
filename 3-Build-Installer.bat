@echo off
echo Building the Setup installer (takes a few minutes)...
call npm run dist
echo.
echo If it worked, the installer is in the dist folder.
pause
