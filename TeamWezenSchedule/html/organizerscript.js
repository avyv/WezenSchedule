var base_url = "https://kiljpq1n4a.execute-api.us-east-2.amazonaws.com/Alpha";

/********************* Create Calendar *********************/
var dummyTimeslots = [{startTime:"01:00:00",secretCode:0001,id:"third1",meeting:{name:"Mtng1"},date:"2018-12-03",isOpen:false},
                    {startTime:"01:00:00",meeting:{name:"Mtng2"},secretCode:0002,id:"fourth1",date:"2018-12-04",isOpen:true},
                    {startTime:"01:00:00",secretCode:0003,id:"fifth1",meeting:{name:"Mtng3"},date:"2018-12-05",isOpen:false},
                    {startTime:"01:00:00",meeting:{name:"Mtng4"},secretCode:0004,id:"sixth1",date:"2018-12-06",isOpen:true},
                    {startTime:"01:00:00",meeting:{name:"Mtng5"},secretCode:0005,id:"seventh1",date:"2018-12-07",isOpen:true},
                    {startTime:"01:00:00",secretCode:0006,id:"eighth1",meeting:{name:"Mtng6"},date:"2018-12-08",isOpen:false},
                    {startTime:"01:00:00",meeting:{name:"Mtng7"},secretCode:0007,id:"nineth1",date:"2018-12-09",isOpen:true},

                    {startTime:"02:00:00",secretCode:0008,id:"third2",meeting:{name:" "},date:"2018-12-03",isOpen:true},
                    {startTime:"02:00:00",meeting:{name:" "},secretCode:0009,id:"fourth2",date:"2018-12-04",isOpen:true},
                    {startTime:"02:00:00",secretCode:0010,id:"fifth2",meeting:{name:" "},date:"2018-12-05",isOpen:false},
                    {startTime:"02:00:00",meeting:{name:" "},secretCode:0011,id:"sixth2",date:"2018-12-06",isOpen:true},
                    {startTime:"02:00:00",meeting:{name:" "},secretCode:0012,id:"seventh2",date:"2018-12-07",isOpen:false},
                    {startTime:"02:00:00",secretCode:0013,id:"eighth2",meeting:{name:" "},date:"2018-12-08",isOpen:false},
                    {startTime:"02:00:00",meeting:{name:" "},secretCode:0014,id:"nineth2",date:"2018-12-09",isOpen:true},

                    {startTime:"03:00:00",secretCode:0015,id:"third3",meeting:{name:"Mtng8"},date:"2018-12-03",isOpen:false},
                    {startTime:"03:00:00",meeting:{name:" "},secretCode:0016,id:"fourth3",date:"2018-12-04",isOpen:false},
                    {startTime:"03:00:00",secretCode:0017,id:"fifth3",meeting:{name:"Mtng9"},date:"2018-12-05",isOpen:false},
                    {startTime:"03:00:00",meeting:{name:" "},secretCode:0018,id:"sixth3",date:"2018-12-06",isOpen:false},
                    {startTime:"03:00:00",meeting:{name:"Mtng10"},secretCode:0019,id:"seventh3",date:"2018-12-07",isOpen:true},
                    {startTime:"03:00:00",secretCode:0020,id:"eighth3",meeting:{name:" "},date:"2018-12-08",isOpen:false},
                    {startTime:"03:00:00",meeting:{name:"Mtng11"},secretCode:0021,id:"nineth3",date:"2018-12-09",isOpen:false},

                    {startTime:"04:00:00",secretCode:0022,id:"third4",meeting:{name:"Mtng12"},date:"2018-12-03",isOpen:false},
                    {startTime:"04:00:00",meeting:{name:" "},secretCode:0023,id:"fourth4",date:"2018-12-04",isOpen:true},
                    {startTime:"04:00:00",secretCode:0024,id:"fifth4",meeting:{name:"Mtng13"},date:"2018-12-05",isOpen:false},
                    {startTime:"04:00:00",meeting:{name:" "},secretCode:0025,id:"sixth4",date:"2018-12-06",isOpen:true},
                    {startTime:"04:00:00",meeting:{name:" "},secretCode:0026,id:"seventh4",date:"2018-12-07",isOpen:true},
                    {startTime:"04:00:00",secretCode:0027,id:"eighth4",meeting:{name:"Mtng14"},date:"2018-12-08",isOpen:false},
                    {startTime:"04:00:00",meeting:{name:" "},secretCode:0028,id:"nineth4",date:"2018-12-09",isOpen:true}];

