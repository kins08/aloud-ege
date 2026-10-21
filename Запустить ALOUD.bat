@echo off
chcp 65001 >nul
cd /d "%~dp0"
title ALOUD

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Для запуска нужен Node.js.
  echo Установите LTS-версию с https://nodejs.org и запустите файл снова.
  echo.
  pause
  exit /b 1
)

node server.js
if errorlevel 1 pause
