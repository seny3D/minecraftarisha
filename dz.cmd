@echo off
setlocal Enabledelayedexpansion

if "%~1"=="" (
    for %%A in ("%path:;=" "%") do echo %%~A
    exit /b
)

for %%A in (%*) do (
    set "FOUND="
    
    if not "%%~$path:A"=="" (
        echo %%~$path:A
        set FOUND=1
    )
    
    for %%E in (%pathext%) do (
        for %%F in ("%%~A%%E") do (
            if not "%%~$path:F"=="" (
                echo %%~$path:F
                set FOUND=1
            )
        )
    )
    
    if not defined FOUND echo %%~A :(
)

endlocal

