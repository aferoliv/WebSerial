let titr = {
  data_array: [0],
  curva: [0],
  tempo: [0],
};
let data_linha = [0, 0, 0];
let canal = [0, 0, 0];
var transito = 1;
const captura = document.getElementById("captura_dados");
const sair_leitura = document.getElementById("sair");
document.getElementById("buttonVolume").addEventListener("click", aliquota());

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
      const linha = text.split("b'");
      let data_linha = linha;

      canal = parseFloat(data_linha[1]);
      //canal = parseFloat(data_linha[0]);
      //let canal[1] = parseFloat(data_linha[1]);
      //let canal[2] = parseFloat(data_linha[2]);

      document.getElementById("dataLog").value += data_linha;
      // WebTransportBidirectionalStream.envio;
      console.log(data_linha.length, data_linha, "canal", canal);
      if (data_linha.length == 3) {
        temp++;
        titr.tempo.push(temp);
        titr.data_array.push(canal);
        cinGrafico.data.labels = titr.tempo;
        //
        console.log("dentro", titr.data_array);
        //
        cinGrafico.data.datasets[0].backgroundColor = "rgba(25, 9, 132, 1)";
        cinGrafico.data.datasets[0].data = titr.data_array;
        //cinGrafico.data.datasets[1].data = titr.data_array[1];
        //cinGrafico.data.datasets[2].data = titr.data_array;
        cinGrafico.update();
      }

      //if (data_linha.length == 3) {}
      //cria um contador para o eixo x

      //
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log("finally");
    reader.releaseLock();
  }
});

captura.addEventListener("click", function () {
  titr.curva.push(titr.data_linha);
  const file = document.getElementById("input").value;
  document.getElementById("dataTitr").value += data_linha;
  console.log("saveFile", titr.curva);
  console.log(file);
});
sair_leitura.addEventListener("click", function () {
  transito = 0;
  console.log("sair", transito);
});
function aliquota() {
  console.log("dentro aliquota");
  volume = document.getElementById("inputVolume").value;
  //document.getElementById("testeVolume").innerHTML = volume;
  console.log(volume);
}
