terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">=1.2.0"
}
provider "aws" {
 region     = "us-east-1"
# access_key = ${ACCESS_ID}
 # secret_key = ${SECRET_ID}
  #terrafomr lady
}
