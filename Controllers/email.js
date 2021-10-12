const nodemailer=require('nodemailer')
const pug=require('pug')
const ejs=require('ejs');
const htmlToText=require('html-to-text');

module.exports=class Email{
    constructor(user=null,venue=null,booking=null){
        this.user=user;
    
        this.venue=venue;
        this.booking=booking;
        // this.url=url;
    }

    newTransport(){

        return nodemailer.createTransport({
                host:process.env.GMail_HOST,
                port:process.env.GMAIL_PORT,
            auth:{
                user:process.env.MYMAIL,
                pass:process.env.MYMAIL_PASSWORD
            }
        })
    }
  async  send(templet,subject){
         const html=pug.renderFile(`${__dirname}/../views/emails/${templet}.pug`,{
             first_name:this.user.first_name,
             venue_name:this.venue.name,
             venue_date:this.booking.bookingDate,
             booking_id:this.booking.id,
             venue_phone:this.venue.phone
             
         })
        const mailOption={
            from:`${process.env.MYMAIL}`,
            to:`${this.user.email}`,
            subject,
            html,
            text:htmlToText.fromString(html)
            // html
        }
        // console.log('inside email 2')
    // send mail

   await this.newTransport().sendMail(mailOption)
   
    


    }
  async  sendContact(user){
      console.log('work3');
         const html=await ejs.renderFile(`${__dirname}/../views/emails/contactMail.ejs`,{
             name:user.name,
             phone:user.phone,
             message:user.message,
             email:user.email,
             city:user.city
             

         })
         console.log('work4 ')
        const mailOption={
            from:`${process.env.MYMAIL}`,
            to:`${process.env.MYMAIL}`,
            subject:'Conatct Us',
            html,
            text:htmlToText.fromString(html)
            // html
        }
        console.log('inside email 2')
    // send mail
   console.log('workinggfgfdgfd')
   await this.newTransport().sendMail(mailOption)
   
    


    }
async welcomeMail(){
 await   this.send("Welcome",'Thank you for join with US')
//  console.log('inside email 1')
}
async contact(user){
    console.log(user)
    await this.sendContact(user)
}
async verificationMail(){
    await this.send("ForgotPaswword",'Verifiction Account')
}
}
