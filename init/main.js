const argv = require('yargs').argv
const fs = require('fs');
const pathResolver = require('path');



function main(path) {
    const [root] = path.split('/');
    const otherPaths = path.replace(`${root}/`, "");

    let resources = `
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
  rest_api_id = "\${aws_api_gateway_rest_api.api.id}"
  path_part   = "${root}"
  parent_id = "\${aws_api_gateway_rest_api.api.root_resource_id}"
}
`;
    const paths = otherPaths.split('/');
    paths.forEach((path, index) => {
        let namedPath = path;
        if(path.match(/\+/)) {
            namedPath = namedPath.replace('+', "_proxied").replace('{', "").replace('}', "")
        }
        resources += `

resource "aws_api_gateway_resource" "resource-${namedPath}" {
  rest_api_id = "\${aws_api_gateway_rest_api.api.id}"
  path_part   = "${path}"
  parent_id = "\${${index === 0 ? "aws_api_gateway_resource.root-resource.id" : `aws_api_gateway_resource.resource-${paths[index - 1]}.id`}}"
}
`
    })
    fs.writeFileSync(pathResolver.resolve(__dirname, '../main.tf'), resources);
    console.log('Done.');
}




main(argv.path);