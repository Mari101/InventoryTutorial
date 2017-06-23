module.exports = (app) => {
    // Albums
    const albums = require('./controllers/albumController');
    app.get('/albums', albums.getAlbums);
    app.get('/albums/:id', albums.getAlbum);
    app.post('/albums', albums.addAlbum);
    app.put('/albums/:id', albums.updateAlbum);
    app.delete('/albums/:id', albums.deleteAlbum);


    // Users
    const users = require('./controllers/userController');
    app.post('/register', users.registerUser);
    app.post('/login', users.login);
    app.get('/users', users.getUsers);
    app.get('/users/:id', users.getUser);
    app.put('/users/:id', users.editUser);
    app.delete('/users/:id', users.deleteUser);
}


// CRUD for Albums
// CRUD for Users
