Write-Host "---- Film QZ ----";
Write-Host ""
Write-Host "Setting up development environment";

$currentLocation = Get-Location
Set-Location -Path ../src/FilmQZ/FilmQZ.App
$appLocation = Get-Location

$instanceName = "FilmQZ";
$databaseName = "FilmQZ";

SqlLocalDB.exe create $instanceName -s

Write-Host "Setting up development database"
$SqlConnection = New-Object System.Data.SqlClient.SqlConnection
$SqlConnection.ConnectionString = "Server = (LocalDb)\$instanceName; Integrated Security = True;"

$SqlCmd = New-Object System.Data.SqlClient.SqlCommand
$SqlCmd.CommandText = "IF db_id('FilmQZ') IS NULL 
BEGIN
CREATE DATABASE
[" + $databaseName + "]
ON PRIMARY (
NAME='" + $databaseName + "_Data',
FILENAME = '$appLocation\App_Data\" + $databaseName + "_Data.mdf'
)
LOG ON (
NAME='" + $databaseName + "_Log',
FILENAME = '$appLocation\App_Data\" + $databaseName + "_Log.ldf'
)
END";

$SqlCmd.Connection = $SqlConnection

$SqlConnection.Open();

$SqlCmd.ExecuteNonQuery();

$SqlConnection.Close();

Write-Host "Done setting up database"
Write-Host "Connection string is:"
Write-Host "Server = (LocalDb)\FilmQZ; initial catalog=FilmQZ; Integrated Security = True;MultipleActiveResultSets=True;App=FilmQZ" -ForegroundColor DarkCyan
Write-Host ""
Write-Host ""
Write-Host "Setting up node environment"

npm install
npm run build:dev
Set-Location $currentLocation

Write-Host "Install complete..."