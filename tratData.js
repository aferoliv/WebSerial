function serialData(text) {
  //console.log(text, textDecoder);
  const linha = text.split("b'");
  let data_linha = linha;
  canal = parseFloat(data_linha[0]); //
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
    temp = titr.tempo[titr.tempo.length] + 1;
    titr.tempo.push(temp); //acrescenta a contagem de elementos
    titr.data_array.push(data_linha); // transfere a string da Serial para array
    titr.data_grafico.push(canal); // acrescenta a primeira coluna no vetor data_grafico
    cinGrafico.data.labels = titr.tempo; // eixo X
    cinGrafico.data.datasets[0].backgroundColor = "rgba(25, 9, 132, 1)";
    cinGrafico.data.datasets[0].data = titr.data_grafico; // eixo Y serie 1

    cinGrafico.update(); //atualiza o gráfico
  }

  //if (data_linha.length == 3) {}
  //cria um contador para o eixo x

  //
}

function arrayTitr() {
  pontos++;
  volume += parseFloat(document.getElementById("inputVolume").value);
  titr.curva.push(parseFloat(data_linha[0]));
  console.log(data_linha[0], parseFloat(data_linha[0]), titr.curva);
  if (volume == 0) {
    volume = 100;
  }
  volumetotal.push(volume);
  const nome = document.getElementById("input").value;
  //
  document.getElementById("dataTitr").value += pontos;
  document.getElementById("dataTitr").value += "\t";
  document.getElementById("dataTitr").value += volume;
  document.getElementById("dataTitr").value += "\t";
  document.getElementById("dataTitr").value +=
    titr.data_array[titr.data_array.length - 1];
  document.getElementById("dataTitr").value += "\n";
  //
  //
  //
  titGrafico.data.labels = titr.tempo; // eixo X
  titGrafico.data.datasets[0].backgroundColor = "rgba(25, 9, 132, 1)";
  titGrafico.data.datasets[0].data = titr.curva; // eixo Y serie 1

  titGrafico.update(); //atualiza o gráfico
}