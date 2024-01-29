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
input.addEventListener("click", function () {});
salvando.addEventListener("click", function () {
  texto=document.getElementById("input").value  
});

