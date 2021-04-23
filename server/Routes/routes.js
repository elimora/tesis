const {Router} =require('express'); 
const router =Router(); 

const mailCtrl= require('../Controller/controllers'); 

router.get('/',mailCtrl.getMails);

router.get('/:id',mailCtrl.getEmailById); 

router.post('/', mailCtrl.createMail); 
 
router.put('/:id',mailCtrl.updateMail); 

router.delete('/:id',mailCtrl.deleteMail); 


module.exports= router; 