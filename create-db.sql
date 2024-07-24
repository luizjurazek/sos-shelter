-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2024 at 02:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sos-shelter`
--

-- --------------------------------------------------------

--
-- Table structure for table `blacklist_tokens`
--

CREATE TABLE `blacklist_tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blacklist_tokens`
--

INSERT INTO `blacklist_tokens` (`id`, `token`, `createdAt`, `updatedAt`, `id_user`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJpYXQiOjE3MTc2MjQxMzYsImV4cCI6MjMyMjQyNDEzNn0.Ni2GWIMSeMAPqo93dUyREUcwwCFxGptK9zO_7_LKfLc', '2024-07-23 23:49:29', '2024-07-23 23:49:29', NULL),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJpYXQiOjE3MjE3Nzg1NTEsImV4cCI6MjMyNjU3ODU1MX0.IDMivMhWajBvy8OXwnCFX-2kVK8prkB9TFSww_7XSGU', '2024-07-23 23:49:33', '2024-07-23 23:49:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `old_address` int(11) DEFAULT NULL,
  `new_address` int(11) DEFAULT NULL,
  `cpf` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `id_shelter` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `name`, `birthday`, `phonenumber`, `old_address`, `new_address`, `cpf`, `status`, `id_shelter`, `createdAt`, `updatedAt`) VALUES
(2, 'Jose Jurazek', '2022-03-23', '(44)98820-1874', 1, 1, '10380652919', 1, NULL, '2024-07-24 00:03:53', '2024-07-24 00:05:40');

-- --------------------------------------------------------

--
-- Table structure for table `people_new_address`
--

CREATE TABLE `people_new_address` (
  `id` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `complement` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `people_new_address`
--

INSERT INTO `people_new_address` (`id`, `country`, `state`, `city`, `street`, `zipcode`, `number`, `complement`, `createdAt`, `updatedAt`) VALUES
(1, 'USA', 'Texas', 'London', NULL, NULL, NULL, NULL, '2024-07-24 00:00:53', '2024-07-24 00:00:53');

-- --------------------------------------------------------

--
-- Table structure for table `people_old_address`
--

CREATE TABLE `people_old_address` (
  `id` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `complement` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `people_old_address`
--

INSERT INTO `people_old_address` (`id`, `country`, `state`, `city`, `street`, `zipcode`, `number`, `complement`, `createdAt`, `updatedAt`) VALUES
(1, 'Brasil', 'RJ', 'Rj', NULL, NULL, NULL, NULL, '2024-07-24 00:01:05', '2024-07-24 00:01:05');

-- --------------------------------------------------------

--
-- Table structure for table `people_status`
--

CREATE TABLE `people_status` (
  `id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `people_status`
--

INSERT INTO `people_status` (`id`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'abrigado', '2024-07-24 00:01:28', '2024-07-24 00:01:28');

-- --------------------------------------------------------

--
-- Table structure for table `shelters`
--

CREATE TABLE `shelters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` int(11) NOT NULL,
  `max_capacity` int(11) NOT NULL DEFAULT 0,
  `current_occupancy` int(11) NOT NULL DEFAULT 0,
  `amount_volunteers` int(11) NOT NULL DEFAULT 0,
  `id_admin_shelter` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shelters`
--

INSERT INTO `shelters` (`id`, `name`, `address`, `max_capacity`, `current_occupancy`, `amount_volunteers`, `id_admin_shelter`, `createdAt`, `updatedAt`) VALUES
(4, 'shelter casa do joao', 1, 10, 1, 0, 7, '2024-07-23 23:56:44', '2024-07-24 00:05:28');

-- --------------------------------------------------------

--
-- Table structure for table `shelter_address`
--

CREATE TABLE `shelter_address` (
  `id` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `complement` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shelter_address`
--

INSERT INTO `shelter_address` (`id`, `country`, `state`, `city`, `street`, `zipcode`, `number`, `complement`, `createdAt`, `updatedAt`) VALUES
(1, 'Brasil', 'Paraná', 'Mandaguaçu', 'Miguel perissin', '87160-000', '165', NULL, '2024-07-23 23:54:06', '2024-07-23 23:54:06');

-- --------------------------------------------------------

--
-- Table structure for table `supplies`
--

CREATE TABLE `supplies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` decimal(10,2) DEFAULT 0.00,
  `unit` varchar(255) DEFAULT NULL,
  `id_shelter` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `phonenumber` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `id_shelter` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `birthday`, `email`, `phonenumber`, `password`, `role`, `id_shelter`, `createdAt`, `updatedAt`) VALUES
