
if(document.getElementById('contactForm')){
    if(Date.now()>localStorage.getItem('emailconatcttimimg')){
        document.getElementById('sendContact').style.display=''
      }else{
        document.getElementById('sendContact').style.display='none'
      }
      let date=new Date();
    document.getElementById('sendContact').addEventListener('click',(e)=>{
        e.preventDefault();
        const data={}
        data.name=document.getElementById('name').value;
        data.phone=document.getElementById('phone').value;
        data.message=document.getElementById('message').value;
        data.city=document.getElementById('city').value;
        data.email=document.getElementById('email').value;
        document.getElementById('sendContact').style.display='none'
        fetch('http://127.0.0.1:3000/contact/sendMail', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            console.log(Date.now())
            localStorage.setItem('emailconatcttimimg',(Date.now()+(24*60*60*1000)))
          })
          .catch((error) => {

            console.error('Error:', error);
          });
        
    })
}