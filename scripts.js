let titr = {
  data_array: [0],
  data_grafico:[0],
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
      //console.log(text, textDecoder);

      const linha = text.split("b'");
      let data_linha = linha;
      canal = parseFloat(data_linha[0]);      //
      // array canal: converte vetor data_linha em float
      //
      /*data_linha.forEach((element) => {
        canal = parseFloat(data_linha[element]);
        console.log(typeof canal, data_linha.slice(","), typeof linha);
      });
      */
      if (text.includes("niciando")) {
        document.getElementById("dataLog").value += "\t \t dados \n";
        document.getElementById("dataTitr").value += "# \t volume \t dados \n";
      } else {
        document.getElementById("dataLog").value += data_linha;
      }
      // WebTransportBidirectionalStream.envio;
      //  
      //atualiza o gráfico principal
      //
      if (data_linha.length == 3) {
        temp++;
        titr.tempo.push(temp);                  //acrescenta a contagem de elementos
        titr.data_array.push(data_linha);       // transfere a string da Serial para array   
        titr.data_grafico.push(canal);          // acrescenta a primeira coluna no vetor data_grafico 
        cinGrafico.data.labels = titr.tempo;    // eixo X
        cinGrafico.data.datasets[0].backgroundColor = "rgba(25, 9, 132, 1)";
        cinGrafico.data.datasets[0].data = canal[0];  // eixo Y serie 1
        
        cinGrafico.update();          //atualiza o gráfico
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
  pontos++;
  volume += parseFloat(document.getElementById("inputVolume").value);
  if (volume == 0) {
    volume = 100;
  }
  volumetotal.push(volume);
  const nome = document.getElementById("input").value;
  document.getElementById("dataTitr").value += pontos;
  document.getElementById("dataTitr").value += "\t";
  document.getElementById("dataTitr").value += volume;
  document.getElementById("dataTitr").value += "\t";
  document.getElementById("dataTitr").value +=
    titr.data_array[titr.data_array.length - 1];
  document.getElementById("dataTitr").value += "\n";

  console.log("saveFile", nome);
});
volume = document.getElementById("buttonVolume").value;

function aliquota() {
  console.log("dentro aliquota");
  volume = document.getElementById("inputVolume").value;
  //document.getElementById("testeVolume").innerHTML = volume;
  console.log(volume);
}