var dummySchedule = {startDate:"2018-12-03", startTime:"01:00:00", slotDuration:15,id:"Test",numSlotsPerDay:4,timeSlots:dummyTimeslots,orgCode:1234,fullEndDate:"2018-12-09",fullStartDate:"2018-12-03"};
var currts = dummySchedule.timeSlots[0];
var currSchedule = dummySchedule;
var orgCredentials = "";
var updatedd;

var fday;
var fmonth;
var fdate;
var fyear;
var ftime;

window.onload = updateFilt;


function updateFilt(){
  // updatedd = false;
  fday = document.getElementById("dayofweek").value;
  fmonth = document.getElementById("selectmonth").value;
  fyear = document.getElementById("selectyear").value;
  fdate = document.getElementById("selectdayofmonth").value;
  ftime = document.getElementById("filterTime").value;
}

function resetFilt(){

    document.getElementById("dayofweek").value = 0;
    document.getElementById("selectmonth").value = 0;
    document.getElementById("selectyear").value = 0;
    document.getElementById("selectdayofmonth").value = "";
    document.getElementById("filterTime").value = 0;
    updateFilt();
}
function resetFiltBtn(){
  resetFilt();
  filter();
}
/**********  Create Calendar Display **********/
function generateCalendar(){
    document.getElementById("daysview").innerHTML = "";
    //date input for filter schedule options
    let setBounds = document.getElementById("selectdayofmonth");
    setBounds.min = currSchedule.fullStartDate;
    setBounds.max = currSchedule.fullEndDate;
    document.getElementById("newStartDate").max = currSchedule.fullStartDate;
    document.getElementById("newEndDate").min = currSchedule.fullEndDate;
    //header for calendar
    var weekdays = ["Time","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    let date = currSchedule.startDate;
    let parseddate = date.split("-");
    let d = parseddate[2];
    let m = parseddate[1];
    let y = parseddate[0];
    let calendar = document.getElementById("daysview");

    /********** header ************/
    let header = calendar.insertRow(0);
    header.id = "timelbl";
    let head = header.insertCell(-1);
    var html = weekdays[0];
    head.innerHTML = html;

    /********* Calendar *********/
    let st = currSchedule.startTime.split(":");
    var dur = currSchedule.slotDuration;
    let timelabel = document.createElement("td");
    var tsiterator = 0;

    let filt = document.getElementById("filterTime");
    let bulkedit = document.getElementById("opencloseTime");//update bulk edit

    if(updatedd){//update filter while im here
      filt.innerHTML = "<option value=0>--none--</option>";
      bulkedit.innerHTML = "<option value=0>--none--</option>";
    }
    for(let row=1; row<=(currSchedule.numSlotsPerDay); row++){
      let filteroption = document.createElement("OPTION");
      let filteroption2 = document.createElement("OPTION");

      /********** Time Slot Label **********/

      let labelslot = currSchedule.timeSlots[tsiterator];
      var min = labelslot.startTime.minute;
      if(min<10){
        min = "0" + min;
      }
      label = labelslot.startTime.hour + ":" + min;
      let tsrow = calendar.insertRow(-1);
      timeslot = tsrow.insertCell(0);
      timeslot.innerHTML = label;
      timeslot.id = "daylbl";
      //update filter dropdown menu
      if(updatedd){
        filteroption.innerText = label;
        filteroption2.innerText = label;
      }
      var hr = labelslot.startTime.hour;
      if(hr < 10){
        hr = "0" + hr;
      }
      filteroption.value = hr + ":" + min;// + ":00";
      filteroption2.value = hr + ":" + min;// + ":00";
      if(updatedd){
        filt.appendChild(filteroption);
        bulkedit.appendChild(filteroption2);
      }
      /********** Time Slots **********/
      for(let d=1;d<=7;d++){
        let thisSlot = tsrow.insertCell(-1);
        let myslot = currSchedule.timeSlots[tsiterator];


        if(row==1){
            let head = header.insertCell(-1);
            var html = weekdays[d] + "<br>" + myslot.slotDate.month + "/" + myslot.slotDate.day;
            head.innerHTML = html;
        }
        if(myslot.isDisplayed){
          if((myslot.isOpen)&&(orgCredentials == currSchedule.orgCode)){
            let closebtn = document.createElement("BUTTON");
            closebtn.innerText = "Set Closed";
            closebtn.addEventListener('click', function(){closeSlot(myslot)});
            thisSlot.appendChild(closebtn);
          }
          if(myslot.meetingName == " "){
            if(myslot.isOpen){
              let freebtn = document.createElement("BUTTON");
              freebtn.innerText = "Schedule Mtng";
              freebtn.addEventListener('click', function(){promptMeetingName(myslot)});
              thisSlot.appendChild(freebtn);
            }else if(orgCredentials == currSchedule.orgCode){
                let openbtn = document.createElement("BUTTON");
                openbtn.innerText = "Set Free";
                openbtn.addEventListener('click', function(){openSlot(myslot)});
                thisSlot.appendChild(openbtn);
            }
          }else{
            let mtng = document.createElement("P");
            mtng.innerText = myslot.meetingName;
            let cancelbtn = document.createElement("BUTTON");
            cancelbtn.innerText = "Cancel Mtng";
            cancelbtn.addEventListener('click',function(){cancelMtng(myslot)});
            thisSlot.appendChild(mtng);
            thisSlot.appendChild(cancelbtn);
          }
        }else{
          thisSlot.innerText = " ";
        }
        tsiterator++;
      }
        }

    if(orgCredentials == currSchedule.orgCode){
      document.getElementById("editschedbtn").style.display = 'inline';
      document.getElementById("deleteschedbtn").style.display = 'inline';
      document.getElementById("bulkts").style.display = 'inline';
    }else{
      document.getElementById("bulkts").style.display = 'none';
      document.getElementById("editschedbtn").style.display = 'none';
      document.getElementById("deleteschedbtn").style.display = 'none';
    }
    //if not already visible, make visible
    document.getElementById("calendarwindow").style.visibility = 'visible';
    updatedd = false;
  }



  /********************* Create Schedule *********************/
  //prompt to enter necessary info
  function openCreatePrompt(e){
    document.getElementById('orgtools').style.display='block';
    return false;
  }
  //close form if data is valid
  function handleSubmitSched(e){
    if(checkValidResponse()){
      document.getElementById("orgtools").style.display = 'none';
      createSchedule();
    }else{
      alert("Please Fill Out All Fields");
    }
    return false;
  }

  function deleteSchedule(){
    let cont = confirm("Are you sure you want to delete this schedule?");
    if(cont){
      resetFilt();
      let sid = currSchedule.id;
      let data = {};
      data["requestSchedID"] = String(sid);
      let deleteschedule_url = base_url + "/deleteschedule";
      sendData(data,deleteschedule_url,deleteScheduleCallback);
    }
  }
  //ensure all fields have been filled out
  function checkValidResponse(){
    let sid = (document.getElementById("setschedid").value != "");
    let sd = (document.getElementById("setstartday").value != "");
    let ed = (document.getElementById("setendday").value != "");
    return (sd && ed && sid);
  }


  //adjust the form to only allow end times after the start
  function updateEndTime(){
    let start = document.getElementById("settimestart").value;
    let end = document.getElementById("settimeend");
    end.innerHTML = "";
    let st = start.split(":");
    let hrs = parseInt(st[0]) + 1;
    let mins = parseInt(st[1]);
    while(hrs<=24){
      label = hrs + ":" + 0 + mins;
      let option = document.createElement("OPTION");
      option.innerHTML=label;
      if(hrs < 10){
        option.value = "0" + label + ":00";
      }else{option.value = label + ":00";}
      end.appendChild(option);
      hrs++;
    }
  }
  function updateEndDate(startdate){
    //onchange="JavaScript:updateEndDate(this);"
    var enddate;
    if(startdate.id == "setstartday"){
      enddate = document.getElementById("setendday");
    }else if(startdate.id == "newStartDate"){//this actually should be based on schedule start and end dates
      enddate = document.getElementById("newEndDate");
    }
    enddate.min = startdate.value;
  }

  function updateStartDate(enddate){
    //onchange="JavaScript:updateStartDate(this);"
    var startdate;
    if(enddate.id == "setendday"){
      startdate = document.getElementById("setstartday");
    }else if(enddate.id == "newEndDate"){
      startdate = document.getElementById("newStartDate");
    }
    startdate.max = enddate.value;
  }
  //compile inputs and send into java
  function createSchedule(){
    updatedd = true;
    let sid = document.getElementById("setschedid").value
    let startDay = document.getElementById("setstartday").value;
    let endDay = document.getElementById("setendday").value;
    let dailyStartTime = document.getElementById("settimestart").value;
    let dailyEndTime = document.getElementById("settimeend").value;
    let slotDuration = document.getElementById("settimeslots").value;
    let data = {};
    data["requestStartDate"] = String(startDay);
    data["requestEndDate"] = String(endDay);
    data["requestStartTime"] = String(dailyStartTime);
    data["requestEndTime"] = String(dailyEndTime);
    data["requestSlotDuration"] = slotDuration;
    data["requestID"] = String(sid);
    let createSchedule_url = base_url + "/createschedule";
    sendData(data,createSchedule_url,createResponse);
  }

function refresh(){
    let data = {};
    data["requestSchedID"] = String(currSchedule.id);
    data["requestWeekStart"] = String(currSchedule.startDate);
    data["requestWeekday"] = String(fday);
    data["requestMonth"] = String(fmonth);
    data["requestYear"] = String(fyear);
    data["requestDate"] = String(fdate);
    data["requestTime"] = String(ftime);
    let refresh_url = base_url + "/getschedule";
    sendData(data,refresh_url,processSchedule);
}
/********* Manage Meetings **********/
function promptMeetingName(ts){
  currts = ts;
  let label = document.getElementById("mtnglabel");
  var mins =  currts.startTime.minute;
  if(mins<10){
    mins = "0"+mins;
  }
  label.innerHTML="<b>Name for Meeting on " + currts.slotDate.month + "/ " + currts.slotDate.day + " at " + currts.startTime.hour + ":" + mins+ ": <b>";
  let prompt = document.getElementById('mtngPrompt');
  prompt.style.display='block';
}
function createMtng(){
  let name = document.getElementById("mtngName").value;
  if ((name == "") || (name == " ")) {
    alert("You must enter a valid name");
  }  else{
      let data = {};
      data["requestSchedID"] = String(currSchedule.id);
      data["requestWeekStart"] = String(currSchedule.startDate);
      data["requestWeekday"] = String(fday);
      data["requestMonth"] = String(fmonth);
      data["requestYear"] = String(fyear);
      data["requestDate"] = String(fdate);
      data["requestTime"] = String(ftime);
      data["requestTSId"] = String(currts.id);
      data["requestMtngName"] = String(name);
      let createmtng_url = base_url + "/createmeeting";
      sendData(data,createmtng_url,processScheduleMtng);
  }
}
function cancelMtng(ts){
  currts = ts;
  if(orgCredentials == currSchedule.orgCode){
    checkMeetingAuthorization(false);
  }else{
    document.getElementById("editMtngPrompt").style.display = 'block';
  }
}
function checkMeetingAuthorization(unauthorized){
  document.getElementById("editMtngPrompt").style.display = 'none';
  if(unauthorized){
    let enteredCode = document.getElementById("secretCode").value;
    if(enteredCode != currts.secretCode){
      alert("Invalid Code");
      return;
    }
  }
  // alert("Deleting Meeting on " + currts.date + " at " + currts.startTime);

  let data = {};
  data["requestSchedID"] = String(currSchedule.id);
  data["requestWeekStart"] = String(currSchedule.startDate);
  data["requestWeekday"] = String(fday);
  data["requestMonth"] = String(fmonth);
  data["requestYear"] = String(fyear);
  data["requestDate"] = String(fdate);
  data["requestTime"] = String(ftime);
  data["requestTSId"] = String(currts.id);
  let deletemtng_url = base_url + "/cancelmeeting";
  sendData(data,deletemtng_url,processSchedule);
}
/********* Open An Existing Schedule **********/
function openSchedPrompt(e){
document.getElementById("schedprompt").style.display='block';
return false;
}
function openSchedule(){
  updatedd = true;
  let enteredID = document.getElementById("schedid").value;
  orgCredentials = "";
  if((enteredID == " ") || (enteredID == "")){
    alert("You Must enter a valid id");
  }else{
    resetFilt();
    let data = {};
    data["requestSchedID"] = String(enteredID);
    data["requestWeekStart"] = "";
    data["requestWeekday"] = String(fday);
    data["requestMonth"] = String(fmonth);
    data["requestYear"] = String(fyear);
    data["requestDate"] = String(fdate);
    data["requestTime"] = String(ftime);
    let openschedule_url = base_url + "/getschedule";
    sendData(data,openschedule_url,processSchedule);
    document.getElementById("schedprompt").style.display ='none';
  }
}
function openSchedEditPrompt(e){
document.getElementById("schededitprompt").style.display='block';
return false;
}
function openEditSchedule(){
  updatedd = true;
  let enteredID = document.getElementById("editschedid").value;
  orgCredentials = document.getElementById("orgCred").value;
  if((enteredID == " ") || (enteredID == "") || (orgCredentials == "")){
    alert("Please Fill Out All Inputs");
  }else{
    resetFilt();
    let data = {};
    data["requestSchedID"] = String(currSchedule.id);
    data["requestWeekStart"] = "";// String(currSchedule.startDate);
    data["requestWeekday"] = String(fday);
    data["requestMonth"] = String(fmonth);
    data["requestYear"] = String(fyear);
    data["requestDate"] = String(fdate);
    data["requestTime"] = String(ftime);
    let openschedule_url = base_url + "/getschedule";
    sendData(data,openschedule_url,processEditSchedule);
  }
}
function filter(){
  updateFilt();
  let data = {};
  data["requestSchedID"] = String(currSchedule.id);
  data["requestWeekStart"] = String(currSchedule.startDate);
  data["requestWeekday"] = String(fday);
  data["requestMonth"] = String(fmonth);
  data["requestYear"] = String(fyear);
  data["requestDate"] = String(fdate);
  data["requestTime"] = String(ftime);
  let filter_url = base_url + "/getschedule";
  sendData(data,filter_url,processSchedule);
}
function openSlot(ts){
  currts = ts;
  let data = {};
  data["requestSchedID"] = String(currSchedule.id);
  data["requestWeekStart"] = String(currSchedule.startDate);
  data["requestWeekday"] = String(fday);
  data["requestMonth"] = String(fmonth);
  data["requestYear"] = String(fyear);
  data["requestDate"] = String(fdate);
  data["requestTime"] = String(ftime);
  data["requestTSId"] = String(currts.id);
  let open_url = base_url + "/opensingleslot";
  sendData(data,open_url,processSchedule);
}
function closeSlot(ts){
  // alert("closing "+ts.date+" at " + ts.startTime);
  currts = ts;
  let data = {};
  data["requestSchedID"] = String(currSchedule.id);
  data["requestWeekStart"] = String(currSchedule.startDate);
  data["requestWeekday"] = String(fday);
  data["requestMonth"] = String(fmonth);
  data["requestYear"] = String(fyear);
  data["requestDate"] = String(fdate);
  data["requestTime"] = String(ftime);
  data["requestTSId"] = String(currts.id);
  let close_url = base_url + "/closesingleslot";
  sendData(data,close_url,processSchedule);
}
function bulkEdit(){
  let toggle = document.getElementById("setopenclose").value;
  let weekday = document.getElementById("openclosedayofweek").value;
  let month = document.getElementById("openclosemonth").value;
  let date = document.getElementById("openclosedate").value;
  let year = document.getElementById("opencloseyear").value;
  let ts = document.getElementById("opencloseTime").value;
  let data = {};
  data["requestSchedID"] = String(currSchedule.id);
  data["requestWeekStart"] = String(currSchedule.startDate);
  data["requestToggle"] = String(toggle);
  data["requestWeekday"] = String(weekday);
  data["requestMonth"] = String(month);
  data["requestYear"] = String(year);////////////////////////////////////////////////////////////////////////////////edit stuff
  data["requestDate"] = String(date);
  data["requestStartTime"] = String(ts);
  let bulk_url = base_url + "/bulkedit";
  sendData(data,bulk_url,processSchedule);
}

function getNextWeek(){
  let data = {};
  data["requestSchedID"] = String(currSchedule.id);
  data["requestWeekStart"] = String(currSchedule.startDate);
  data["requestWeekday"] = String(fday);
  data["requestMonth"] = String(fmonth);
  data["requestYear"] = String(fyear);
  data["requestDate"] = String(fdate);
  data["requestTime"] = String(ftime);
  let next_url = base_url + "/getnextweek";
  sendData(data,next_url,processSchedule);
}

function getPreviousWeek(){
  let data = {};
  data["requestSchedID"] = String(currSchedule.id);
  data["requestWeekStart"] = String(currSchedule.startDate);
  data["requestWeekday"] = String(fday);
  data["requestMonth"] = String(fmonth);
  data["requestYear"] = String(fyear);
  data["requestDate"] = String(fdate);
  data["requestTime"] = String(ftime);
  let previous_url = base_url + "/getpreviousweek";
  sendData(data,previous_url,processSchedule);
}
function promptSchedParamEdit(){
  //I need the start and end dates of the full schedule to do this bit
  // let startmax = currSchedule.startDay;
  document.getElementById("editschedparamPrompt").style.display='block';
}
function updateScheduleParams(){
  var nsd = document.getElementById("newStartDate").value;
  var ned = document.getElementById("newEndDate").value;
  if(nsd == ""){
    nsd = currSchedule.fullStartDate;
  }
  if(ned == ""){
    ned = currSchedule.fullEndDate;
  }
  // alert("New Start Date = " + nsd + ", New End Date = " + ned);
  document.getElementById("editschedparamPrompt").style.display='none';


  let data = {};
  data["requestSchedID"] = String(currSchedule.id);
  data["requestWeekStart"] = String(currSchedule.startDate);
  data["requestWeekday"] = String(fday);
  data["requestMonth"] = String(fmonth);
  data["requestYear"] = String(fyear);
  data["requestDate"] = String(fdate);
  data["requestTime"] = String(ftime);
  data["requestNewStart"] = String(nsd);
  data["requestNewEnd"] = String(ned);
  let extend_url = base_url + "/extenddates";
  sendData(data,extend_url,processSchedule);

}
/*********************** SUBMIT DATA TO JAVA *********************************/
function sendData(data,url,callback){
  let js = JSON.stringify(data);
  console.log("JS:" + js);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.send(js);
  xhr.onloadend = function () {
    console.log(xhr);
    console.log(xhr.request);
    if(xhr.readyState == XMLHttpRequest.DONE) {
      // console.log("XHR:" + xhr.responseText);
      callback(xhr.responseText);
    } else {
      callback(xhr.responseText);
    }
  };
}
//default callback
function processSchedule(xhrResult){
	console.log("result:" + xhrResult);
	let js = JSON.parse(xhrResult);

  //add if schedule couldnt be opened, display "could not find schedule"
  if(js["response"]=="Successfully retrieved schedule"){
    currSchedule.startDate = js["responseStartDateOfWeek"];
    currSchedule.startTime = js["responseStartTime"];
    currSchedule.id = js["responseID"];
    currSchedule.slotDuration = js["responseSlotDuration"];
    currSchedule.orgCode = js["responseSecretCode"];
    currSchedule.numSlotsPerDay = js["responseNumSlotsDay"];
    currSchedule.timeSlots = js["responseWeeklyTimeSlots"];
    currSchedule.fullStartDate = js["responseScheduleStartDate"];
    currSchedule.fullEndDate = js["responseScheduleEndDate"];
    generateCalendar();
  }else{
    alert(js["response"]);
  }
}
//Create callback
function createResponse(xhrResult){
  console.log("result:" + xhrResult);
  let js = JSON.parse(xhrResult);

  if(js["response"]=="Successfully created schedule"){
    currSchedule.startDate = js["responseStartDateOfWeek"];
    currSchedule.startTime = js["responseStartTime"];
    currSchedule.id = js["responseID"];
    currSchedule.slotDuration = js["responseSlotDuration"];
    currSchedule.orgCode = js["responseSecretCode"];
    currSchedule.numSlotsPerDay = js["responseNumSlotsDay"];
    currSchedule.timeSlots = js["responseWeeklyTimeSlots"];
    currSchedule.fullStartDate = js["responseScheduleStartDate"];
    currSchedule.fullEndDate = js["responseScheduleEndDate"];

    document.getElementById("orgcode").innerHTML = currSchedule.orgCode;
    document.getElementById("idPrompt").style.display='block';
    generateCalendar();
  }else{
    alert(js["response"]);
  }
}


function processScheduleMtng(xhrResult){
	console.log("result:" + xhrResult);
	let js = JSON.parse(xhrResult);

  //add if schedule couldnt be opened, display "could not find schedule"
  if(js["response"]=="Successfully created meeting"){
    currSchedule.startDate = js["responseStartDateOfWeek"];
    currSchedule.startTime = js["responseStartTime"];
    currSchedule.id = js["responseID"];
    currSchedule.slotDuration = js["responseSlotDuration"];
    currSchedule.orgCode = js["responseSecretCode"];
    currSchedule.numSlotsPerDay = js["responseNumSlotsDay"];
    currSchedule.timeSlots = js["responseWeeklyTimeSlots"];
    currSchedule.fullStartDate = js["responseScheduleStartDate"];
    currSchedule.fullEndDate = js["responseScheduleEndDate"];
    var this_slot;
    for(let i=0; i<currSchedule.timeSlots.length;i++){
      this_slot = currSchedule.timeSlots[i];
      if(this_slot.id == currts.id){
        break;
      }
    }
    document.getElementById("mtngPrompt").style.display='none';
    document.getElementById("mtngcode").innerHTML = this_slot.secretCode;
    document.getElementById("mtngIDPrompt").style.display='block';
    generateCalendar();
  }else{
    alert(js["response"]);
  }
}

function processEditSchedule(xhrResult){
	console.log("result:" + xhrResult);
	let js = JSON.parse(xhrResult);

  //add if schedule couldnt be opened, display "could not find schedule"
  if(js["response"]=="Successfully retrieved schedule"){
    currSchedule.startDate = js["responseStartDateOfWeek"];
    currSchedule.startTime = js["responseStartTime"];
    currSchedule.id = js["responseID"];
    currSchedule.slotDuration = js["responseSlotDuration"];
    currSchedule.orgCode = js["responseSecretCode"];
    currSchedule.numSlotsPerDay = js["responseNumSlotsDay"];
    currSchedule.timeSlots = js["responseWeeklyTimeSlots"];
    currSchedule.fullStartDate = js["responseScheduleStartDate"];
    currSchedule.fullEndDate = js["responseScheduleEndDate"];
    if(orgCredentials == currSchedule.orgCode){
      generateCalendar();
      document.getElementById("schededitprompt").style.display ='none';
    }else{alert("Incorrect Credentials");}
  }else{
    alert(js["response"]);
  }
}

function deleteScheduleCallback(xhrResult){
  console.log("result:" + xhrResult);
  let js = JSON.parse(xhrResult);
  alert(js["deleteScheduleResponse"]);
  document.getElementById("calendarwindow").style.visibility = 'hidden';

}
