terraform {
    backend "gcs" {
        bucket          = "cuttlink-terraform"
        prefix          = "/state/server"
    }
}