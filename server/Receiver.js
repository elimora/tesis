//Chunk 1
const express =require('express');
const morgan=require('morgan'); 
const cors=require('cors');//2

const app= express(); 
app.use(cors()); //2
const path= require('path');

const sgMail=require('@sendgrid/mail'); 
const API_KEY="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"; 
sgMail.setApiKey(API_KEY); 


//envio de dattos al correo****
const {Pool}=require('pg'); 

const pool= new Pool({
    host:'localhost',
    user :'postgres', 
    password:'elimora', 
    database:'Sender', 
    port:'5432'

}); 
//envio de dattos al correo****

//Chunk 2
//Data parsing 
app.use(express.urlencoded({extended:false}));
app.use(express.json()); 
app.set('port',process.env.PORT||3001); 
app.use(morgan('dev')); 


//email, subject, text
app.post('/email', async(req, res)=>{
    const {subject, email, text, hora, dia}=req.body; 
    console.log('Datos :', req.body); 

    const mirespuesta=await pool.query(`insert into persistencia (texto_msg, src_msg, tipo_msg, "fechaEnvio_msg", "horaEnvio_msg", "fechaRecepcion_msg", "horaRecepcion_msg", remitente_msg, destinatario_msg, status_msg, ruta_msg, "archivoAdjunto_msg") values  ('${text}','${email}','email','${dia}','${hora}','06/04/21','9:01 pm','${subject}','micorreogmail','entregado','gmail','sin adjunto')`)
    const message= {
        to:`${email}`, 
        //to:['elimorameta80@gmail.com','edilyrosa@gmail.com', 'elimorameta@hotmail.com'],
        from:'eli.mora@ujgh.edu.ve',
        subject:`${subject}`, 
        text:'Es testing',
        html:`<h1>${text}</h1>`,
    }; 
    
    sgMail
    .send(message)
    .then((response)=> console.log('el mensaje fue enviado...'))
    .catch((error)=>console.log(error.message)); 
});

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html')); 
    //console.log(path.join(__dirname,'index.html'))
}); 

app.use('/api/mails',require('./Routes/routes'))
app.listen(app.get('port'), ()=>console.log(`Servidor  a la escucha en el puerto ${app.get('port')}` ));  