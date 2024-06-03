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
now u will see ur files on github.
GO to render.com -> dashboard -> new ->static Site -> paste repositary link in search box -> continue -> create Static Site
