const express=require('express'); 
const nodeMailer=require('nodemailer'); //2
const cors=require('cors');//2
const morgan=require('morgan');//1
const app=express(); 

//*-*-*-*-*-*-*-*-*-*-*-*-*
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


//*-*-*-*-*-*-*-*-*-*-*-*-*



app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(morgan('dev')); //1


app.post('/api/forma', async (req,res)=>{
    const {mymessage, subject, email, text, hora, dia,name}=req.body; 
    console.log('Datos :', req.body); 

    const mirespuesta=await pool.query(`insert into persistencia (texto_msg, src_msg, tipo_msg, "fechaEnvio_msg", "horaEnvio_msg", "fechaRecepcion_msg", "horaRecepcion_msg", remitente_msg, destinatario_msg, status_msg, ruta_msg, "archivoAdjunto_msg") values  ('${mymessage}','${email}','email','${dia}','${hora}','${dia}','${hora}','${subject}','micorreogmail','entregado','gmail','sin adjunto')`)
    const message= {
        to:`${email}`, 
        //to:['elimorameta80@gmail.com','edilyrosa@gmail.com', 'elimorameta@hotmail.com'],
        from:'eli.mora@ujgh.edu.ve',
        subject:`${name}`, 
        text:'Es testing',
        html:`<h1>${mymessage}</h1>`,
    }; 
    
    sgMail
    .send(message)
    .then((response)=> console.log('el mensaje fue enviado...'))
    .catch((error)=>console.log(error.message)); 
        
}); 

const PORT=process.env.PORT || 3000;

app.use('/api/mails',require('./server/Routes/routes'))//*-*-*-*
app.listen(PORT, ()=>{
    console.log(`servidor en el puerto ${PORT}`)
}) 