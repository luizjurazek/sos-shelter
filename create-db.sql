-- Criação das tabelas sem as chaves estrangeiras
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    id_shelter INT DEFAULT NUll,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE shelters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address JSON NOT NULL,
    max_capacity INT NOT NULL DEFAULT 0,
    current_occupancy INT NOT NULL DEFAULT 0,
    amount_volunteers INT NOT NULL DEFAULT 0,
    id_admin_shelter INT DEFAULT NUll,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE supplies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity DECIMAL(10, 2) DEFAULT 0,
    unit VARCHAR(255),
    id_shelter INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE people_old_address (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    street VARCHAR(255) DEFAULT NULL,
    zipcode VARCHAR(255) DEFAULT NULL,
    number VARCHAR(255) DEFAULT NULL,
    complement TEXT DEFAULT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE peoples (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    contact VARCHAR(255),
    old_address INT DEFAULT NULL,
    new_adress JSON DEFAULT NULL,
    cpf VARCHAR(255) DEFAULT NULL,
    status VARCHAR(255) NOT NULL,
    id_shelter INT DEFAULT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE BlacklistTokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Adição das chaves estrangeiras depois de criar as tabelas
ALTER TABLE users
ADD CONSTRAINT fk_shelter_id FOREIGN KEY (id_shelter) REFERENCES shelters(id);

ALTER TABLE shelters
ADD CONSTRAINT fk_admin_shelter FOREIGN KEY (id_admin_shelter) REFERENCES users(id);

ALTER TABLE supplies
ADD CONSTRAINT fk_shelter_supply FOREIGN KEY (id_shelter) REFERENCES shelters(id);

ALTER TABLE peoples
ADD CONSTRAINT fk_people_old_address FOREIGN KEY (old_address) REFERENCES people_old_address(id),
ADD CONSTRAINT fk_shelter_people FOREIGN KEY (id_shelter) REFERENCES shelters(id);


DELIMITER //

CREATE TRIGGER trigger_update_amount_volunteers
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    -- Atualizar o amount_volunteers na tabela shelters após a inserção de um usuário
    UPDATE shelters 
    SET amount_volunteers = (
        SELECT COUNT(*) 
        FROM users 
        WHERE users.id_shelter = shelters.id
    )
    WHERE shelters.id = NEW.id_shelter;
END//


CREATE TRIGGER trigger_update_amount_volunteers_delete
AFTER DELETE ON users
FOR EACH ROW
BEGIN
    -- Atualizar o amount_volunteers na tabela shelters após a remoção de um usuário
    UPDATE shelters 
    SET amount_volunteers = (
        SELECT COUNT(*) 
        FROM users 
        WHERE users.id_shelter = shelters.id
    )
    WHERE shelters.id = OLD.id_shelter;
END//

DELIMITER ;

