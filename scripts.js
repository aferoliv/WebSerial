let titr = {
  data_array: [0],
  data_grafico: [0],
  data_titr: [0],
  curva: [0],
  tempo: [0],
};
let pontos = 0;
let data_linha = [0, 0, 0];
let canal = [0, 0, 0];
let volumetotal = [0];
var transito = 1;
let volume = 0;
const captura = document.getElementById("captura_dados");
const sair_leitura = document.getElementById("sair");

document.getElementById("connectButton").addEventListener("click", async () => {
  // Pergunta ao Usuário qual porta deseja abrir/conectar
  const port = await navigator.serial.requestPort();

  // Abre a Porta Selecionada com o Baud Rate de 9600bps
  await port.open({ baudRate: 9600 });

  // Lê os dados da Porta Serial
  const reader = port.readable.getReader();
  //var tempo = [];
  var temp = 0;

  try {
    while ((transito = 1)) {
      const { value, done } = await reader.read();
      // Interrompe a coleta de dados

      if (done) {
        // done = true significa que todo conteudo da porta serial foi lido
        break;
      }
      // Converte of format Uint8Array para string para adicionar ao elemento HTML.
      const textDecoder = new TextDecoder();
      const text = textDecoder.decode(value);
      arraySerial = serialData(text);
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log("finally");
    reader.releaseLock();
  }
});

captura_dados.addEventListener("click", function () {
  // salva o valor lido na Serial como novo arquivo Titulação
  arrayTitr = titrationData();
});
//volume = document.getElementById("buttonVolume").value;
salvando.addEventListener("click", function () {
  let nome = document.getElementById("filename").value;
  let texto_titr = document.getElementById("dataTitr").value;
  let texto_kin = document.getElementById("dataLog").value;

  let blob_t = new Blob([texto_titr], { type: "text/plain;charset=utf-8" });
  saveAs(blob_t, nome + "-titr.csv");
  let blob_k = new Blob([texto_kin], { type: "text/plain;charset=utf-8" });
  saveAs(blob_k, nome + "-kin.csv");
});
function padrao_sinal() {
  return [
    {
      id: "pHmetro-pH",
      dataName: "pH",
      systemDescription: "Esta é a Descrição do Sistema A.",
    },
    {
      id: "pHmetro-mV",
      dataName: "mV",
      systemDescription: "Esta é a Descrição do Sistema B.",
    },
    {
      id: "Dat_Metals",
      dataName: "Metals",
      systemDescription: "Esta é a Descrição do Sistema C.",
    },
    {
      id: "Dat_Biochem",
      dataName: "Biochemicals",
      systemDescription: "Esta é a Descrição do Sistema D.",
    },
    {
      id: "Dat_Pesticides",
      dataName: "Pesticides",
      systemDescription: "Esta é a Descrição do Sistema E.",
    },
  ];
}
function updateDropdown_Systems() {
  dropdownMenu = document.getElementById("dropdown_SystemsMenu");
  dropdownMenu.innerHTML = ""; //Limpa Lista de Opcoes Atuais

  //Este Loop Itera sobre cada elemento na variavel array_Systems
  array_Systems.forEach(({ id, systemName }) => {
    listItem = document.createElement("li");
    listItem.classList.add("dropdown-item");
    listItem.id = id;
    listItem.textContent = systemName;
    listItem.addEventListener("click", changeDropdown_Systems);
    dropdownMenu.appendChild(listItem);
  });
}
// ------
// Interage com elementos da tabela Parameters System

function updateDropdown_Database() {
  dropdownMenu = document.getElementById("dropdown_DatabaseMenu");
  dropdownMenu.innerHTML = ""; //Limpa Lista de Opcoes Atuais

  //Este Loop Itera sobre cada elemento na variavel array_Systems
  array_Database.forEach(({ id, dataName }) => {
    listItem = document.createElement("li");
    listItem.classList.add("dropdown-item");
    listItem.id = id;
    listItem.textContent = dataName;
    listItem.addEventListener("click", changeDropdown_Database);
    dropdownMenu.appendChild(listItem);
  });
}
