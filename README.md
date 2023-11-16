# Setup
## Rasberry Pi
Install:
- lite Rasbian with ssh
- nodejs & npm
  - https://github.com/nodesource/distributions#installation-instructions
- express
  - sudo npm install express -g
- git
  - sudo apt install git
- mariadb (sql)
  - sudo apt-get update
  - sudo apt-get install mariadb-server --fix-missing
  - sudo apt-get install mariadb-client
  - sudo mysql_secure_installation
    - pass: rasberry

## DB configuration
  - log in to db: sudo mysql -u root -p
    - pass: rasberry

  - show databases; //list available dbs
  - create database smoker; //create db
  - use smoker; //select db
  - show tables; //list tables in db
  - GRANT ALL PRIVILEGES ON smoker.* TO 'root'@'localhost' IDENTIFIED BY 'rasberry'; //privileges for root user identified by password
  - SELECT User, Host FROM mysql.user; //list existing users
  - CREATE USER 'smokerUser'@'localhost' IDENTIFIED BY 'smoker'; //create new user
  - exit; //quit mysql

## Network
Configure:
- static internal IP
- port forwarding
- no-ip ddns service
