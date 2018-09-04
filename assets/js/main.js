//to get feedback from the user if something goes wrong
// a way to say to the user what the hell happened

const btn = document.getElementById('sendBtn');

btn.onclick = function(e){
    e.preventDefault();

    btn.setAttribute("disabled",true);
    document.getElementById('message').innerHTML = 'Sending email...';
//Wraper of the vanilla JS to send request the server
    fetch('http://localhost:8000/',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include",//allows cookies where we store the sesiones and keep ir alive
        body: JSON.stringify({
            from: document.getElementById('from').value,
            destination:document.getElementById('destination').value,
            subject: document.getElementById('subject').value,
        })
    })
    .then(result => result.json())
    .then(result => {
        document.getElementById('message').innerHTML = result.message;
        btn.removeAttribute("disabled");
        document.getElementById("form").reset();
    })
    .catch(err => {
        document.getElementById('message').innerHTML = err.message;
        btn.removeAttribute("disabled");
    })
}