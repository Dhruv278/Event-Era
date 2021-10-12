const fs=require('fs');
const express=require('express');
const mongoose=require('mongoose')
const globalerror=require('./errorHandling/GlobalError')
const app=express();
const path=require('path');
const authRouter=require('./routers/authrouter');
const userRouter=require('./routers/UserRoutes');
const venueRouter=require('./routers/VenueRouters');
const dotenv=require('dotenv')
const cookieparser=require('cookie-parser')
const cors=require('cors');

app.use(cookieparser())
dotenv.config({path:'./config.env'});
const db=process.env.DATABASE;
mongoose.connect(db,{ 
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(con => console.log('database is connected'));


app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'Public/')));




app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));

// start AJ
// app.set('view engine', 'pug');
// app.set('views',path.join(__dirname,'views'))
// end AJ

app.use('/',authRouter);
app.use('/user',userRouter)
app.use('/venue',venueRouter);

app.use(globalerror)

const port=process.env.PORT ||3000;

const server=app.listen(port,()=>{
    console.log(`server is listing on port ${port}`);
})