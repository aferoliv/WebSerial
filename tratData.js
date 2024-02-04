function serialData(text) {
  //console.log(text, textDecoder);
  console.log(text);
  const linha = text.split("b'");
  let data_linha = linha;

  //canal = parseFloat(data_linha[0]); //
  // array canal: converte vetor data_linha em float
  //
  /*data_linha.forEach((element) => {
      canal = parseFloat(data_linha[element]);
      console.log(typeof canal, data_linha.slice(","), typeof linha);
    });
    */
  aparelho = selectedDatabase.dataName;
  console.log(aparelho);
  if (aparelho == "arduino-gauge") {
    if (text.includes("alores")) {
      document.getElementById("dataLog").value += "\t \t dados \n";
      document.getElementById("dataTitr").value += "# \t volume \t dados \n";
    } else {
      document.getElementById("dataLog").value += data_linha;

      canal = parseFloat(data_linha);
      if (canal > 100000) {
        canal = 0;
      }
    }
  }
  if (aparelho == "arduino-reatorH2") {
    if (text.includes("niciando")) {
      document.getElementById("dataLog").value = "";
      document.getElementById("dataLog").value += "\t \t dados \n";
      document.getElementById("dataTitr").value += "# \t volume \t dados \n";
    } else {
      document.getElementById("dataLog").value += data_linha;
      sinal = data_linha.toString();
      fim_sub = sinal.indexOf(",");

      if (fim_sub > 0) {
        sub_canal = sinal.substring(0, fim_sub);
      } else {
        sub_canal = "0";
      }
    }
    canal = parseFloat(sub_canal);
  } else {
  }
  //
  //atualiza o gráfico principal
  //
  if (data_linha.length != 0) {
    temp = titr.tempo[titr.tempo.length - 1] + 1;
    titr.tempo.push(temp); //acrescenta a contagem de elementos
    titr.data_array.push(data_linha); // transfere a string da Serial para array
    titr.data_grafico.push(canal); // acrescenta a primeira coluna no vetor data_grafico
    cinGrafico.data.labels = titr.tempo; // eixo X
    cinGrafico.data.datasets[0].backgroundColor = "rgba(25, 9, 132, 1)";
    cinGrafico.data.datasets[0].data = titr.data_grafico; // eixo Y serie 1

    //console.log(titr.tempo, titr.data_array, titr.data_grafico);
    cinGrafico.update(); //atualiza o gráfico
  }

  //if (data_linha.length == 3) {}
  //cria um contador para o eixo x

  //
}

function titrationData() {
  //pontos++;
  ponto = document.getElementById("inputVolume").value;
  if (ponto == "") {
    ponto = 100;
  }
  if (typeof ponto == String) {
    volume += parseFloat(ponto);
  } else {
    volume += ponto;
  }
  if (aparelho == "arduino-gauge") {
    //titr.curva.push(parseFloat(data_linha[0]));

    dadoTit = titr.data_array[titr.data_array.length - 1];
    titr.curva.push(dadoTit);
    volumetotal.push(volume);
    console.log(ponto, typeof ponto, volume, typeof volume);
    //const nome = document.getElementById("input").value;
    //

    document.getElementById("dataTitr").value += volume;
    document.getElementById("dataTitr").value += ",";
    document.getElementById("dataTitr").value +=
      titr.data_array[titr.data_array.length - 1];
    document.getElementById("dataTitr").value += "\n";
    //
    //
    //
  } else {
    dadoTit = titr.data_array[titr.data_array.length - 1];
    titr.curva.push(dadoTit);
    volumetotal.push(volume);
    console.log(ponto, typeof ponto, volume, typeof volume);
    //const nome = document.getElementById("input").value;
    //

    document.getElementById("dataTitr").value += volume;
    document.getElementById("dataTitr").value += ",";
    document.getElementById("dataTitr").value +=
      titr.data_array[titr.data_array.length - 1];
    document.getElementById("dataTitr").value += "\n";
  }
  titGrafico.data.labels = titr.tempo; // eixo X
  titGrafico.data.datasets[0].backgroundColor = "rgba(25, 9, 132, 1)";
  titGrafico.data.datasets[0].data = titr.curva; // eixo Y serie 1

  titGrafico.update(); //atualiza o gráfico
}
