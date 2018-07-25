-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 25-Jul-2018 às 04:04
-- Versão do servidor: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sampledb`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `activities`
--

CREATE TABLE IF NOT EXISTS `activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `points` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `activities`
--

INSERT INTO `activities` (`id`, `name`, `description`, `points`, `active`) VALUES
(2, 'Caçando moscas lindas', 'Você vai ter que fazer um monte de coisa', 20, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `ipslocked`
--

CREATE TABLE IF NOT EXISTS `ipslocked` (
  `ipaddress` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `lastLockedTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ipaddress`),
  UNIQUE KEY `ipaddress_UNIQUE` (`ipaddress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `profiles`
--

CREATE TABLE IF NOT EXISTS `profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `profiles`
--

INSERT INTO `profiles` (`id`, `name`) VALUES
(1, 'Estudante'),
(2, 'Professor');

-- --------------------------------------------------------

--
-- Estrutura da tabela `schools`
--

CREATE TABLE IF NOT EXISTS `schools` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `city_id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL,
  `points` int(10) NOT NULL,
  `token` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `num_students` int(11) NOT NULL,
  `num_teachers` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=16 ;

--
-- Extraindo dados da tabela `schools`
--

INSERT INTO `schools` (`id`, `name`, `city_id`, `state_id`, `points`, `token`, `num_students`, `num_teachers`) VALUES
(1, 'Escola das Pitombas', 1, 2, 50, 'pitombeira', 1, 1),
(2, 'Escola Estadual Bigornas Místicas', 2, 3, 40, 'arara', 1, 0),
(3, 'Escola dos Raios Ultravioletas', 2, 2, 120, 'violeta', 1, 0),
(4, 'Escola Municipal Água Boa dos Milagres ', 1, 1, 20, 'aguinha rasa', 0, 0),
(5, 'escola vincente sabugosa', 1, 11, 0, 'sabugo', 0, 0),
(6, 'Escola dos Jumentos do Sertão', 1, 5, 0, 'null', 1, 1),
(7, 'Jubileu de Ouro', 1, 6, 0, 'ouro', 0, 0),
(8, 'Miralogia Federal', 1, 2, 0, 'null', 0, 0),
(14, 'Recife de Corais', 1, 1, 200, 'alem', 2, 0),
(15, 'Escola de Casa Forte', 1, 7, 0, 'null', 0, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `states`
--

CREATE TABLE IF NOT EXISTS `states` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uf` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=28 ;

--
-- Extraindo dados da tabela `states`
--

INSERT INTO `states` (`id`, `uf`, `name`) VALUES
(1, 'AC', 'Acre'),
(2, 'AL', 'Alagoas'),
(3, 'AM', 'Amazonas'),
(4, 'AP', 'Amapá'),
(5, 'BA', 'Bahia'),
(6, 'CE', 'Ceará'),
(7, 'DF', 'Distrito Federal'),
(8, 'ES', 'Espírito Santo'),
(9, 'GO', 'Goiás'),
(10, 'MA', 'Maranhão'),
(11, 'MG', 'Minas Gerais'),
(12, 'MS', 'Mato Grosso do Sul'),
(13, 'MT', 'Mato Grosso'),
(14, 'PA', 'Pará'),
(15, 'PB', 'Paraíba'),
(16, 'PE', 'Pernambuco'),
(17, 'PI', 'Piauí'),
(18, 'PR', 'Paraná'),
(19, 'RJ', 'Rio de Janeiro'),
(20, 'RN', 'Rio Grande do Norte'),
(21, 'RO', 'Rondônia'),
(22, 'RR', 'Roraima'),
(23, 'RS', 'Rio Grande do Sul'),
(24, 'SC', 'Santa Catarina'),
(25, 'SE', 'Sergipe'),
(26, 'SP', 'São Paulo'),
(27, 'TO', 'Tocantins');

-- --------------------------------------------------------

--
-- Estrutura da tabela `students`
--

CREATE TABLE IF NOT EXISTS `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `birth` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `cpf` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `school_id` int(10) NOT NULL,
  `token` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `year` int(10) NOT NULL,
  `name_family` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `cpf_family` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `nc_celpe` int(10) NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `points` int(11) NOT NULL,
  `current_act` int(11) NOT NULL,
  `finished_act` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=12 ;

--
-- Extraindo dados da tabela `students`
--

INSERT INTO `students` (`id`, `name`, `address`, `birth`, `phone`, `cpf`, `school_id`, `token`, `year`, `name_family`, `cpf_family`, `nc_celpe`, `email`, `password`, `points`, `current_act`, `finished_act`) VALUES
(5, 'george h. weasley', 'a toca', '05/09/1990', '111111', '222222', 3, 'violeta', 1, 'molly', '4444', 331, 'george', '123', 120, 2, 2),
(6, 'fred henrique weasley', 'a toca', '18/07/1986', '11111', '2222233', 2, 'arara', 3, 'arthur', '434343432', 231120983, 'fred', '123', 40, 2, 2),
(8, 'jubileu', 'avenida das palmas', '12/03/1956', '1', '2', 1, 'pitombeira', 3, 'joca', '2', 343, 'jubi', '123', 0, 0, 0),
(9, 'juliano silva', 'travessia do monte', '05/09/1990', '454645646', '45456564', 6, 'sabugo', 2, 'maria', '121321313', 2313213, 'juliano', '123', 0, 0, 0),
(10, 'arnaldo', 'a', '12/03/1956', '1', '2', 14, 'alem', 1, 'b', '2', 0, 'a', '123', 200, 0, 0),
(11, 'bruno', 'b', '12/03/1956', '1', '2', 14, 'alem', 1, 'a', '1', 9, 'b', '123', 0, 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `teachers`
--

CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `birth` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `cpf` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `school_id` int(10) NOT NULL,
  `subject` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=14 ;

--
-- Extraindo dados da tabela `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `address`, `birth`, `phone`, `cpf`, `school_id`, `subject`, `email`, `password`) VALUES
(11, 'pacov', 'Hochstraße', '12/03/1956', '4443', '2121', 1, 'bigu', 'paco', '123'),
(13, 'janio pereira', 'avacasa', '18/07/1986', '454665', '464645', 6, 'biologia', 'janio', '123');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `auth` tinyint(1) DEFAULT '0',
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=67 ;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `auth`, `type`) VALUES
(11, 'fabio zloccowick', 'fabs', '22', 1, 0),
(31, 'debs', 'de', '123', 1, 0),
(54, 'george h. weasley', 'george', '123', 1, 1),
(55, 'fred henrique weasley', 'fred', '123', 1, 1),
(56, 'pacov', 'paco', '123', 1, 2),
(62, 'jubileu', 'jubi', '123', 1, 1),
(63, 'janio pereira', 'janio', '123', 0, 2),
(64, 'juliano silva', 'juliano', '123', 1, 1),
(65, 'arnaldo', 'arns', '123', 1, 1),
(66, 'bruno', 'bru', '123', 1, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
