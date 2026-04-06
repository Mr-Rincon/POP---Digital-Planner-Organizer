SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `pop` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `pop`;

CREATE TABLE `calendar` (
  `CalenID` int(5) NOT NULL,
  `EventTitle` varchar(25) NOT NULL,
  `Category` varchar(25) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `OwnerID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `contacts` (
  `ContactID` int(5) NOT NULL,
  `Name` varchar(25) NOT NULL,
  `Surname` varchar(25) NOT NULL,
  `Mobile` int(11) NOT NULL,
  `Phone` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Relationship` varchar(25) NOT NULL,
  `Postcode` varchar(11) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `OwnerID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `links` (
  `LinkID` int(5) NOT NULL,
  `Title` varchar(25) NOT NULL,
  `Link` varchar(255) NOT NULL,
  `Category` varchar(25) NOT NULL,
  `OwnerID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `notes` (
  `NoteID` int(5) NOT NULL,
  `Title` varchar(25) NOT NULL,
  `Category` varchar(25) NOT NULL,
  `Note` varchar(1000) NOT NULL,
  `CreateDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `OwnerID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `passwords` (
  `PassID` int(5) NOT NULL,
  `Title` varchar(25) NOT NULL,
  `User` varchar(25) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Link` varchar(255) NOT NULL,
  `OwnerID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `reminders` (
  `RemID` int(5) NOT NULL,
  `ItemID` int(5) NOT NULL,
  `NotifyDate` date NOT NULL,
  `OwnerID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `trash` (
  `TrashID` int(5) NOT NULL,
  `ItemID` int(5) NOT NULL,
  `TrashDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `OwnerID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(25) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `JoinDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Active` tinyint(1) NOT NULL DEFAULT 1,
  `UserType` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`UserID`, `Username`, `Email`, `Password`, `JoinDate`, `Active`, `UserType`) VALUES
(1, 'DiegoR', 'dr@gmail.com', '123456789', '2020-04-14 20:40:06', 1, 'admin');


ALTER TABLE `calendar`
  ADD PRIMARY KEY (`CalenID`),
  ADD KEY `calendar_ibfk_1` (`OwnerID`);

ALTER TABLE `contacts`
  ADD PRIMARY KEY (`ContactID`),
  ADD KEY `OwnerID` (`OwnerID`);

ALTER TABLE `links`
  ADD PRIMARY KEY (`LinkID`),
  ADD KEY `OwnerID` (`OwnerID`);

ALTER TABLE `notes`
  ADD PRIMARY KEY (`NoteID`),
  ADD KEY `OwnerID` (`OwnerID`);

ALTER TABLE `passwords`
  ADD PRIMARY KEY (`PassID`),
  ADD KEY `OwnerID` (`OwnerID`);

ALTER TABLE `reminders`
  ADD PRIMARY KEY (`RemID`),
  ADD KEY `OwnerID` (`OwnerID`);

ALTER TABLE `trash`
  ADD PRIMARY KEY (`TrashID`),
  ADD KEY `OwnerID` (`OwnerID`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);


ALTER TABLE `calendar`
  MODIFY `CalenID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `contacts`
  MODIFY `ContactID` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `links`
  MODIFY `LinkID` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `notes`
  MODIFY `NoteID` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `passwords`
  MODIFY `PassID` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `reminders`
  MODIFY `RemID` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `trash`
  MODIFY `TrashID` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `calendar`
  ADD CONSTRAINT `calendar_ibfk_1` FOREIGN KEY (`OwnerID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`OwnerID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `links`
  ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`OwnerID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`OwnerID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `passwords`
  ADD CONSTRAINT `passwords_ibfk_1` FOREIGN KEY (`OwnerID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `reminders`
  ADD CONSTRAINT `reminders_ibfk_1` FOREIGN KEY (`OwnerID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `trash`
  ADD CONSTRAINT `trash_ibfk_1` FOREIGN KEY (`OwnerID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