(6, 'Luiz', 'Jurazek', '1992-01-01', 'luizin@gmail.com', '(44)98820-1874', '$2b$10$YH7M6PV18KxkW7IwXnaBD.wj6Qjg3w0rPI1bYLrN58xgQeNOauK2a', 1, NULL, '2024-07-23 23:46:20', '2024-07-23 23:46:20'),
(7, 'admin', 'Jurazek', '1992-01-01', 'admin@gmail.com', '(44)98820-1874', '$2b$10$bSjW1xtDbP9WDk6ulHLJl.2Bi/LHyrg.0ZSpaQaRQyV1D91AGYwFW', 1, NULL, '2024-07-23 23:48:59', '2024-07-23 23:48:59');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `trigger_update_amount_volunteers` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    -- Atualizar o amount_volunteers na tabela shelters após a inserção de um usuário
    UPDATE shelters 
    SET amount_volunteers = (
        SELECT COUNT(*) 
        FROM users 
        WHERE users.id_shelter = shelters.id
    )
    WHERE shelters.id = NEW.id_shelter;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trigger_update_amount_volunteers_delete` AFTER DELETE ON `users` FOR EACH ROW BEGIN
    -- Atualizar o amount_volunteers na tabela shelters após a remoção de um usuário
    UPDATE shelters 
    SET amount_volunteers = (
        SELECT COUNT(*) 
        FROM users 
        WHERE users.id_shelter = shelters.id
    )
    WHERE shelters.id = OLD.id_shelter;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `role` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2024-07-23 23:43:52', '2024-07-23 23:43:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blacklist_tokens`
--
ALTER TABLE `blacklist_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blacklisttokens_users_FK` (`id_user`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_people_old_address` (`old_address`),
  ADD KEY `fk_shelter_people` (`id_shelter`),
  ADD KEY `peoples_people_new_address_FK` (`new_address`),
  ADD KEY `peoples_people_status_FK` (`status`);

--
-- Indexes for table `people_new_address`
--
ALTER TABLE `people_new_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `people_old_address`
--
ALTER TABLE `people_old_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `people_status`
--
ALTER TABLE `people_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `people_status_unique` (`status`);

--
-- Indexes for table `shelters`
--
ALTER TABLE `shelters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_admin_shelter` (`id_admin_shelter`),
  ADD KEY `shelters_shelter_address_FK` (`address`);

--
-- Indexes for table `shelter_address`
--
ALTER TABLE `shelter_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplies`
--
ALTER TABLE `supplies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_shelter_supply` (`id_shelter`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_shelter_id` (`id_shelter`),
  ADD KEY `users_user_role_FK` (`role`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_role_unique` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blacklist_tokens`
--
ALTER TABLE `blacklist_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `people_new_address`
--
ALTER TABLE `people_new_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `people_old_address`
--
ALTER TABLE `people_old_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `people_status`
--
ALTER TABLE `people_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shelters`
--
ALTER TABLE `shelters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `shelter_address`
--
ALTER TABLE `shelter_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supplies`
--
ALTER TABLE `supplies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blacklist_tokens`
--
ALTER TABLE `blacklist_tokens`
  ADD CONSTRAINT `blacklisttokens_users_FK` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Constraints for table `people`
--
ALTER TABLE `people`
  ADD CONSTRAINT `fk_people_old_address` FOREIGN KEY (`old_address`) REFERENCES `people_old_address` (`id`),
  ADD CONSTRAINT `fk_shelter_people` FOREIGN KEY (`id_shelter`) REFERENCES `shelters` (`id`),
  ADD CONSTRAINT `peoples_people_new_address_FK` FOREIGN KEY (`new_address`) REFERENCES `people_new_address` (`id`),
  ADD CONSTRAINT `peoples_people_status_FK` FOREIGN KEY (`status`) REFERENCES `people_status` (`id`);

--
-- Constraints for table `shelters`
--
ALTER TABLE `shelters`
  ADD CONSTRAINT `fk_admin_shelter` FOREIGN KEY (`id_admin_shelter`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `shelters_shelter_address_FK` FOREIGN KEY (`address`) REFERENCES `shelter_address` (`id`);

--
-- Constraints for table `supplies`
--
ALTER TABLE `supplies`
  ADD CONSTRAINT `fk_shelter_supply` FOREIGN KEY (`id_shelter`) REFERENCES `shelters` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_shelter_id` FOREIGN KEY (`id_shelter`) REFERENCES `shelters` (`id`),
  ADD CONSTRAINT `users_user_role_FK` FOREIGN KEY (`role`) REFERENCES `user_role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
