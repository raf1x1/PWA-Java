$(document).ready(function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    }

    loadHome();

    $('#home-tab').click(function() {
        loadHome();
    });
    $('#gallery-tab').click(function() {
        loadGallery();
    });
    $('#about-tab').click(function() {
        loadAbout();
    });

    function loadHome() {
        $('#content').html('<h2>Loading...</h2>');
        $.getJSON('https://jsonplaceholder.typicode.com/users', function(users) {
            let html = `
                <div class="card">
                    <div class="card-header">
                        Users
                    </div>
                    <div class="card-body">
                        <ul class="list-group">`;
            users.forEach(user => {
                html += `<li class="list-group-item">${user.name} - ${user.email}</li>`;
            });
            html += `
                        </ul>
                    </div>
                </div>`;
            $('#content').html(html);
        });
    }

    function loadGallery() {
        $('#content').html('<h2>Loading...</h2>');
        $.getJSON('https://jsonplaceholder.typicode.com/photos', function(photos) {
            let html = `
                <div class="card">
                    <div class="card-header">
                        Gallery
                    </div>
                    <div class="card-body">
                        <div class="row">`;
            photos.slice(0, 20).forEach(photo => { 
                html += `
                    <div class="col-md-3">
                        <div class="card mb-4">
                            <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}">
                            <div class="card-body">
                                <h5 class="card-title">${photo.title}</h5>
                            </div>
                        </div>
                    </div>`;
            });
            html += `
                        </div>
                    </div>
                </div>`;
            $('#content').html(html);
        });
    }

    function loadAbout() {
        $('#content').html('<h2>Loading...</h2>');
        
        const developerInfo = {
            name: "Rafael Ryan Bejosano Bigal",
            email: "bigalryan225@gmail.com",
            location: "Del Carmen, Alaminos Laguna",
            bio: "Hello! I'm a student on a journey of discovery and learning. Every day, I immerse myself in the world of education, exploring diverse subjects, honing my skills, and embracing new experiences. From attending classes to studying for exams, and from pursuing hobbies to engaging in extracurricular activities, I'm passionate about making the most of my time as a student. With each challenge I face and every lesson I learn, I'm continually growing and evolving. As I navigate this exciting chapter of my life, I'm eager to connect with fellow students, educators, and anyone else who shares a love for knowledge and learning. Let's embark on this educational adventure together!."
        };
    
        const html = `
            <div class="card">
                <div class="card-header">
                    About
                </div>
                <div class="card-body">
                
                    <p>Name: ${developerInfo.name}</p>
                    <p>Email: ${developerInfo.email}</p>
                    <p>Location: ${developerInfo.location}</p>
                    <p>Bio: ${developerInfo.bio}</p>
                    <p>More: Information " https://pwa-portfolio-bigal.netlify.app/ </p>
                </div>
            </div>`;
        $('#content').html(html);
    }
    
});
