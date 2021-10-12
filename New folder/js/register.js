reg_form = document.getElementById('register');

if (reg_form) {
    document.getElementById('submit_btn').addEventListener('click', (e) => {
        e.preventDefault();
        const user = {}
        user.first_name = document.getElementById('first_name').value;
        user.last_name = document.getElementById('last_name').value;
        user.email = document.getElementById('email').value;
        user.phone = document.getElementById('phone').value;
        user.city = document.getElementById('city').value;
        user.password = document.getElementById('password').value;
        user.confirm_password = document.getElementById('confirm_password').value;
        console.log(user)
        fetch('http://127.0.0.1:3000/register', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status == "success") {

                    window.location.assign('/')
                } else {
                    if (data.msg) {
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