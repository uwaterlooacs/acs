yarn build
scp -i "../keys/acs-website.pem" -r ./packages/server/dist ec2-user@ec2-18-220-45-225.us-east-2.compute.amazonaws.com:~/acs/packages/server 
scp -i "../keys/acs-website.pem" -r ./packages/client/build ec2-user@ec2-18-220-45-225.us-east-2.compute.amazonaws.com:~/acs/packages/client 
