resource "aws_instance" "master"{
  ami=var.image_id["ubuntu"]
  instance_type = var.instance_type["medium"]
  key_name = var.key_name
  subnet_id = var.subnet_id
  vpc_security_group_ids = [var.security_gps]
  tags = {
    Name = "master"
    # installing jenkins and java
  }
}
