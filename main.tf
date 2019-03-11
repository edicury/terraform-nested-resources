
provider "aws" {
  access_key = ""
  secret_key = ""
  region     = ""
}
      
// Creates API
resource "aws_api_gateway_rest_api" "api" {
  name        = "test-api"
  description = "API Gateway created with Terraform"
}
      
      
// Creates root resource
resource "aws_api_gateway_resource" "root-resource" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  path_part   = "path"
  parent_id = "${aws_api_gateway_rest_api.api.root_resource_id}"
}


resource "aws_api_gateway_resource" "resource-subpath" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  path_part   = "subpath"
  parent_id = "${aws_api_gateway_resource.root-resource.id}"
}


resource "aws_api_gateway_resource" "resource-api" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  path_part   = "api"
  parent_id = "${aws_api_gateway_resource.resource-subpath.id}"
}


resource "aws_api_gateway_resource" "resource-proxy_proxied" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  path_part   = "{proxy+}"
  parent_id = "${aws_api_gateway_resource.resource-api.id}"
}
