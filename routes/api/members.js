const express = require('express');
const router = express.Router();
const members = require('../../Members')

// Gets all members
router.get('/', (req, res) => {
    res.json(members);
})

// Get single member
router.get('/:id', (req, res) => {
    const found = members.some(mem => mem.id === parseInt(req.params.id))

    if (found){
        res.json(members.filter(mem => mem.id === parseInt(req.params.id)))
    }
    else{
        res.status(400).json({msg: `Oops! Member not found for id ${req.params.id}...`})
    }
})

// Create Member
router.post('/', (req, res) => {
    const newMember ={
        id : members.length + 1,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email){
        return res.status(400).json({msg : 'Please include a name and email'})
    }

    members.push(newMember);
    // res.json(members)
    res.redirect('/');
})

// Update member
router.put('/:id', (req, res) => {
    const found = members.some(mem => mem.id === parseInt(req.params.id))

    if (found){
        const updMember = req.body;

        members.forEach(mem => {
            if(mem.id === parseInt(req.params.id)){
                mem.name = updMember.name ? updMember.name : mem.name;
                mem.email = updMember.email ? updMember.email : mem.email;

                res.json({ msg : "Member updated", mem})
            }
        })

    }
    else {
        res.status(400).json({msg: `Oops! Member not found for id ${req.params.id}...`})
    }    
})

// Delete Member
router.delete('/:id', (req, res) => {
    const found = members.find(mem => mem.id === parseInt(req.params.id))

    if (found){
        res.json({
            msg: "Member Deleted...",
            members: members.filter(mem => mem.id !== parseInt(req.params.id))         
        })
    }
    else{
        res.status(400).json({msg: `Oops! Member not found for id ${req.params.id}...`})
    }
})

module.exports = router;