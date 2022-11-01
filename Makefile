terraform_version = 1.3.3

# https://www.terraform.io/downloads
install-terraform:
	wget https://releases.hashicorp.com/terraform/${terraform_version}/terraform_${terraform_version}_linux_amd64.zip
	unzip terraform_${terraform_version}_linux_amd64.zip
	mkdir -p ~/bin
	mv terraform ~/bin
	rm terraform_${terraform_version}_linux_amd64.zip

cdktf-deploy:
	cdktf deploy --auto-approve