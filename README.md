# S23-CS35L-Project

## NoteLord Application Introduction:

<br/>

### **What is Notelord?**
Notelord is a software application operating on locally-hosted software that serves as an editing device that enables user to output professional sheet music by plain text input.

<br/>

### **What you can do with Notelord?**
With our easy-to-use textbox, you can type in \command to generate professional music notations. Once you have finished typing, click "Translate" button to display the sheet music. This also saves your current input to our backend server.

Our application also features seamless data saving, uploading, and deleting from the client to our backend server. Your input text will be saved and can be viewed under "Files" where you can retrieve your old scores.

</br>

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


</br>

</br>

</br>

## Run the app locally

</br>

After you have activated the server, you are good to start using the app.

Please go the src/Frontend folder, and open the **splashScreen.html**.

<br/>

Once you start the app, you can always check the **Manual** Page on the top Navigation Bar to learn how to precisely use the app.

<br/>
Our app provides secure data saving and retrieving tools such that you will have no concerns regarding losing your valuable work. In addtion to identifying your \command inputs which will generate corresponding music notations, you may also add comments to your command for instant or future references.

<br/> 

You may also generate a pdf of the music sheet translated by your input and save them to your local computer. 

