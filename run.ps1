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

function Stop-Container {
    param(
        [switch]$RM = $false
    )

    if (-Not $Args[0]) {
        Write-Host "Specify the container name." -f yellow
    } else {
        Write-Host "Stopping $($Args[0]) service...`n" -f yellow
        docker container stop $Args[0]
        if ($RM) {
            Write-Host "Removing $($Args[0]) service...`n" -f yellow
            docker container rm $Args[0]
        }
    }
}

function Rebuild-Image {
    if (-Not $Args[0]) {
        Write-Host "Specify the container name." -f yellow
    } else {
        Write-Host "Rebuilding $($Args[0]) service...`n" -f blue
        docker-compose up --build $Args[0] -d --no-deps
        docker-compose logs -f
    }
}

function List-Services {
    Write-Host "Listing all services...`n" -f blue
    docker-compose ps -a
}

function Build-Services {
    Write-Host "Creating cuttlink production services...`n" -f blue
    docker-compose build
    docker-compose up -f docker-compose.yml docker-compose.prod.yml -d
    docker-compose logs -f
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
    'Stop-Container' {
        Invoke-Expression "$($Args)"
        exit
    }
    'Rebuild-Image' {
        Rebuild-Image $($Args | Select-Object -Skip 1);
        exit
    }
    'Build' {
        Build-Services;
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