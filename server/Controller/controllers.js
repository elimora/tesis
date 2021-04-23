const {Pool}=require('pg'); 


const pool= new Pool({
    host:'localhost',
    user :'postgres', 
    password:'elimora', 
    database:'Sender', 
    port:'5432'

}); 


const mailCtrl= {}

mailCtrl.getMails= async (req, res)=>{

    const response = await pool.query('SELECT * FROM persistencia'); 
    res.status(200).json(response.rows); 
    console.log(response.rows); 
};

mailCtrl.getEmailById= async (req,res)=>{
    //res.send('email id: '+ req.params.id)
    const id=req.params.id
    const response = await pool.query(`SELECT * FROM persistencia WHERE "id_msg"=${id}`); 
    res.json(response.rows) 
}

mailCtrl.createMail= async (req, res)=>{
   
    //console.log(req.body); 
    const {texto_msg,src_msg,tipo_msg,fechaEnvio_msg,horaEnvio_msg,fechaRecepcion_msg,horaRecepcion_msg,remitente_msg,destinatario_msg,status_msg,ruta_msg,archivoAdjunto_msg}= req.body

    //const response=await  pool.query(`insert into persistencia values  (,'','','','','','','','','','','' )`); 
    const mirespuesta=await pool.query(`insert into persistencia (texto_msg, src_msg, tipo_msg, "fechaEnvio_msg", "horaEnvio_msg", "fechaRecepcion_msg", "horaRecepcion_msg", remitente_msg, destinatario_msg, status_msg, ruta_msg, "archivoAdjunto_msg") values  ('${req.body.texto_msg}','${req.body.src_msg}','${req.body.tipo_msg}','${req.body.fechaEnvio_msg}','${req.body.horaEnvio_msg}','${req.body.fechaRecepcion_msg}','${req.body.horaRecepcion_msg}','${req.body.remitente_msg}','${req.body.destinatario_msg}','${req.body.status_msg}','${req.body.ruta_msg}','${req.body.archivoAdjunto_msg}' )`)
    console.log(mirespuesta); 
    // res.json({
    //     message:'Email agregado satisfactoriamente', 
    //     body:{
    //         mail:{texto_msg,src_msg,tipo_msg,fechaEnvio_msg,horaEnvio_msg,fechaRecepcion_msg,horaRecepcion_msg,remitente_msg,destinatario_msg,status_msg,ruta_msg,archivoAdjunto_msg}
    //     }
    // })
}; 


mailCtrl.updateMail= async (req, res)=>{
   const id=req.params.id; 
   const {id_msg,texto_msg,src_msg,tipo_msg,fechaEnvio_msg,horaEnvio_msg,fechaRecepcion_msg,horaRecepcion_msg,remitente_msg,destinatario_msg,status_msg,ruta_msg,archivoAdjunto_msg}= req.body; 
 
   const response=await pool.query(`UPDATE persistencia set "id_msg" = '${id_msg}', "texto_msg"= '${texto_msg}', "fechaEnvio_msg"='${fechaEnvio_msg}', "horaEnvio_msg"='${horaEnvio_msg}',"fechaRecepcion_msg" = '${fechaRecepcion_msg}', "horaRecepcion_msg"= '${horaRecepcion_msg}', "remitente_msg"='${remitente_msg}', "destinatario_msg"='${destinatario_msg}',  "status_msg"='${status_msg}', "ruta_msg"='${ruta_msg}', "archivoAdjunto_msg"='${archivoAdjunto_msg}' where "id_msg"=${id}`)
   
   res.json('Ususrio actualizado de forma satisfactoria'); 

};

mailCtrl.deleteMail= async (req, res)=>{

    const id=req.params.id
    const response = await pool.query(`DELETE FROM persistencia WHERE "id_msg"=${id}`); 
    //console.log(response); 
    res.json(`El email numero ${id} fue eliminado satisfactoriamente`)
    
};



module.exports =mailCtrl; 