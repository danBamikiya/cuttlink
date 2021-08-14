# Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
function Start-Services {
    Write-Host "Starting cuttlink development services...`n" -f blue
    docker-compose up -d
    docker-compose logs -f
}

function Stop-Services {
    Write-Host "Stopping cuttlink services...`n" -f yellow
    docker-compose stop
}

function Teardown-Services {
    Write-Host "Tearing down all cuttlink services (containers, networks, volumes)...`n" -f yellow
    docker-compose down -v
}

function Stop-Service {
    param(
        [switch]$RM = $false
    )

    if (-Not $Args[0]) {
        Write-Host "Specify the service name." -f yellow
    } else {
        Write-Host "Stopping $($Args[0]) service...`n" -f yellow
        docker-compose stop $Args[0]
        if ($RM) {
            Write-Host "Removing $($Args[0]) service...`n" -f yellow
            docker-compose rm -v --force $Args[0]
        }
    }
}

function Rebuild-Service {
    if (-Not $Args[0]) {
        Write-Host "Specify the service name." -f yellow
    } else {
        Stop-Service $Args[0]
        Write-Host "Rebuilding and starting $($Args[0]) service...`n" -f blue
        docker-compose up --build -d --no-deps --renew-anon-volumes $Args[0]
        docker-compose logs -f
    }
}

function List-Services {
    Write-Host "Listing all services...`n" -f blue
    docker-compose ps -a
}

function Build-Services {
    Write-Host "Creating and starting cuttlink production services...`n" -f blue
    docker-compose build
    docker-compose up -f docker-compose.yml docker-compose.prod.yml -d
    docker-compose logs -f
}

function Pause-Services {
    if ($($Args[0]).Length -ne 0) {
        Write-Host "Pausing $($Args[0]) service...`n" -f yellow
        docker-compose pause $Args[0]
    } else {
        Write-Host "Pausing all services...`n" -f yellow
        docker-compose pause
    }
}

function Execute-Into {
    if (-Not $Args[0]) {
        Write-Host "Specify at least the container name you want to run the command on.`n" -f yellow
        Write-Host "Example:" -f yellow -NoNewline
        Write-Host " .\run.ps1 Exec-Into" -NoNewline
        Write-Host " cuttlink_server" -f cyan
    } else {
        Write-Host "Executing into the specfied container service...`n" -f yellow
        docker exec -it $Args /usr/bin/env sh
    }
}

switch ($Args[0]) {
    'LS' {
        List-Services;
        exit
    }
    'Start' {
        Start-Services;
        exit
    }
    'Stop' {
        Stop-Services;
        exit
    }
    'Teardown' {
        Teardown-Services;
        exit
    }
    'Stop-Service' {
        if ($($Args | Select-Object -Skip 1).Count -gt 2) {
            Write-Error -Message "This command requires not more than 2 arguments." -Category InvalidArgument
            Write-Host "Please set the correct number of arguments and try again." -f yellow
        } else {
            Invoke-Expression "$($Args)"
        }
        exit
    }
    'Rebuild-Service' {
        Rebuild-Service $($Args | Select-Object -Skip 1);
        exit
    }
    'Build' {
        Build-Services;
        exit
    }
    'Pause' {
        Pause-Services $($Args | Select-Object -Skip 1);
        exit
    }
    'Exec-Into' {
        Execute-Into $($Args | Select-Object -Skip 1);
        exit
    }
    Default {
        if ($Args[0]) {
            Write-Host "$($Args[0])" -f cyan -NoNewline
            Write-Host " is not a supported command." -f red
        } else {
            Write-Host "Please specify a command." -f red
        }
        exit 1
    }
}