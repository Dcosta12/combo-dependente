<?php

require("config.php");

$retorno = array();

if($_GET['acao'] == 'pais'){
	$sql = $pdo->prepare("SELECT * FROM pais");
	$sql->execute();	
	$n = 0;
	$retorno['qtd'] = $sql->rowCount();
	while($ln = $sql->fetchObject()){
		$retorno['pais'][$n] = $ln->pais;
		$retorno['id'][$n] 	 = $ln->id;
		$n++;
	}	
}

if($_GET['acao'] == 'provincia'){
	$id = $_GET['id'];
	$sql = $pdo->prepare("SELECT * FROM provincia WHERE id_pais = :id");
	$sql->bindValue(":id", $id, PDO::PARAM_INT);
	$sql->execute();
	$n = 0;
	$retorno['qtd'] = $sql->rowCount();

	while($ln = $sql->fetchObject()){
		$retorno['provincia'][$n] = $ln->provincia;
		$retorno['id'][$n] 	   = $ln->id;
		$n++;
	}	
}

if($_GET['acao'] == 'municipio'){
	$id = $_GET['id'];
	$sql = $pdo->prepare("SELECT * FROM municipio WHERE id_provincia = :id");
	$sql->bindValue(":id", $id, PDO::PARAM_INT);
	$sql->execute();
	$n = 0;
	$retorno['qtd'] = $sql->rowCount();

	while($ln = $sql->fetchObject()){
		$retorno['municipio'][$n] = $ln->municipio;
		$retorno['id'][$n] 	   = $ln->id;
		$n++;
	}	
}
if($_GET['acao'] == 'comuna'){
	$id = $_GET['id'];
	$sql = $pdo->prepare("SELECT * FROM comuna WHERE id_municipio = :id");
	$sql->bindValue(":id", $id, PDO::PARAM_INT);
	$sql->execute();
	$n = 0;
	$retorno['qtd'] = $sql->rowCount();

	while($ln = $sql->fetchObject()){
		$retorno['comuna'][$n] = $ln->comuna;
		$retorno['id'][$n] 	   = $ln->id;
		$n++;
	}	
}

die(json_encode($retorno));