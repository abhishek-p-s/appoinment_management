------Tech Stack------

Backend

1. Node JS 
2. Express Framework
3. MongoDB
4. mongoose

Frontend

1. React
2. Typescript
3. tailwind
4. antd

------Setting up project-----

1. go to backend folder and execute npm start ( it will start the backend at http://localhost:3000)
2. go to frontend folder and execute "npm run dev" (it will start the frontend at http://localhost:5173)

-----Seeding data to DB--------

1. http://localhost:3000/users/seed call this API (GET Method) it will enter data into the DB it will create one admin user and roles

username: admin@gmail.com
password: 123

When creating a user the backend will default create a password and later the user can change once they are login
Backend default password: p@ssw0rd;

----Depoloyment Instraction------
 1. you can create a build using "npm run build" command 
 2. once the build is created you can add into any aws, azure server and you can add configuration according to the server type(ngnix, apache)
 3. for running the backend you can run the code using pm2 or you can add a proxy server into the 3000 port(backend running port)
  
  configuration for the sites-available (apache server)

  <VirtualHost *:80>
    ServerName  <DOMAIN_URL>
    ServerAlias  <DOMAIN_URL>
   # ServerAdmin webmaster@localhost
    ServerAdmin  <DOMAIN_URL>
    DocumentRoot <PATH>
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    <Directory /var/www/html/>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Require all granted
    </Directory>
RewriteEngine on
RewriteCond %{SERVER_NAME} =<DOMAIN_URL>
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>

----My approch to project-----

i created a basic appointment management system, with react, node js it's very basic.
as user he can put his appointment using his email and if he loged in they can see that in the portal

Esitimated Time: 4 Days

-----Pending by side----
1. UI styling is not good needs to make more attractive
2. admin part functinality needs to make more 
3. dockerizing the entire app is pending
