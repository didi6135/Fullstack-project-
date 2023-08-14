-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2023 at 11:48 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trip-for-you`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(100) NOT NULL,
  `tripId` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `tripId`) VALUES
(34, 61),
(34, 62),
(34, 63),
(34, 66),
(34, 67),
(34, 70),
(35, 64),
(35, 65),
(35, 72),
(35, 75),
(35, 76),
(37, 63),
(37, 65),
(37, 72),
(37, 73),
(37, 74),
(37, 76),
(38, 62),
(38, 64),
(38, 67),
(38, 68),
(43, 61),
(43, 62),
(44, 61),
(44, 62),
(44, 68),
(44, 73),
(44, 74),
(45, 62),
(45, 75);

-- --------------------------------------------------------

--
-- Table structure for table `trip`
--

CREATE TABLE `trip` (
  `TripId` int(100) NOT NULL,
  `destination` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `tripDescription` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `dateStart` date NOT NULL,
  `dateEnd` date NOT NULL,
  `price` int(255) NOT NULL,
  `imageName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trip`
--

INSERT INTO `trip` (`TripId`, `destination`, `tripDescription`, `dateStart`, `dateEnd`, `price`, `imageName`) VALUES
(61, 'Greece ', 'officially the Hellenic Republic, is a country in Southeast Europe, situated on the southern tip of the Balkan peninsula', '2023-07-26', '2023-08-05', 138, '18bb3235-8d83-40e3-80f5-a222eaf30b67.jpg'),
(62, 'Istanbul Türkiye', 'Over the centuries, many cultures have added their mark to Istanbul. Today, you can experience those influences firsthand by exploring its mahalles (neighborhoods)', '2023-08-19', '2023-08-29', 347, 'daea17ed-2a38-4a7a-a0ac-977c74a21f09.jpg'),
(63, 'United Kingdom', 'Discover a country filled with epic landscapes, fairy-tales castles and vibrant modern cities bursting with unforgettable experiences to share. Whether it’s gazing at the London skyline from the top of iconic St Paul’s and sipping the finest single malt w', '2023-08-09', '2023-08-23', 549, '3c4b0c0c-4dfa-483e-860e-c4f5cc07c90f.jpg'),
(64, 'Austria', 'As home to majestic mountains, opulent palaces, and high culture, Austria\'s attractions are classically sumptuous and enduring. But beyond the waltzes, the strudels, the alpine summits, and Habsburg architecture, its modern cities are proof of just how ea', '2023-09-03', '2023-09-24', 1500, 'f4be0317-494e-4c91-b065-4f5372cdbf9c.jpg'),
(65, 'United Arab Emirates', 'Nomadic tribal heritage and modern society co-exist in the UAE, a federation of seven emirates at the southeastern edge of the Arabian Peninsula. Look beyond the desert that consumes four-fifths of its area and you\'ll find UAE capital Abu Dhabi, an oil-ri', '2023-08-16', '2023-08-30', 2534, '64ce72df-b04c-4237-a8b9-90af2b1f06ed.jpg'),
(66, 'Germany', 'From the fairy-tale castles and medieval villages of Bavaria to the Rhine Valley\'s UNESCO-listed landscapes and the storied monuments of Berlin, Germany has many faces. Steeped in history, cities like Cologne, Frankfurt, and Hamburg are also among the coo', '2023-09-03', '2023-09-21', 1467, 'e7f37837-c144-4ce6-9df1-97522eeca221.jpg'),
(67, 'France', 'There\'s much more to France than Paris—from the fairy-tale châteaux of the Loire Valley to the lavender fields of Provence, and the French Riviera\'s celebrity-studded beaches. World-famous gastronomy and fine wines provide the perfect complement to the co', '2023-08-03', '2023-08-31', 2467, '1c34765c-3fbe-4e39-a7ed-afbddbcce505.jpg'),
(68, 'Switzerland', 'Tiny, multilingual Switzerland packs a lot into its landlocked borders: glittering lakes, sky-high peaks, postcard-perfect villages, world-class museums. Get a taste of it all with the Grand Tour, a 1,000-mile route that takes you to the medieval old city', '2023-08-15', '2023-08-22', 5736, 'd9c3ff43-d081-4bcd-9414-d82e95b290ec.jpg'),
(69, 'New York City', 'In New York City, things move fast, and there’s room for everyone (even if it’s a small studio apartment). There’s more to explore beyond Central Park—try the best pizza in the U.S. (sorry, Chicago), or authentic Cuban cuisine. Visit world-class galleries', '2023-08-27', '2023-09-27', 4935, 'a4eebb4c-c2f9-4d9a-8a2a-9a5a363f0404.jpg'),
(70, 'Thailand', 'The lush jungles of Thailand promise adventure, while the serene beaches are the perfect place to splash in the sun. The Similan Islands feature some of the best dive sites in the world, where barracuda dart amid coral reefs and rock formations. Party in ', '2023-08-17', '2023-09-07', 1734, '147c1463-60e0-4044-a5e9-3e82e428f721.jpg'),
(71, 'Brazil', 'The wealth of flora and fauna and opportunities to observe them are unparalleled in the Amazon. Riverboats ply the waters of this fascinating wilderness, home to pink river dolphins, clamorous howler monkeys and raucous toucans. Photograph your adventure,', '2023-08-01', '2023-08-08', 3491, '0044358d-41d3-4880-a5a1-813f3afab0d6.jpg'),
(72, 'Maldives', 'Want to be the envy of all your friends? Just casually drop \"I’m vacationing in the Maldives\" into conversation, preferably in the dead of winter. Nothing screams \"paradise\" quite like the Maldives, a 26-atoll chain of islands with powdery beaches, turquo', '2023-08-09', '2023-08-27', 479, '91e3b757-c674-42de-a8a5-6e5b69527264.jpg'),
(73, 'South Africa', 'From the verdant Garden Route to the sub-tropical coast of KwaZulu-Natal, South Africa’s landscapes are as diverse as its attractions. There\'s something for everyone, whether you want to sip sauvignon blanc in Stellenbosch, explore Johannesburg, or spot t', '2023-08-05', '2023-08-19', 7864, '9fa540bb-2f0f-4d92-b3d9-32b4fa87f6f0.jpg'),
(74, 'Portugal', 'Portugal’s Mediterranean charm is most prominent on the golden beaches of the Algarve; in the wilderness of the Azores islands; among the vineyards of Douro Valley; and on the cobbled streets of Lisbon and Porto, where old-world culture meets cosmopolitan', '2023-08-31', '2023-09-11', 567, '64da8128-45ac-46b4-9439-17e5fd9c3f0c.jpg'),
(75, 'Spain', 'From sun-drenched archipelagos and bustling urban cities to snowcapped mountains and semi-arid deserts, Spain epitomizes geographical diversity. As the meeting point of the Atlantic Ocean and Mediterranean Sea, this vast country offers some of Europe’s mo', '2023-08-13', '2023-08-31', 965, '825c0c7b-9884-4cab-9bcc-8b7507aedb1e.jpg'),
(76, 'Miami', 'iami officially the City of Miami, is a coastal metropolis and the seat of Miami-Dade County in South Florida. With a population of 442,241 as of the 2020', '2023-08-15', '2023-08-23', 6443, '8f511904-a279-4498-a648-10483794239c.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(100) NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(34, 'david', 'amagid', 'Dydyd289@gmail.com', 'Ddavid!2@', 'user'),
(35, 'hadar', 'amagid', 'hachanuka1234@gmail.com', 'Aa123456@', 'user'),
(36, 'dani', 'levi', 'danilevi@gmail.com', 'Ddani12345@', 'user'),
(37, 'nati', 'ama', 'nati@gmail.com', 'Nnati1234@', 'user'),
(38, 'shira', 'hucherman', 'shira@gmail.com', 'Sshira12!', 'user'),
(39, 'naftali', 'amagid', 'nafnaf@gmail.com', 'Nafnaf12@', 'admin'),
(40, 'shani', 'zon', 'shani@gmail.com', 'Sshani12@', 'user'),
(41, 'shani', 'horvitch', 'shani12@gmail.com', 'Sshani12!', 'user'),
(42, 'shimona', 'levi', 'shimon@gmail.com', 'Sshimon12@', 'user'),
(43, 'shlomo', 'meir', 'shlomomeir@gmail.com', 'Sshlomo12!!', 'user'),
(44, 'shmuel', 'yaakobi', 'shmouel@gmail.com', 'Sshmouel12!', 'user'),
(45, 'shimi', 'shimony', 'shishi@gmail.com', 'Shishi12!', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`,`tripId`),
  ADD KEY `tripId` (`tripId`);

--
-- Indexes for table `trip`
--
ALTER TABLE `trip`
  ADD PRIMARY KEY (`TripId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `trip`
--
ALTER TABLE `trip`
  MODIFY `TripId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`tripId`) REFERENCES `trip` (`TripId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
