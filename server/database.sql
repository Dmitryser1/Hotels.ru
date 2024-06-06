
CREATE TABLE client(
    clientId SERIAL PRIMARY KEY,
    name VARCHAR(45),
    characteristic VARCHAR(45),
    profilePhoto VARCHAR(45),
    password INTEGER,
    email VARCHAR(250),
    idGallery INTEGER,
    FOREIGN KEY (idGallery) REFERENCES Gallery (idGallery)
);

CREATE TABLE gallery(
    idGallery SERIAL  PRIMARY KEY,
    author VARCHAR(45),
    galleryName VARCHAR(45),
    characteristic VARCHAR(45),
    photoid INTEGER,
    mainPhoto VARCHAR(45),
    idPhoto INTEGER,
    FOREIGN KEY (idPhoto) REFERENCES photo(idPhoto)
);

CREATE TABLE types (
    idtypes SERIAL PRIMARY KEY,
    name VARCHAR(45)
);

CREATE TABLE photo (
    idPhoto SERIAL PRIMARY KEY,
    photo VARCHAR(45),
    authorphoto VARCHAR(45),
    typephoto INTEGER,
    FOREIGN KEY (typephoto) REFERENCES types(idtypes)

);


CREATE TABLE commentChat (
    idCommentChat SERIAL PRIMARY KEY,
    idGallery INTEGER,
    clientId INTEGER,
    commenttext VARCHAR(255),
    FOREIGN KEY (idGallery) REFERENCES Gallery(idGallery),
    FOREIGN KEY (clientId) REFERENCES client(clientId)

);

CREATE TABLE appeal (
    idAppeal SERIAL PRIMARY KEY,
    clientId INTEGER,
    idModerator INTEGER,
    reason VARCHAR(45),
    result INTEGER,
    idAlbum INTEGER,
    FOREIGN KEY (clientId) REFERENCES client(clientId),
    FOREIGN KEY (idModerator) REFERENCES moderator(idModerator),
    FOREIGN KEY (idAlbum) REFERENCES Gallery(idGallery)
);

CREATE TABLE moderator (
    idModerator SERIAL PRIMARY KEY
);