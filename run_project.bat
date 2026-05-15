@echo off
echo Starting AI Voice Assistant...

cd server
start cmd /k "npm install && npm start"

cd ../client
start cmd /k "npm install && npm run dev"

echo.
echo ==========================================
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:5173
echo ==========================================
echo.
pause
