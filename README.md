# File upload service

### This project includes the front- and backend portions of a simple file and image upload service

You need to have a .env file with the credentials to your SQL database  
Currently the path where the uploaded files are stored is hardcoded in, so you need to make sure change that in `./routes/f.js`

Install the dependecies:  
`npm i`  

To run:  
`npm test`  

---
### Purpose
This project was made to simplify file transfers and image embeds. Benefits of a privately hosted file hosts are great. Including: fast upload and download speeds, larger file sizes with better privacy and control.

---

### Functionality:
The front end consists from a login page, and a upload page.   

(You need to generate the login credentials seperately and insert them directly in to the databse. The site deos not have the capability to register, for privcy reasons)  

Once you are authenticated you are able to select file and upload them to the server. It then creates a short URL that points to the wanted file. On the main page you can also remove and observe the links that you have previously created.  

These links are supposed to be short and embeddable in multiple different social media and chat applications. It works as a small hybrid image and file host.
