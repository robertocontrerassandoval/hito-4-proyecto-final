//tabla usurio
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    date_birth DATE  -- DATE para almacenar fechas
);

//tabla de productos
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    imagen VARCHAR(200),
    descripcion TEXT,  -- TEXT para permitir descripciones largas
    precio NUMERIC(10, 2),  -- NUMERIC para precios con decimales
    stock INT
);

//tabla de favoritos
CREATE TABLE favorito (
    id SERIAL PRIMARY KEY,
    id_product INT,
    id_user INT,
    CONSTRAINT fk_product FOREIGN KEY (id_product) REFERENCES product(id) ON DELETE CASCADE,  -- Llave foránea
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE  -- Llave foránea
);
