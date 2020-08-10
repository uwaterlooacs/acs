# ACS

## Environmental Variables

The server portion of the application needs access to an `APP_SECRET` environmental variable.
For local development you may choose any string.
It is required for generating authentication tokens.

## Manual Deployment

This app is hosted on AWS through the UW ACS gmail account.
Follow the steps below to manually deploy the app:

1. Download the `acs-website.pem` from the ACS Google Drive at `/Website/Keys`.

2. Edit permission of the downloaded file with `chmod 400 acs-website.pem`.

3. SSH into the ec2 instance. With the downloaded key in the working directory, on mac or linux you can run `ssh -i "acs-website.pem" ec2-user@uwacs.club`.

4. Run `deploy.sh` in the scripts folder: `./scripts/deploy.sh`.

This will deploy the latest remote changes for the current branch.
If the current branch is not `master`, the script will display a warning and proceed with the deployment after 3 seconds.
