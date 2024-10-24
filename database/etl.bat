@echo off
setlocal enabledelayedexpansion

rem Prompt the user for the loop value
set /p loopValue=Enter the loop value: 

rem Open the input file
for /f "usebackq delims=" %%a in ("etl.txt") do (
  set line=%%a
)

rem Loop and print the line of text
for /l %%i in (1,1,%loopValue%) do (
  call !line!
)

pause