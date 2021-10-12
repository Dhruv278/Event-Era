

const loginForm = document.querySelector('.form--login');

if (loginForm) {

    loginForm.addEventListener('submit', async e => {
        e.preventDefault();         //this prevents events to be triggered. means it stops form to be submitted.
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email, password)

        fetch('http://127.0.0.1:3000/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,password}),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
               if(data.status=="success"){
                   
                    window.location.assign('/')
               }else{
                   if(data.msg){
                       alert(data.msg);
                   }
               }
            })
            .catch((error) => {
                console.log(error)
               alert(error.msg);
            });
    });


}