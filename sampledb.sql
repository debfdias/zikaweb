-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 22-Jul-2018 às 20:30
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `schools`
--

INSERT INTO `schools` (`id`, `name`, `city_id`, `state_id`, `points`, `token`) VALUES
(1, 'Escola das Pitombas', 1, 2, 50, 'pitombeira'),
(2, 'Escola Estadual Bigornas Místicas', 2, 3, 100, 'arara'),
(3, 'Escola dos Raios Ultravioletas', 2, 2, 0, 'violeta'),
(4, 'Escola Municial Água Boa', 1, 1, 20, 'aguinha');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `students`
--

INSERT INTO `students` (`id`, `name`, `address`, `birth`, `phone`, `cpf`, `school_id`, `token`, `year`, `name_family`, `cpf_family`, `nc_celpe`, `email`, `password`) VALUES
(1, 'fred weasley', 'toca do beco', '03/04/1990', '78946123', '445646879', 2, 'vaca', 2, 'arthur weasley', '464611231313', 2235, 'fred', '123'),
(2, 'george weasley', 'travessa dante sfoggia, numero 1000', '18/07/1986', '51995174943', '465464', 1, 'pitombeira', 2, 'molly', '465464', 465, 'george', '123'),
(3, 'ron', 'a toca', '05/09/1990', '4', '45', 1, 'pitombeira', 2, 'molly', '1111', 31223, 'ron', '123');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Extraindo dados da tabela `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `address`, `birth`, `phone`, `cpf`, `school_id`, `subject`, `email`, `password`) VALUES
(1, 'Severo Snape', 'Hogwarts', '10/07/1960', '30445869', '123456789', 1, 'Poções', 'sev', '123'),
(2, 'papadopolous', 'eua', '12/03/1956', '232312', '232132434', 1, 'geo', 'papa', '123'),
(3, 'a', 'a', 'a', '1', '1', 2, 'opa', 'juju', '123'),
(4, 'a', 'a', '12/03/1956', '12', '12', 2, 'a', 'paulo', '123'),
(5, 'paco', 'van', '2', '1', '2', 1, 'matematica', 'paco', '123'),
(6, 'geraldo', 'ipsep', '18/07/1986', '45655', '5', 1, 'geografia', 'geo', '123'),
(7, 'tutuba', 'a', '12/03/1956', '2', '2', 3, 'agua', 'tutu', '123'),
(8, 'jon', 'inglaterra', '12/03/1956', '2', '2', 9, 'split', 'jon', '123'),
(9, 'jason', 'havai', '12/03/1956', '487', '09070662400', 4, 'transfiguracao', 'jason', '123');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=52 ;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `auth`, `type`) VALUES
(1, 'eric', 'eric', '123', 0, 1),
(11, 'fabio zlocc', 'fabs', '22', 1, 0),
(31, 'debs', 'debas', '123', 1, 0),
(38, 'rui', 'rui', '123', 1, 2),
(39, 'alvo', 'alvo', '123', 1, 2),
(41, 'papadopolous', 'papa', '123', 1, 2),
(42, 'george weasley', 'george', '123', 1, 1),
(43, 'vitorino pereira', 'vit', '123', 1, 2),
(44, 'a', 'juju', '123', 1, 2),
(45, 'a', 'paulo', '123', 1, 2),
(46, 'paco', 'paco', '123', 1, 2),
(47, 'geraldo', 'geo', '123', 1, 2),
(48, 'tutuba', 'tutu', '123', 1, 2),
(49, 'jon', 'jon', '123', 1, 2),
(50, 'jason', 'jason', '123', 1, 2),
(51, 'ron', 'ron', '123', 1, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
