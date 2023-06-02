# S23-CS35L-Project

## Environment Setup

</br>

### - Step 1: Make sure you have following installed:
        1. Node.js
        2. MongoDB

If you haven't downloaded MongoDB on your device, you can follow this [link](https://www.mongodb.com/try/download/community).
**Make sure you download the MongoDB, not the MongoDB Altas**

After installation, you should add the MongoDB bin directory to your system's PATH environment variable. Please check this 
[link](https://www.mongodb.com/docs/mongodb-shell/install/) for more detail on that.

</br>

### - Step 2: Go to the Backend folder, and open terminal

Run the following command to generate node_modules:
<pre><code>
npm install
</code></pre>

</br>

### - Step 3: Create local .env file
Please create a file named **.env** in the Backend directory. And add following line to it:
<pre><code>
DATABASE_URL=mongodb://localhost/user
</code></pre>

</br>

### - Step 4: Activate the server
Now, you should be able to run the following command to activate the server:
<pre><code>
npm run devStart
</code></pre>
