<h3 id="header"> 🌱 Prerequisites </h3>

- [Docker with Docker Compose](https://docs.docker.com/get-docker/)

Has been tested on Windows 10 and Linux (Ubuntu 20.04.2 LTS).

You can either work with this project either in Windows, Linux or MacOS. I'll differentiate each environment's working commands in the README with a table like this one:

| Action          | Windows               | Linux/MacOS               |
| :-------------- | :-------------------- | :------------------------ |
| _action to run_ | _command for windows_ | _command for linux/macOS_ |

## 🏁 Getting started

#### Clone the app

```
git clone https://github.com/danBamikiya/cuttlink.git
```

#### Navigate to the cloned directory

```
cd cuttlink
```

#### Commands

All commands are run from the root of the project, from a terminal:

🛎️ **IMPORTANT**: For Windows users, make sure to run the following command in your terminal before running any of the windows commands:

```ps1
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

> The command above will [enable](https:/go.microsoft.com/fwlink/?LinkID=135170) the PowerShell script to run in your **current** PowerShell terminal without your terminal throwing a security error.

For Linux/MacOS users, you might need to enable the Shell script run like so:

```sh
chmod +x ./run.sh
```

| Action                                                                                                                 | Windows                                                                                       | Linux/MacOS                                                                                  |
| :--------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Build and start all cuttlink development services                                                                      | `.\run.ps1 Start`                                                                             | `./run.sh start`                                                                             |
| List all cuttlink services                                                                                             | `.\run.ps1 LS`                                                                                | `./run.sh ls`                                                                                |
| Stop all cuttlink services without removing them                                                                       | `.\run.ps1 Stop`                                                                              | `./run.sh stop`                                                                              |
| Stop a cuttlink service without removing it                                                                            | `.\run.ps1 Stop-Service *name_of_service*`                                                    | `./run.sh stop_service *name_of_service*`                                                    |
| Stop a cuttlink service and remove it                                                                                  | `.\run.ps1 Stop-Service *name_of_service* -RM`                                                | `./run.sh stop_service *name_of_service* RM=true`                                            |
| Pause all cuttlink services                                                                                            | `.\run.ps1 Pause`                                                                             | `./run.sh pause`                                                                             |
| Pause a cuttlink service                                                                                               | `.\run.ps1 Pause *name_of_service*`                                                           | `./run.sh pause *name_of_service*`                                                           |
| Teardown(stop & remove containers, networks & volumes) all cuttlink services without removing the built images         | `.\run.ps1 Teardown`                                                                          | `./run.sh teardown`                                                                          |
| Teardown(stop & remove containers, networks, volumes & built images) all cuttlink services and remove the built images | `.\run.ps1 Teardown -RMI`                                                                     | `./run.sh teardown RMI=true`                                                                 |
| Rebuild and restart a cuttlink service                                                                                 | `.\run.ps1 Rebuild-Service *name_of_service*`                                                 | `./run.sh rebuild_service *name_of_service*`                                                 |
| Build and start all cuttlink production services                                                                       | `.\run.ps1 Build`                                                                             | `./run.sh build`                                                                             |
| Execute into a cuttlink service(container)                                                                             | `.\run.ps1 Exec-Into *container_name_of_the_service* *other options you may want to provide*` | `./run.sh exec_into *container_name_of_the_service* *other options you may want to provide*` |

### 📑 NOTE:

> When executing into a service, you provide the [container name of the service](./docker-compose.yml) not the service's name.

> Also the execute command is executed as:
> | Windows | Linux/MacOS |
> | :-------------------------------------- | :----------------------------------- |
> | `docker exec -it $Args /usr/bin/env sh` | `docker exec -it "$@" /usr/bin/env sh` |
>
> So you don't need to provide the shell to run the command in. Just the [container name of the service](./docker-compose.yml) and any other [options](https://docs.docker.com/compose/reference/exec/) you need.

> - Add Sentry DSN
>
> I recommend setting this up when running the project locally, as I use Sentry for error tracking in the NodeJS server logger.

> - [Sign up](https://sentry.io/signup?plan=am1_f&referrer=pricing) to create a Senry account (free)
> - Create a new Sentry project
> - [Follow these steps](https://docs.sentry.io/product/sentry-basics/dsn-explainer/#where-to-find-your-dsn) to get a DSN for your project
> - In local repo, add the DSN by either:
> - a. exporting it as an environment variable in your terminal
> - b. adding it to [default.json](./server/src/config/default.json)

<div align="right">
    <b><a href="#header">↥ Back To Top</a></b>
</div>
