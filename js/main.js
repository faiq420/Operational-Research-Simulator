// var entryType = 1;

$(document).ready(function () {
  $("#uploadData").click(function () {
    console.log("upload data");
    var file = $("#csvFile").val();
    var ext = file.split(".").pop().toLowerCase();
    console.log("upload data EXT :::::::" + ext);
    var data = $.csv.toArray(file);
    console.log("upload data file :::::::" + data);
  });
  //
  console.log(getFactorial(5));
  var entryType = 0;
  $("#entryType").change(function () {
    var entryType = $("#entryType").val();
    if (entryType == 1) {
      // $("#mainHeaing").hide();
      $("#meanForm").show();
      $("#iterationForm").hide();
      $("#serverTypeArea").show();
      $("#meanServiceView").show();
      $("#abc").hide();
      $("#abd").hide();
    } else {
      console.log("test");
      $("#serverTypeArea").hide();
      $("#meanForm").hide();
      $("#iterationForm").show();
    }
  });
  $("#serverType").change(function () {
    var serverType = $("#serverType").val();
    if (serverType == 3 || serverType == 2) {
      $("#meanServiceView").hide();
      $("#abc").show();
      $("#abd").show();
      $("#iterationForm").show();
    } else {
      $("#meanServiceView").show();
    }
  });
  $(".add").click(function () {
    $(".iterationCloneArea").append(
      "<div class='row iterativeData'><div class='form-group col-md-6'><label for='inputName'> Inter Arrival Time </label><input type='number' class='form-control arrivalTime'  name='arrivals' placeholder='Enter Arrival Time' required /><small class='form-text text-muted'>Please fill Arrival Time</small></div><div class='form-group col-md-6'><label for='inputName'> Service Time </label><input type='number' class='form-control serviceTime'  name='serviceTime' placeholder='Enter Service Time' required /><small class='form-text text-muted'>Please fill Service Time</small></div></div>"
    );
  });
  $(".back").click(function () {
    $("#form").show();
    $("#report").hide();
    $("#report2").hide();
  });

  $("#submitData").click(function () {
    var entryType = $("#entryType").val();
    var serverType = $("#serverType").val();
    if (entryType == 2 || serverType == 2) {
      var interArrivalTimes = $(".arrivalTime")
        .map((_, el) => el.value)
        .get();
      var serviceTimes = $(".serviceTime")
        .map((_, el) => el.value)
        .get();
      var arrivalTimes = [];
      var server1Utilization = [];
      var server2Utilization = [];
      var serviceStartAndEndTime = [];
      var turnArroundTimes = [];
      var waitInQueueTimes = [];
      var totalServiceTime = 0;
      var totalWaitTime = 0;
      var totalArrivalTime = 0;
      var totalTAT = 0;
      var totalServer1Utilization = 0;
      var totalServer2Utilization = 0;
      var noOfArrivals = interArrivalTimes.length;
      //lambda
      var avarageArrival = 0;
      //mu
      var avarageServiceTime = 0;
      var avarageTAT = 0;
      var avarageWaitInQueue = 0;
      for (i = 0; i < interArrivalTimes.length; i++) {
        var iteration = 0;
        if (i == 0) {
          arrivalTimes.push(iteration);
        } else {
          iteration =
            parseFloat(arrivalTimes[i - 1]) + parseFloat(interArrivalTimes[i]);
          arrivalTimes.push(iteration);
        }
        totalServiceTime =
          parseFloat(totalServiceTime) + parseFloat(serviceTimes[i]);
        totalArrivalTime = parseFloat(totalArrivalTime) + parseFloat(iteration);
      }
      // server1Utilization.push([Start,End,ServiceTime]);
      for (i = 0; i < arrivalTimes.length; i++) {
        let serviceTime = serviceTimes[i];
        var start = 0;
        var end = 0;
        if (i == 0) {
          start = arrivalTimes[i];
          end = start + serviceTime;
          server1Utilization.push([start, end, serviceTime]);
          serviceStartAndEndTime.push([start, end]);
          totalServer1Utilization =
            parseFloat(totalServer1Utilization) + parseFloat(serviceTime);
        } else {
          var server1LastEle =
            server1Utilization[server1Utilization.length - 1];
          var server2LastEle =
            server2Utilization[server2Utilization.length - 1];
          if (
            server2LastEle == null ||
            server2LastEle == "" ||
            server2LastEle == undefined
          ) {
            start = arrivalTimes[i];
            end = parseFloat(arrivalTimes[i]) + parseFloat(serviceTime);
            server2Utilization.push([start, end, serviceTime]);
            serviceStartAndEndTime.push([start, end]);
            totalServer2Utilization =
              parseFloat(totalServer2Utilization) + parseFloat(serviceTime);
          } else {
            if (server2LastEle[1] < server1LastEle[1]) {
              start =
                arrivalTimes[i] > server2LastEle[1]
                  ? arrivalTimes[i]
                  : server2LastEle[1];
              end = parseFloat(start) + parseFloat(serviceTime);
              server2Utilization.push([start, end, serviceTime]);
              serviceStartAndEndTime.push([start, end]);
              totalServer2Utilization =
                parseFloat(totalServer2Utilization) + parseFloat(serviceTime);
            } else {
              start =
                arrivalTimes[i] > server1LastEle[1]
                  ? arrivalTimes[i]
                  : server1LastEle[1];
              end = parseFloat(start) + parseFloat(serviceTime);
              serviceStartAndEndTime.push([start, end]);
              server1Utilization.push([start, end, serviceTime]);
              totalServer1Utilization =
                parseFloat(totalServer1Utilization) + parseFloat(serviceTime);
            }
          }
        }
        let turnArroundTime = parseFloat(end) - parseFloat(arrivalTimes[i]);
        turnArroundTimes.push(turnArroundTime);
        let waitInQueueTime = turnArroundTime - serviceTime;
        waitInQueueTimes.push(waitInQueueTime);
        totalWaitTime = parseFloat(totalWaitTime) + parseFloat(waitInQueueTime);
        totalTAT = parseFloat(totalTAT) + parseFloat(turnArroundTime);
      }

      avarageArrival = parseFloat(totalArrivalTime) / parseFloat(noOfArrivals);
      avarageServiceTime =
        parseFloat(totalServiceTime) / parseFloat(noOfArrivals);
      avarageTAT = parseFloat(totalTAT) / parseFloat(noOfArrivals);
      avarageWaitInQueue = parseFloat(totalWaitTime) / parseFloat(noOfArrivals);
      let listInSystem = parseFloat(avarageTAT) * parseFloat(avarageArrival);
      let listInQueue =
        parseFloat(avarageWaitInQueue) * parseFloat(avarageArrival);

      let p1 = (totalServer1Utilization / totalServiceTime) * 100;
      let p2 = (totalServer2Utilization / totalServiceTime) * 100;
      let server1Idel = 100 - p1;
      let server2Idel = 100 - p2;
      //
      avarageServiceTime = Math.abs(avarageServiceTime);
      avarageArrival = Math.abs(avarageArrival);
      avarageTAT = Math.abs(avarageTAT);
      avarageWaitInQueue = Math.abs(avarageWaitInQueue);
      listInQueue = Math.abs(listInQueue);
      listInSystem = Math.abs(listInSystem);
      p1 = Math.abs(p1);
      p2 = Math.abs(p2);
      server1Idel = Math.abs(server1Idel);
      server2Idel = Math.abs(server2Idel);
      $("#avarageServiceTime").text(avarageServiceTime);
      $("#avarageArrival").text(avarageArrival);
      $("#avarageTAT").text(avarageTAT);
      $("#avarageWaitInQueue").text(avarageWaitInQueue);
      $("#listInSystemReport2").text(listInSystem);
      $("#listInQueueReport2").text(listInQueue);
      $("#server1Utilization").text(p1);
      $("#server2Utilization").text(p2);
      $("#server1Idel").text(server1Idel);
      $("#server2Idel").text(server2Idel);
      $("#form").hide();
      $("#report2").show();
      $("#report").hide();
      setChartInterArrivalServiceTime(serviceTimes, interArrivalTimes);
      setServerUtilizationGraph(
        server1Utilization,
        "server1UtilizationGraph",
        "rgba(225, 0, 0, 0.5)",
        "rgba(225, 0, 0, 1)"
      );
      setServerUtilizationGraph(
        server2Utilization,
        "server2UtilizationGraph",
        "rgba(0, 128, 0, 0.5)",
        "rgba(0, 128, 0, 1)"
      );
      setChart(
        [p1, server1Idel],
        ["Server 1 Utilization", "Server 1 Idel"],
        "server1Graph"
      );
      setChart(
        [p2, server2Idel],
        ["Server 2 Utilization", "Server 2 Idel"],
        "server2Graph"
      );
      //   console.log("utilization servers");
      //   console.log(totalServer1Utilization);
      //   console.log(totalServiceTime);
      //   console.log(totalServer2Utilization);
      //   console.log("utilization");
      //   console.log(server1Utilization);
      //   console.log(server2Utilization);
      //   console.log(serviceStartAndEndTime);

      //   console.log("arrivalTimes");
      //   console.log(arrivalTimes);
      //   console.log(interArrivalTimes);
      //   console.log(serviceTimes);

      //   console.log("Result");
      //   console.log(avarageArrival + "avarageArrival");
      //   console.log(avarageServiceTime + " avarageServiceTime");
      //   console.log(avarageTAT + "avarageTAT");
      //   console.log(avarageWaitInQueue + "avarageWaitInQueue");
      //   console.log(listInSystem + "listInSystem");
      //   console.log(listInQueue + "listInQueue");
      //   console.log(p1 + "p1");
      //   console.log(p2 + "p2");
      //   console.log(server1Idel + "server1Idel");
      //   console.log(server2Idel + "server2Idel");
    } else if (entryType == 1 && serverType == 3) {
      var meanIA = $("#meanIA").val();
      var noOfServers = $("#noOfServers").val();
      var meanServiceTimeMax = $("#meanServiceTimeMax").val();
      var meanServiceTimeMin = $("#meanServiceTimeMin").val();
      var lambda = 1 / parseFloat(meanIA);
      var miu =
        (parseFloat(meanServiceTimeMax) + parseFloat(meanServiceTimeMin)) / 2;
      var rho = lambda / miu;
      var varianceOfServiceTime =
        Math.pow(
          parseFloat(meanServiceTimeMax) - parseFloat(meanServiceTimeMin),
          2
        ) / 12;
      var varianceOfInterArrival = lambda;
      var CSquareA = varianceOfInterArrival / (1 / Math.pow(lambda, 2));
      var CSquareS = varianceOfServiceTime / (1 / Math.pow(miu, 2));
      var listInQueue =
        (Math.pow(rho, 2) *
          (1 + CSquareS) *
          (CSquareA + Math.pow(rho, 2) * CSquareS)) /
        (2 * (1 - rho) * (1 + Math.pow(rho, 2) * CSquareS));
      var waitInQueue = listInQueue / lambda;
      var waitInSystem = parseFloat(waitInQueue) + parseFloat(1 / miu);
      var listInSystem = lambda * waitInSystem;
      var idelServerProb = (1 - rho) * 100;
      lambda = Math.abs(lambda);
      miu = Math.abs(miu);
      rho = Math.abs(rho);
      listInQueue = Math.abs(listInQueue);
      listInSystem = Math.abs(listInSystem);
      waitInSystem = Math.abs(waitInSystem);
      waitInQueue = Math.abs(waitInQueue);
      idelServerProb = Math.abs(idelServerProb);
      $("#form").hide();
      $("#report").show();
      $("#lambda").text(lambda);
      $("#mu").text(miu);
      $("#rho").text(rho);
      $("#listInQueue").text(listInQueue);
      $("#waitInSystem").text(waitInSystem);
      $("#idelServerProb").text(idelServerProb + " % ");
      $("#listInSystem").text(listInSystem);
      $("#waitInQueue").text(waitInQueue);
      setServerData([parseFloat(100 - idelServerProb), idelServerProb]);
      //setChartListAndWait(1.00,0.00,0.00,0.00);
      setChartListAndWait([
        Number(listInQueue).toFixed(2),
        Number(listInSystem).toFixed(2),
        Number(waitInQueue).toFixed(2),
        Number(waitInSystem).toFixed(2),
      ]);
      //idelServerProb
      //waitInSystem
      //listInQueue
      //Math.pow(meanServiceTimeMax-meanServiceTimeMin, 2)/12;
      console.log(lambda);
      console.log(miu);
      console.log(rho);
      console.log(varianceOfServiceTime);
      console.log(varianceOfInterArrival);
      console.log(CSquareA);
      console.log(listInQueue);
      console.log(waitInSystem);
      console.log(listInSystem);
      console.log(idelServerProb);
    } else if (entryType == 1 && serverType == 1) {
      var meanIA = $("#meanIA").val();
      var noOfServers = $("#noOfServers").val();
      var meanServiceTimeMax = $("#meanServiceTimeMax").val();
      var meanServiceTimeMin = $("#meanServiceTimeMin").val();
      var lambda = 1 / meanIA;
      var meanService = $("#meanService").val();
      var miu = 0;
      if (meanService != "") {
        miu = 1 / meanService;
      } else {
        miu = (meanServiceTimeMax + meanServiceTimeMin) / 2;
      }

      var rho = lambda / (noOfServers * miu);
      var dividend = 0;
      if (noOfServers < 2) {
        dividend = (noOfServers * Math.pow(rho, 0)) / 1;
      } else {
        dividend =
          (noOfServers * Math.pow(rho, 0)) / 1 +
          ((noOfServers * Math.pow(rho, noOfServers)) / (1 - rho)) *
            getFactorial(noOfServers);
      }

      var pNod = 1 / dividend;
      var listInQueue =
        ((pNod * Math.pow(lambda / miu, noOfServers) * rho) /
          getFactorial(noOfServers)) *
        Math.pow(1 - rho, 2); //lq
      var waitInQueue = listInQueue / lambda;
      var waitInSystem = waitInQueue + 1 / miu;
      var listInSystem = listInQueue + lambda / miu;
      var idelServerProb = (1 - rho) * 100;
      //Math.pow(meanServiceTimeMax-meanServiceTimeMin, 2)/12;
      console.log(lambda);
      console.log(miu);
      console.log(rho);
      console.log(listInQueue);
      console.log(waitInSystem);
      console.log(listInSystem);
      console.log(idelServerProb);
      lambda = Math.abs(lambda);
      miu = Math.abs(miu);
      rho = Math.abs(rho);
      listInQueue = Math.abs(listInQueue);
      listInSystem = Math.abs(listInSystem);
      waitInSystem = Math.abs(waitInSystem);
      waitInQueue = Math.abs(waitInQueue);
      idelServerProb = Math.abs(idelServerProb);
      $("#form").hide();
      $("#report").show();
      $("#lambda").text(lambda);
      $("#mu").text(miu);
      $("#rho").text(rho);
      $("#listInQueue").text(listInQueue);
      $("#waitInSystem").text(waitInSystem);
      $("#idelServerProb").text(idelServerProb + " % ");
      $("#listInSystem").text(listInSystem);
      $("#waitInQueue").text(waitInQueue);

      setServerData([parseFloat(100 - idelServerProb), idelServerProb]);
      //setChartListAndWait(1.00,0.00,0.00,0.00);
      setChartListAndWait([
        Number(listInQueue).toFixed(2),
        Number(listInSystem).toFixed(2),
        Number(waitInQueue).toFixed(2),
        Number(waitInSystem).toFixed(2),
      ]);
    } else if (entryType == 1 && serverType == 2) {
      var meanIA = $("#meanIA").val();
      var noOfServers = $("#noOfServers").val();
      var meanServiceTimeMax = $("#meanServiceTimeMax").val();
      var meanServiceTimeMin = $("#meanServiceTimeMin").val();
      var lambda = 1 / parseFloat(meanIA);
      var meanService = $("#meanService").val();
      var miu = 0;
      miu =
        (parseFloat(meanServiceTimeMax) + parseFloat(meanServiceTimeMin)) / 2;
      var rho = lambda / (noOfServers * miu);
      var pNodMMC =
        1 /
        (Math.pow(noOfServers * rho, 0) / 1 +
          (Math.pow(noOfServers * rho, noOfServers) / (1 - rho)) *
            getFactorial(noOfServers));
      var listInQueueMMC =
        ((pNodMMC * Math.pow(lambda / miu, noOfServers) * rho) /
          getFactorial(noOfServers)) *
        Math.pow(1 - rho, 2);
      var waitInQueueMMC = listInQueueMMC / lambda;
      var varianceOfServiceTime =
        Math.pow(
          parseFloat(meanServiceTimeMax) - parseFloat(meanServiceTimeMin),
          2
        ) / 12;
      var varianceOfInterArrival = lambda;
      var CSquareA = varianceOfInterArrival / (1 / Math.pow(lambda, 2));
      var CSquareS = varianceOfServiceTime / (1 / Math.pow(miu, 2));

      var waitInQueue = waitInQueueMMC * ((CSquareA + CSquareS) / 2);
      var listInQueue = waitInQueue * lambda;

      var waitInSystem = waitInQueue + 1 / miu;
      var listInSystem = parseFloat(listInQueue) + lambda / miu;
      var idelServerProb = (1 - rho) * 100;
      //Math.pow(meanServiceTimeMax-meanServiceTimeMin, 2)/12;
      console.log(lambda);
      console.log(miu);
      console.log(rho);
      console.log(listInQueue);
      console.log(waitInSystem);
      console.log(listInSystem);
      console.log(idelServerProb);
      lambda = Math.abs(lambda);
      miu = Math.abs(miu);
      rho = Math.abs(rho);
      listInQueue = Math.abs(listInQueue);
      listInSystem = Math.abs(listInSystem);
      waitInSystem = Math.abs(waitInSystem);
      waitInQueue = Math.abs(waitInQueue);
      idelServerProb = Math.abs(idelServerProb);
      $("#form").hide();
      $("#report").show();
      $("#lambda").text(lambda);
      $("#mu").text(miu);
      $("#rho").text(rho);
      $("#listInQueue").text(listInQueue);
      $("#waitInSystem").text(waitInSystem);
      $("#idelServerProb").text(idelServerProb + " % ");
      $("#listInSystem").text(listInSystem);
      $("#waitInQueue").text(waitInQueue);
      setServerData([parseFloat(100 - idelServerProb), idelServerProb]);
      // setChartListAndWait(1.00,0.00,0.00,0.00);
      setChartListAndWait([
        Number(listInQueue).toFixed(2),
        Number(listInSystem).toFixed(2),
        Number(waitInQueue).toFixed(2),
        Number(waitInSystem).toFixed(2),
      ]);
    }
  });

  function getFactorial(value) {
    tempvalue = 1;
    for (i = value; i > 0; i--) {
      tempvalue *= i;
    }
    return tempvalue;
  }
});
