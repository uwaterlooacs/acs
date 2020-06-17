# ACS

## Manual Deployment

This app is hosted on AWS through the uw acs gmail account.
Follow the steps below to manually deploy the app:

1. Download the `acs-website.pem` from the ACS Google Drive at `/Website/Keys`.

2. SSH into the ec2 instance. With the downloaded key in the working directory, on mac or linux you can run `ssh -i "acs-website.pem" ec2-user@uwacs.club`.

3. Run `deploy.sh` in the scripts folder: `./scripts/deploy.sh`.

This will deploy the latest remote changes for the current branch.
If the current branch is not `master`, the script will display a warning and proceed with the deployment after 3 seconds.
