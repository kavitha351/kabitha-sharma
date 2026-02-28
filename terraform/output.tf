output "master" {
    description = "ID of the ec2 instance master:"
    value = aws_instance.master.id
}
