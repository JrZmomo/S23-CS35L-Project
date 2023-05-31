const express = require('express')
const router =  express.Router()
const File = require('../models/File')


//Getting all files
router.get('/', async (req, res) => {
    try {
        const files = await File.find()
        res.send(files)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Getting one file
router.get('/:filename', getFile, (req, res) => { 
    res.json(res.file)
})


//Creating one file 
router.post('/', async (req, res) => {
    const { filename, context } = req.body;
  
    try {
      const existingFile = await File.findOne({ filename });
        
      //making sure the filename is unique to each individual object in the DB
      if (existingFile) {
        return res.status(409).json({ message: 'Filename must be unique' });
      }
  
      const file = new File({ filename, context });
  
      const newFile = await file.save();
      res.status(201).json(newFile);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
//Updating one file
router.patch('/:filename', getFile, async (req, res) => {
    const { filename, context } = req.body;
    try {
        const existingFile = await File.findOne({ filename });
        //making sure the filename is unique to each individual object in the DB
      if (existingFile && filename != res.file.filename) {
        //if the filename is the original one, it's fine to have the exitingFile
        return res.status(409).json({ message: 'Filename must be unique' });
      }
        if (req.body.filename != null) {

        res.file.filename = filename}

        if (context != null) {
        res.file.context = context}

        const updatedFile = await res.file.save();
        res.json(updatedFile)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})




//Deleting one file
router.delete('/:filename', getFile, async (req, res) => {
    try {
        await File.deleteOne({filename:req.params.filename})
        res.json({ message: "File deteled sucessfully"})
    
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}) 


//middleware function
async function getFile(req, res, next) {
    let file
    try {
        file = await File.findOne({filename:req.params.filename})
        if (file == null) {
            return res.status(404).json({message: "Cannot find file"})
        }

    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.file = file
    next()
}


module.exports = router