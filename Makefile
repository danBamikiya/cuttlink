# Since we rely on paths relative to the makefile location, abort if make isn't being run from there.
$(if $(findstring /,$(MAKEFILE_LIST)),$(error Please only invoke this makefile from the directory it resides in))

LOGFILE=$(shell date +'%y-%m-%d-%H:%M:%S')
DIR?=
IMAGE?=
ENV?=

check-dir:
ifndef DIR
	$(error Please set the running directory)
endif

check-env:
ifndef ENV
	$(error Please set ENV=[staging|prod])
endif

.PHONY: scan-image
scan-image: check-dir
	cd $(DIR) && \
		docker scan -f Dockerfile --exclude-base $(IMAGE)

.PHONY: build
build:
	docker-compose -f docker-compose.yml docker-compose.prod.yml build --force-rm

.PHONY: rm-build
rebuild-image:
	docker-compose -f docker-compose.yml docker-compose.prod.yml rm -f -v

.PHONY: terraform-create-workspace
terraform-create-workspace: check-dir check-env
	cd $(DIR)/terraform && \
		terraform workspace new $(ENV)

.PHONY: terraform-init
terraform-init: check-dir check-env
	cd $(DIR)/terraform && \
		terraform workspace select $(ENV) && \
		terraform init

.PHONY: terraform-init-migrate-state
terraform-init-migrate-state: check-dir check-env
	cd $(DIR)/terraform && \
		terraform workspace select $(ENV) && \
		terraform init -migrate-state -force-copy

.PHONY: terraform-format
terraform-format: check-dir check-env
	@cd $(DIR)/terraform && \
		terraform workspace select $(ENV) && \
		terraform fmt -check \
		-var-file="./environments/common.tfvars"

.PHONY: terraform-plan
terraform-plan: check-dir check-env
	@cd $(DIR)/terraform && \
		terraform workspace select $(ENV) && \
		terraform plan -input=false \
		-var-file="./environments/common.tfvars"

.PHONY: terraform-plan-save
terraform-plan-save: check-dir check-env
	@cd $(DIR)/terraform && \
		terraform workspace select $(ENV) && \
		terraform plan -out=.tfplan/$(LOGFILE) -input=false \
		-var-file="./environments/common.tfvars"

.PHONY: terraform-apply
terraform-apply: check-dir check-env
	@cd $(DIR)/terraform && \
		terraform workspace select $(ENV) && \
		terraform apply -auto-approve -input=false \
		-var-file="./environments/common.tfvars"