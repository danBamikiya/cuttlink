#!/usr/bin/env sh

RED="\033[0;31m"
CYAN="\033[0;36m"
BBLUE="\033[1;34m"
BYELLOW="\033[1;33m"
NC="\033[0m" #NO COLOR

start_services() {
    printf "${BBLUE}Starting cuttlink development services...${NC}\n\n"
    docker-compose up -d
    docker-compose logs -f
}

stop_services() {
    printf "${BYELLOW}Stopping cuttlink services...${NC}\n\n"
    docker-compose stop
}

teardown_services() {
    printf "${BYELLOW}Tearing down all cuttlink services (containers, networks, volumes)...${NC}\n\n"
    docker-compose down -v
}

stop_container() {
    if [[ -z "$1" ]]; then
        printf "${BYELLOW}Specify the container name.${NC}"
    else
        printf "${BYELLOW}Stopping $1 service...${NC}\n\n"
        docker container stop $1
        if [[ ! -z "$2" ]] && [[ "$(echo $2 | sed 's/RM=//')" == "true" ]]; then
            printf "${BYELLOW}Removing $1 service...${NC}\n\n"
            docker container rm $1
        fi
    fi
}

rebuild_image() {
    if [[ -z "$1" ]]; then
        printf "${BYELLOW}Specify the container name.${NC}"
    else
        printf "${BBLUE}Rebuilding $1 service...${NC}\n\n"
        docker-compose up --build $1 -d --no-deps
        docker-compose logs -f
    fi
}

list_services() {
    printf "${BBLUE}Listing all services...${NC}\n\n"
    docker-compose ps -a
}

build_services() {
    printf "${BBLUE}Creating cuttlink production services...${NC}\n\n"
    docker-compose build
    docker-compose up -f docker-compose.yml docker-compose.prod.yml -d
    docker-compose logs -f
}

case $1 in
ls)
    list_services
    exit
    ;;
start)
    start_services
    exit
    ;;
stop)
    stop_services
    exit
    ;;
teardown)
    teardown_services
    exit
    ;;
stop_container)
    "$@"
    exit
    ;;
rebuild_image)
    "$@"
    exit
    ;;
build)
    build_services
    exit
    ;;
*)
    if [[ ! -z "$1" ]]; then
        echo -e "${CYAN}$1${NC} ${RED}is not a supported command.${NC}"
    else
        echo -e "${RED}Please specify a command.${NC}"
    fi
    exit 1
    ;;
esac