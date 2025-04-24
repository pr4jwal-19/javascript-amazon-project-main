const xhr = new XMLHttpRequest();

// .open() and .send() are asynchronous methods
// .open() method is used to initialize a request
// .send() method is used to send the request to the server

// this will wait for the response from the server
xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

// Request method , URL/url-path
xhr.open('GET', 'https://supersimplebackend.dev');

// send a messsage to the backend
// waits for the response
xhr.send();