const directionAxisDetect = (
  xArr = [],
  yArr = [],
  zArr = [],
  selected = ""
) => {
  /*declaramos las variables
 xMovement es la variable que guarda si es positivo o negativo,
 mainAxis guarda el eje principal del movimiento, 
 mainMovement guarda el movimiento principal, los general guardan las variables
 para renderizar en todos los ejes cuando se musetran los angulos, tambien una 
 variable side para el lado derecho o izquierdo si es el caso*/

  let xMovement,
    yMovement,
    zMovement,
    xGeneralMovement,
    yGeneralMovement,
    zGeneralMovement,
    mainAxis,
    mainMovement,
    mainMovementValue,
    side,
    axisMovement,
    planeMovement,
    xGeneralAxis,
    yGeneralAxis,
    zGeneralAxis,
    xGeneralPlane,
    yGeneralPlane,
    zGeneralPlane;

  /*---VALORES MAXIMOS Y MINIMOS DE CADA EJE---declaramos un obj que encuentra los valores maximos y minimos de 
  los arreglos de los angulos en funcion del tiempo, que vienen por parametros
  desde la carga del csv, obviamente siempre el mayor es el positivo*/
  const minMaxObj = {
    xMax: parseInt(Math.max.apply(null, xArr)),
    xMin: parseInt(Math.min.apply(null, xArr)),
    yMax: parseInt(Math.max.apply(null, yArr)),
    yMin: parseInt(Math.min.apply(null, yArr)),
    zMax: parseInt(Math.max.apply(null, zArr)),
    zMin: parseInt(Math.min.apply(null, zArr)),
  };

  const { xMax, xMin, yMax, yMin, zMax, zMin } = minMaxObj;

  const xMaxAbs = Math.abs(xMax);
  const xMinAbs = Math.abs(xMin);
  const yMaxAbs = Math.abs(yMax);
  const yMinAbs = Math.abs(yMin);
  const zMaxAbs = Math.abs(zMax);
  const zMinAbs = Math.abs(zMin);

  const xTotal = xMaxAbs + xMinAbs;
  const yTotal = yMaxAbs + yMinAbs;
  const zTotal = zMaxAbs + zMinAbs;

  /*---VALOR MAXIMO DE CADA EJE SEGUN SU VALOR ABSOLUTO---declaramos un condicional que compara los valores absolutos
  de los maximos y minimos de cada arreglo, si el valor mayor es 
  el positivo, el movement de cada eje se establece en 1, sino en cero.
  esto es fundamental para encontrar el movimiento principal*/

  if (Math.abs(xMax) > Math.abs(xMin)) {
    xMovement = 1;
  } else {
    xMovement = 0;
  }
  if (Math.abs(yMax) > Math.abs(yMin)) {
    yMovement = 1;
  } else {
    yMovement = 0;
  }
  if (Math.abs(zMax) > Math.abs(zMin)) {
    zMovement = 1;
  } else {
    zMovement = 0;
  }

  /*---EJE PRINCIPAL DE MOVIMIENTO--- declaramos un condicional para encontrar el eje principal de movimiento
  comparando los maximos positivos y negativos del mismo eje y de los ejes entre
  si, el mayor valor es el eje principal*/

  if (xTotal > yTotal && xTotal > zTotal) {
    mainAxis = "x";
  } else if (yTotal > xTotal && yTotal > (Math.abs(zMax) || Math.abs(zMin))) {
    mainAxis = "y";
  } else if (zTotal > xTotal && zTotal > yTotal) {
    mainAxis = "z";
  }

  /*MOVIMIENTO DEFINITIVO: sabiendo el eje principal y el sentido, y obviamente como 
  esta colocado el dispositivo, declaramos un condicional comparando
  estas variables y estableciendo el movimiento definitivo*/

  /*-----------------------COLUMNA CERVICAL Y DORSOLUMBAR  --- 
  
  COLUMNA CERVICAL Dispositivo: ubicacion parte posterior de la cabeza
  y sentido "y" hacia cef??lico */
  /*COLUMNA DORSOLUMBAR Dispositivo: l??nea media, parte posterior, por debajo de C7
  y sentido "y" hacia cef??lico */

  if (
    //si el eje principal es x
    mainAxis === "x" &&
    //y el sentido es negativo
    xMovement === 0 &&
    // y la seleccion es cervical o dorsolumbar:
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    //entonces el movimiento principal es de flexion
    mainMovement = "flexi??n";
    //el eje es laterolateral
    axisMovement = "laterolateral";
    //el plano es sagital
    planeMovement = "sagital";

    /*y ahora un definiciones y condicionales para el renderizado del 
    analisis de todos los ejes*/

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n izquierda";
      yGeneralAxis = "c??falocaudal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n derecha";
      yGeneralAxis = "c??falocaudal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "inclinaci??n derecha";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    } else if (zMovement === 1) {
      zGeneralMovement = "inclinaci??n izquierda";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "extensi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n izquierda";
      yGeneralAxis = "c??falocaudal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n derecha";
      yGeneralAxis = "c??falocaudal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "inclinaci??n derecha";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    } else if (zMovement === 1) {
      zGeneralMovement = "inclinaci??n izquierda";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 0 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "rotaci??n derecha";
    side = "derecha";
    axisMovement = "c??falocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "inclinaci??n derecha";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    } else if (zMovement === 1) {
      zGeneralMovement = "inclinaci??n izquierda";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "rotaci??n izquierda";
    side = "izquierda";
    axisMovement = "c??falocaudal";
    planeMovement = "transversal";
    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "inclinaci??n derecha";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    } else if (zMovement === 1) {
      zGeneralMovement = "inclinaci??n izquierda";
      zGeneralAxis = "anteroposterior";
      zGeneralPlane = "frontal";
    }
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "inclinaci??n derecha";

    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n izquierda";
      yGeneralAxis = "c??falocaudal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n derecha";
      yGeneralAxis = "c??falocaudal";
      yGeneralPlane = "transversal";
    }

    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    (selected === "cervical" || selected === "dorsolumbar")
  ) {
    mainMovement = "inclinaci??n izquierda";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n izquierda";
      yGeneralAxis = "c??falocaudal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n derecha";
      yGeneralAxis = "c??falocaudal";
      yGeneralPlane = "transversal";
    }

    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  }

  /**-----------FINALIZA COLUMNA CERVICAL Y DORSOLUMBAR  -------*/

  /*------------------MIEMBROS SUPERIORES ---------------*/
  /*---BRAZO Derecho--- Dispositivo: parte lateral media del brazo
  y sentido "y" hacia cef??lico */
  if (mainAxis === "x" && xMovement === 0 && selected === "brazo derecho") {
    mainMovement = "abducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "aducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  }
  if (mainAxis === "y" && yMovement === 0 && selected === "brazo derecho") {
    mainMovement = "rotaci??n externa";
    axisMovement = "c??falocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "rotaci??n interna";
    axisMovement = "c??falocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "extensi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    selected === "brazo derecho"
  ) {
    mainMovement = "flexi??n";

    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  }

  /*---BRAZO izquierdo--- Dispositivo: parte lateral media del brazo
  y sentido "y" hacia cef??lico */
  if (mainAxis === "x" && xMovement === 0 && selected === "brazo izquierdo") {
    mainMovement = "abducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "brazo izquierdo"
  ) {
    mainMovement = "aducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  }
  if (mainAxis === "y" && yMovement === 0 && selected === "brazo izquierdo") {
    mainMovement = "rotaci??n interna";
    axisMovement = "c??falocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "brazo izquierdo"
  ) {
    mainMovement = "rotaci??n externa";
    axisMovement = "c??falocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    selected === "brazo izquierdo"
  ) {
    mainMovement = "flexi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    selected === "brazo izquierdo"
  ) {
    mainMovement = "extensi??n";

    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  }

  /*---ANTEBRAZO derecho--- Dispositivo: parte anterior del
  antebrazo (o en la mano?)y sentido "y" hacia cef??lico, partimos de la posicion intermedia
  con el pulgar hacia arriba */

  if (mainAxis === "x" && xMovement === 0 && selected === "antebrazo derecho") {
    mainMovement = "flexi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
    if (yMovement === 0) {
      yGeneralMovement = "supinaci??n";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "pronaci??n";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "rotaci??n xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotaci??n inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "antebrazo derecho"
  ) {
    mainMovement = "extensi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
    if (yMovement === 0) {
      yGeneralMovement = "supinaci??n";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "pronaci??n";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "rotaci??n xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotaci??n inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 0 &&
    selected === "antebrazo derecho"
  ) {
    mainMovement = "supinacion";
    axisMovement = "longitudinal";
    planeMovement = "transversal";
    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extensi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;
    if (zMovement === 0) {
      zGeneralMovement = "rotaci??n xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotaci??n inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "antebrazo derecho"
  ) {
    mainMovement = "pronaci??n";
    axisMovement = "longitudinal";
    planeMovement = "transversal";
    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extensi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;
    if (zMovement === 0) {
      zGeneralMovement = "rotaci??n xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotaci??n inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  }
  /*ANTEBRAZO IZQUIERDO */

  if (
    mainAxis === "x" &&
    xMovement === 0 &&
    selected === "antebrazo izquierdo"
  ) {
    mainMovement = "flexi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "pronaci??n";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "supinaci??n";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "rotaci??n xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotaci??n inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "antebrazo izquierdo"
  ) {
    mainMovement = "extensi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
    if (yMovement === 0) {
      yGeneralMovement = "pronaci??n";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "supinaci??n";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "rotaci??n xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotaci??n inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 0 &&
    selected === "antebrazo izquierdo"
  ) {
    mainMovement = "pronaci??n";
    axisMovement = "longitudinal";
    planeMovement = "transversal";
    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extensi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;
    if (zMovement === 0) {
      zGeneralMovement = "rotaci??n xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotaci??n inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "antebrazo izquierdo"
  ) {
    mainMovement = "supinaci??n";
    axisMovement = "longitudinal";
    planeMovement = "transversal";
    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extensi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;
    if (zMovement === 0) {
      zGeneralMovement = "rotaci??n xterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "transversal del brazo";
    } else if (zMovement === 1) {
      zGeneralMovement = "rotaci??n inteterna del Brazo";
      zGeneralAxis = "longitudinal del brazo";
      zGeneralPlane = "longitudinal del brazo";
    }
  }

  /*MANO derecha, el dispositivo en la palma de la mano, con el sentido
  del eje "y" proximal */
  if (mainAxis === "x" && xMovement === 0 && selected === "mano derecha") {
    mainMovement = "flexi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "abducci??n";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    } else if (zMovement === 1) {
      zGeneralMovement = "aducci??n";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "mano derecha"
  ) {
    mainMovement = "extensi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "abducci??n";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    } else if (zMovement === 1) {
      zGeneralMovement = "aducci??n";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    }
  } else if (
    mainAxis === "z" &&
    xMovement === 0 &&
    selected === "mano derecha"
  ) {
    mainMovement = "abducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    xMovement === 1 &&
    selected === "mano derecha"
  ) {
    mainMovement = "aducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
  }
  /*MANO IZQUIERDA, el dispositivo en la palma de la mano, con el sentido
  del eje "y" proximal */
  if (mainAxis === "x" && xMovement === 0 && selected === "mano izquierda") {
    mainMovement = "flexi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "aducci??n";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    } else if (zMovement === 1) {
      zGeneralMovement = "abducci??n";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "mano izquierda"
  ) {
    mainMovement = "extensi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "aducci??n";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    } else if (zMovement === 1) {
      zGeneralMovement = "abducci??n";
      zGeneralAxis = "longitudinal";
      zGeneralPlane = "transversal";
    }
  } else if (
    mainAxis === "z" &&
    xMovement === 0 &&
    selected === "mano izquierda"
  ) {
    mainMovement = "aducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    xMovement === 1 &&
    selected === "mano izquierda"
  ) {
    mainMovement = "abducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";
    if (xMovement === 0) {
      xGeneralMovement = "flexi??n";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    } else if (xMovement === 1) {
      xGeneralMovement = "extension";
      xGeneralAxis = "laterolateral";
      xGeneralPlane = "sagital";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;
  }
  /****************** FINALIZA MIEMBROS SUPERIORES ************** */

  /********************** MIEMBROS INFERIORES ************** */

  /*---MUSLO Derecho--- Dispositivo: parte lateral media del muslo
  y sentido "y" hacia cef??lico */
  if (mainAxis === "x" && xMovement === 0 && selected === "muslo derecho") {
    mainMovement = "abducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "muslo derecho"
  ) {
    mainMovement = "aducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  }
  if (mainAxis === "y" && yMovement === 0 && selected === "muslo derecho") {
    mainMovement = "rotaci??n externa";
    axisMovement = "c??falocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "muslo derecho"
  ) {
    mainMovement = "rotaci??n interna";
    axisMovement = "c??falocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    selected === "muslo derecho"
  ) {
    mainMovement = "extensi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    selected === "muslo derecho"
  ) {
    mainMovement = "flexi??n";

    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  }
  /*---MUSLO izquierdo--- Dispositivo: parte lateral media del muslo
  y sentido "y" hacia cef??lico */
  if (mainAxis === "x" && xMovement === 0 && selected === "muslo izquierdo") {
    mainMovement = "abducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "x" &&
    xMovement === 1 &&
    selected === "muslo izquierdo"
  ) {
    mainMovement = "aducci??n";
    axisMovement = "anteroposterior";
    planeMovement = "frontal";

    xGeneralMovement = mainMovement;
    xGeneralAxis = axisMovement;
    xGeneralPlane = planeMovement;

    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    if (zMovement === 0) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  }
  if (mainAxis === "y" && yMovement === 0 && selected === "muslo izquierdo") {
    mainMovement = "rotaci??n interna";
    axisMovement = "c??falocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "y" &&
    yMovement === 1 &&
    selected === "muslo izquierdo"
  ) {
    mainMovement = "rotaci??n externa";
    axisMovement = "c??falocaudal";
    planeMovement = "transversal";

    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }

    yGeneralMovement = mainMovement;
    yGeneralAxis = axisMovement;
    yGeneralPlane = planeMovement;

    if (zMovement === 0) {
      zGeneralMovement = "flexi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    } else if (zMovement === 1) {
      zGeneralMovement = "extensi??n";
      zGeneralAxis = "laterolateral";
      zGeneralPlane = "sagital";
    }
  } else if (
    mainAxis === "z" &&
    zMovement === 0 &&
    selected === "muslo izquierdo"
  ) {
    mainMovement = "flexi??n";
    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  } else if (
    mainAxis === "z" &&
    zMovement === 1 &&
    selected === "muslo izquierdo"
  ) {
    mainMovement = "extensi??n";

    axisMovement = "laterolateral";
    planeMovement = "sagital";
    if (xMovement === 0) {
      xGeneralMovement = "abducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    } else if (xMovement === 1) {
      xGeneralMovement = "aducci??n";
      xGeneralAxis = "anteroposterior";
      xGeneralPlane = "frontal";
    }
    if (yMovement === 0) {
      yGeneralMovement = "rotaci??n interna";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "tansversal";
    } else if (yMovement === 1) {
      yGeneralMovement = "rotaci??n externa";
      yGeneralAxis = "longitudinal";
      yGeneralPlane = "transversal";
    }
    zGeneralMovement = mainMovement;
    zGeneralAxis = axisMovement;
    zGeneralPlane = planeMovement;
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++
  /*declaramos un condicional para los planos y los ejes 
  segun el movimiento independiente de cual es el principal*/

  if (selected === "cervical" || selected === "dorsolumbar") {
    xGeneralAxis = "laterolateral";
    yGeneralAxis = "cefalocaudal";
    zGeneralAxis = "anteroposterior";
    xGeneralPlane = "sagital";
    yGeneralPlane = "transversal";
    zGeneralPlane = "frontal";
  }
  //brazo derecho ubicacion lateral del dispositivo
  if (selected === "brazo derecho" || selected === "brazo izquierdo") {
    xGeneralAxis = "anteroposterior";
    yGeneralAxis = "longitudinal";
    zGeneralAxis = "laterolateral";
    xGeneralPlane = "frontal";
    yGeneralPlane = "transversal";
    zGeneralPlane = "sagital";
  }

  //antebrazo ubicaci??n anterior del dispositivo
  if (selected === "antebrazo derecho" || selected === "antebrazo izquierdo") {
    xGeneralAxis = "laterolateral";
    yGeneralAxis = "longitudinal";
    zGeneralAxis = "anteroposterior";
    xGeneralPlane = "sagital";
    yGeneralPlane = "transversal";
    zGeneralPlane = "frontal";
  }

  const detectObj = {
    mainMovement,
    xMovement,
    yMovement,
    zMovement,
    side,
    axisMovement,
    planeMovement,
    mainMovementValue,
    xGeneralAxis,
    yGeneralAxis,
    zGeneralAxis,
    xGeneralPlane,
    yGeneralPlane,
    zGeneralPlane,
    xGeneralMovement,
    yGeneralMovement,
    zGeneralMovement,
    mainAxis,
  };

  return detectObj;
};

export default directionAxisDetect;
// consideramos  el valor de 1 para rotacion positiva y 0 para la negativa
