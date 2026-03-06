CREATE DATABASE IF NOT EXISTS veterinaria;
USE veterinaria;

CREATE TABLE Dueño (
    Id_dueño INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_dueño VARCHAR(150) NOT NULL,
    Dirección VARCHAR(255),
    Teléfono VARCHAR(20),
    Correo VARCHAR(100),
    Fecha_registro DATE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Mascota (
    Id_mascota INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Especie VARCHAR(50),
    Raza VARCHAR(50),
    Sexo CHAR(1),
    Color VARCHAR(50),
    Fecha_nacimiento DATE,
    Peso DECIMAL(5,2),
    Estado ENUM('activo', 'fallecido') DEFAULT 'activo',
    Id_dueño INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_dueño) REFERENCES Dueño(Id_dueño) ON DELETE CASCADE
);

CREATE TABLE Veterinario (
    Id_veterinario INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Veterinario VARCHAR(150) NOT NULL,
    Especialidad VARCHAR(100),
    Cedula_profesional VARCHAR(50),
    Teléfono VARCHAR(20),
    Correo VARCHAR(100),
    Fecha_contratacion DATE,
    Estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Cita (
    Id_cita INT PRIMARY KEY AUTO_INCREMENT,
    Fecha_cita DATE,
    Hora_cita TIME,
    Estado_cita ENUM('programada', 'cancelada', 'completa') DEFAULT 'programada',
    Motivo_cita TEXT,
    Id_mascota INT,
    Id_veterinario INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_mascota) REFERENCES Mascota(Id_mascota) ON DELETE CASCADE,
    FOREIGN KEY (Id_veterinario) REFERENCES Veterinario(Id_veterinario) ON DELETE SET NULL
);

CREATE TABLE Consulta (
    Id_consulta INT PRIMARY KEY AUTO_INCREMENT,
    Fecha_consulta DATE,
    Diagnostico TEXT,
    Tratamiento TEXT,
    Observaciones TEXT,
    Peso_mascota DECIMAL(5,2),
    Temperatura DECIMAL(4,2),
    Id_cita INT UNIQUE,
    Id_veterinario INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_cita) REFERENCES Cita(Id_cita) ON DELETE CASCADE,
    FOREIGN KEY (Id_veterinario) REFERENCES Veterinario(Id_veterinario) ON DELETE SET NULL
);

CREATE TABLE Historial_Medico (
    Id_historial INT PRIMARY KEY AUTO_INCREMENT,
    Fecha_registro DATE,
    Tipo_evento ENUM('enfermedad', 'cirugia', 'alergia', 'tratamiento'),
    Descripcion TEXT,
    Observaciones TEXT,
    Id_mascota INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_mascota) REFERENCES Mascota(Id_mascota) ON DELETE CASCADE
);

CREATE TABLE Vacuna (
    Id_vacuna INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_vacuna VARCHAR(100) NOT NULL,
    Descripción TEXT,
    Tipo_vacuna VARCHAR(50),
    Dosis VARCHAR(50),
    Intervalo_refuerzo VARCHAR(50),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Mascota_Vacuna (
    Id_mascota_vacuna INT PRIMARY KEY AUTO_INCREMENT,
    Id_Mascota INT,
    Id_vacuna INT,
    Fecha_aplicacion DATE,
    Fecha_prox_dosis DATE,
    Observaciones TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_Mascota) REFERENCES Mascota(Id_mascota) ON DELETE CASCADE,
    FOREIGN KEY (Id_vacuna) REFERENCES Vacuna(Id_vacuna) ON DELETE CASCADE
);

CREATE TABLE Pago (
    Id_pago INT PRIMARY KEY AUTO_INCREMENT,
    Fecha_pago DATE,
    Monto DECIMAL(10,2),
    Método_pago VARCHAR(50),
    Estado_pago ENUM('pagado', 'pendiente') DEFAULT 'pendiente',
    Concepto TEXT,
    Id_consulta INT UNIQUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_consulta) REFERENCES Consulta(Id_consulta) ON DELETE CASCADE
);