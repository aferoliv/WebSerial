function serialData(text) {
  //console.log(text, textDecoder);
  //console.log(text);
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
  //console.log(aparelho);
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
      fim_sub = sinal.indexOf(","); //índice da posição da vírgula

      if (fim_sub > 0) {
        sub_canal = sinal.substring(0, fim_sub);
      } else {
        sub_canal = "0";
      }
    }
    canal = parseFloat(sub_canal); //valor numérico do sinal
  } 
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
  else {
  }
  //
  //atualiza o gráfico principal
  //
  if (data_linha.length != 0) {
    temp = titr.tempo[titr.tempo.length - 1] + 1; // contagem dos pontos
    titr.tempo.push(temp); //acrescenta a contagem de elementos
    largura = parseInt(document.getElementById("tamanho_janela").value); // coleta largura da janela do gráfico - default: 100
    titr.data_kin.push(canal); // acrescenta a primeira coluna no vetor data_grafico
    if (isNaN(largura)) {
      largura = 1000;
    }
    if (temp > largura) {
      titr.data_grafico = titr.data_kin.slice(temp - largura, temp);
      titr.data_tempo = titr.tempo.slice(temp - largura, temp);
    } else {
      titr.data_grafico = titr.data_kin;
      titr.data_tempo = titr.tempo;
    }
    titr.data_array.push(data_linha); // transfere a string da Serial para array
    cinGrafico.data.labels = titr.data_tempo; // eixo X
    cinGrafico.data.datasets[0].backgroundColor = "rgba(25, 9, 132, 1)";
    cinGrafico.data.datasets[0].data = titr.data_grafico; // eixo Y serie 1

    //console.log(titr.tempo, titr.data_array, titr.data_grafico);
    cinGrafico.update(); //atualiza o gráfico
  }

  //if (data_linha.length == 3) {}
  //cria um contador para o eixo x

  //
}

function titrationData(aparelho) {
  //pontos++;
  aparelho = selectedDatabase.dataName;
  ponto = document.getElementById("inputVolume").value;
  if (ponto == "") {
    ponto = 100;
  }
  if (typeof ponto == String) {
    volume += parseFloat(ponto);
  } else {
    volume += ponto;
  }
  if (aparelho == "arduino-reatorH2") {
    //titr.curva.push(parseFloat(data_linha[0]));

    dadoTit = titr.data_array[titr.data_array.length - 1];
    //
    //
    fim_sub = dadoTit.indexOf(","); //índice da posição da vírgula
    if (fim_sub > 0) {
      sub_canal = dadoTit.substring(0, fim_sub);
    } else {
      sub_canal = "0";
    }
    canal = parseFloat(sub_canal); //valor numérico do sinal
    //
    titr.curva.push(canal);
    volumetotal.push(volume);

    //const nome = document.getElementById("input").value;
    //
    document.getElementById("dataTitr").value += volume;
    document.getElementById("dataTitr").value += " , ";
    document.getElementById("dataTitr").value += dadoTit;
    document.getElementById("dataTitr").value += "\n";

    titGrafico.data.labels = titr.volumetotal; // eixo X
    titGrafico.data.datasets[0].backgroundColor = "rgba(25, 9, 132, 1)";
    titGrafico.data.datasets[0].data = titr.curva; // eixo Y serie 1

    console.log(aparelho, volume, canal);
    console.log(titr.volumetotal, titr.curva);

    titGrafico.update(); //atualiza o gráfico
  }
  if (aparelho == "arduino-gauge") {
    //titr.curva.push(parseFloat(data_linha[0]));

    dadoTit = titr.data_array[titr.data_array.length - 1];
    titr.curva.push(dadoTit);
    volumetotal.push(volume);
    //console.log(ponto, typeof ponto, volume, typeof volume);
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
  }
  titGrafico.data.labels = titr.tempo; // eixo X
  titGrafico.data.datasets[0].backgroundColor = "rgba(25, 9, 132, 1)";
  titGrafico.data.datasets[0].data = titr.curva; // eixo Y serie 1

  titGrafico.update(); //atualiza o gráfico
}
