in constants.js file set <br/>
BASE_URL = 'https://notes-back-5.onrender.com'; (backend url after deployment) <br/>
instead of BASE_URL = 'http://localhost:8000'; (which we use while development) <br/>
<br/>

in .gitignore file , write below line<br/>
node_modules<br/>
no need to run npm run build, and push it on github (render will create it automaticaly).<br/>
git init <br/>
git add .<br/>
git commit -m "first commit"<br/>
git branch -M main<br/>
git remote add origin https://github.com/snowden7not/NOTES-front.git<br/>
git push -u origin main<br/>
<br/>
now u will see ur files on github.<br/>
GO to render.com -> dashboard -> new ->static Site -> paste repositary link in search box -> continue -> create Static Site<br/>
<br/>
<br/>
<br/>
NOTE: development guides below<br/>
<br/>
npm i react-router-dom<br/>
npm i react-icons<br/>
npm i react-modal<br/>
npm i axios<br/>
npm i moment<br/>
npm run start
<br/>
backend below:-<br/>
<br/>
npm init -y<br/>
npm i nodemon<br/>
<br/>
update scripts as below<br/>
"scripts": {<br/>
  "start": "node index.js",<br/>
  "dev":"nodemon index.json"<br/>
},<br/>
<br/>
npm i express<br/>
npm i dotenv<br/>
npm i mongoose<br/>
npm i cors<br/>
npm i jsonwebtoken<br/>
npm i bcrypt<br/>
npm i express-fileupload<br/>
npm install cloudinary<br/>
<br/>
create index.js file, and write below code<br/>
const express=require("express")<br/>
const app=express();<br/>
app.listen(3000,()=>{<br/>
    console.log("app is running successfuly");<br/>
})<br/>
<br/>
npm run dev<br/>
<br/>
