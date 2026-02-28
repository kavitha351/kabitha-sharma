variable "image_id" {
    type = map(string)
    description = "Map of AMI ids for different situations."
    default = {
        "ubuntu"= "ami-04b4f1a9cf54c11d0",
        "amazon-linux" = "ami-05ffe3c48a9991133"
    } 
}
variable "instance_type" {
    type = map(string)
    description = "Map of instance type for master and slaves."
    default = {
        "master" = "t2.small",
        "slaves" = "t2.micro",
        "medium" = "t2.medium"
    }
}
variable "key_name" {
    type = string
    description = "this is the key name"
    default = "Sep2429"
    sensitive = true
}
variable "subnet_id" {
    type = string
    description = "This is the subnet id"
    default = "subnet-023d9f2cbb637dcbe"
}
variable "security_gps" {
    type = string
    description = "This is the security group id"
    default = "sg-02427b6f2cc5b8412"
}
