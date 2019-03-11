# Terraform API Gateway Multiple Nested Resources

## Usage with Node.JS for main.tf creation.

 Change main.js file to include your AWS Credentials ou Key directory for Terraform.
```sh
cd path/init
npm i
node main.js --path path/subpath/api/{proxy}+ // Put as many resources as you wish.
```


# Apply with Terraform
```sh
cd ../
terraform plan
echo yes | terraform apply
```

This will create a API, and nested resources with this configuration:

|- /
|-- /path
|--- /subpath
|---- /api
|----- /{proxy}+ // Proxy integration.



# Observation
This won't create the methods or integration, just an example for nested resources creation.
This won't append to existing resources as well, but the main.js file can be changed to include this validation, and search for proper parent_id.