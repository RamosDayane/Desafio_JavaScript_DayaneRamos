
class Car {
  constructor(modelo, preco, alturacacamba, alturaveiculo, alturasolo, capacidadecarga, motor, potencia, volumecacamba, roda, imagem) {
    this.modelo = modelo;
    this.preco = preco;
    this.alturacacamba = alturacacamba;
    this.alturaveiculo = alturaveiculo;
    this.alturasolo = alturasolo;
    this.capacidadecarga = capacidadecarga;
    this.motor = motor;
    this.potencia = potencia;
    this.volumecacamba = volumecacamba;
    this.roda = roda;
    this.imagem = imagem;
  }
}

let carrosSelecionados = [];

function SetCarToCompare(checkbox, carro) {
  if (checkbox.checked) {
    if (carrosSelecionados.length >= 2) {
      alert("Você só pode comparar dois veículos por vez!");
      checkbox.checked = false;
      return;
    }
    carrosSelecionados.push(carro);
  } else {
    carrosSelecionados = carrosSelecionados.filter(c => c.modelo !== carro.modelo);
  }
}

function ShowCompare() {
  if (carrosSelecionados.length < 2) {
    alert("Selecione dois veículos para comparar.");
    return;
  }

  const compareDiv = document.getElementById("compare");
  if (compareDiv) compareDiv.style.display = "block";

  for (let i = 0; i < 2; i++) {
    const c = carrosSelecionados[i];

    document.getElementById(`compare_image_${i}`).innerHTML = `<img src="${c.imagem}" style="width:150px;">`;
    document.getElementById(`compare_modelo_${i}`).textContent = c.modelo;
    document.getElementById(`compare_alturacacamba_${i}`).textContent = c.alturacacamba + " mm";
    document.getElementById(`compare_alturaveiculo_${i}`).textContent = c.alturaveiculo + " mm";
    document.getElementById(`compare_alturasolo_${i}`).textContent = c.alturasolo + " mm";
    document.getElementById(`compare_capacidadecarga_${i}`).textContent = c.capacidadecarga + " Kg";
    document.getElementById(`compare_motor_${i}`).textContent = c.motor + "L";
    document.getElementById(`compare_potencia_${i}`).textContent = c.potencia + " cv";
    document.getElementById(`compare_volumecacamba_${i}`).textContent = c.volumecacamba + " L";
    document.getElementById(`compare_roda_${i}`).textContent = c.roda;
    document.getElementById(`compare_preco_${i}`).textContent = "R$ " + c.preco.toLocaleString("pt-BR");
  }
}

function HideCompare() {
  const compareDiv = document.getElementById("compare");
  if (compareDiv) compareDiv.style.display = "none";

  document.querySelectorAll(".checkbox").forEach(cb => (cb.checked = false));
  carrosSelecionados = [];
}
