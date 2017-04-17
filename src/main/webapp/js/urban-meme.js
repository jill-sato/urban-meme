/* global History */

// return "" if str is undefined, str otherwise
function clean_str(str){
  if(str === undefined){
    return "";
  }
  return str;
}

// returns true if the <li> element has class="active"
function isActiveTab(li){
  var _class = $(li).attr("class");
  if( _class === undefined || !(_class === "active")){
    return false;
  }
  return true;
}

// return the one <li> element in with class="active" in the given <ul>
function getActiveTab(ul){
  var active;
  ul.find("li").each(function(i,li) {
    if(isActiveTab(li)){
      active = li;
    }
  });
  return active;
}

// main entry point
function init() {
  'use strict';
  // get the deployment list

  // init History lib
  History.Adapter.bind(window,'statechange',function(){
      var State = History.getState();
  });

  // register callback for go button
  $("#btnGo").click( function() {
    var dteId = $('#dteId').val();
    go(dteId);
  });

  var tabMenu = $("#tab-menu");

  // activate the requested tab
  // e.g. index.html#tabname
  var anchor = $(location).attr('hash');
  if(anchor.length > 0){
    // make sure its a tab anchor
    // TODO have an naming convention
    var _li=$(anchor);
    if(_li.length > 0){
      var _a=$(_li).children("a");
      menuClick(_a, _li, tabMenu);
    }
  }

  // register callback for tab links
  tabMenu.find("li").each(function(i,li) {
    $(li).children("a").click( function() {
      menuClick(this, li, tabMenu);
    });
  });

  // invoke go(dteid) if dteid query param is provided in the URL
  // e.g. index.html?dteid=1234
  var search = $(location).attr('search');
  // remove leading ?
  search = search.substring(1, search.length);
  if(search.length > 0){
    // parse query params
    var query_params = search.split("&");
    // for each query param
    for(var i = 0; i < query_params.length; i++) {
      if(query_params[i].length > 0){
        var query_param = query_params[i];
        var idx = query_param.indexOf("=");
        var key = query_param.substring(0,idx);
        // if dteid is passed
        if(key === "dteid"){
            // process the passed dteid, only if the
            // active tab is debug-job
            if(isActiveTab($("#debug-job"))){
            var dteid = query_param.substring(idx+1, query_param.length+1);
            if(dteid.length > 0){
              $('#dteId').val(dteid);
              go(dteid);
            }
          }
        }
      }
    }
  }
}

// <ul><li><a> was clicked
function menuClick(a, li, ul){

  // the clicked tab link is already active.
  if(isActiveTab(li)){
    return;
  }

  // active is the one <li> element with class ="active"
  var active = getActiveTab(ul);
  var activeTarget = $(active).children("a").attr("href");
  activeTarget = activeTarget.substring(1, activeTarget.length);

  var newTarget = $(a).attr("href");
  if(newTarget === undefined
          || newTarget.length === 0
          || !newTarget.startsWith("#")){
      return;
  }
  newTarget = newTarget.substring(1, newTarget.length);

  // mark current tab link inactive
  $(active).attr("class","");
  // hide current tab
  $("#tab-"+activeTarget).hide();

  // mark new tab link active
  $(li).attr("class", "active");
  // show new tab
  $("#tab-"+newTarget).show();
}

// display a dismissible alert on the go panel
// takes the error message to display as argument
function displayGoAlert(msg){
  var go_alert_out = "";
  go_alert_out += "<div class=\"alert alert-warning alert-dismissible\" role=\"alert\" style=\"margin-bottom:0px; margin-top:15px;\">";
  go_alert_out += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">";
  go_alert_out += "<span aria-hidden=\"true\">&times;</span>";
  go_alert_out += "</button>";
  go_alert_out += "<strong>Error!</strong> "+msg+".";
  go_alert_out += "</div>";
  $("#go-alert-wrapper").html(go_alert_out);
  $("#go-alert-wrapper").show();
}

function go(dteid) {
  if(dteid === "") {
    displayGoAlert("Invalid DTE Id");
    return;
  }

  // update URL in the browser to match current query
  // we use History to avoid reloading the page
  // and to avoid using HTML5.
  History.replaceState(null, null, "?dteid="+dteid);

  // display the loading cursor
  $("#go-loading").show();

  // do the REST request: GET /job/{jobid}
  // var get = $.get("/job/"+dteid+".json");
  var get = $.get("/urban-meme-api/sayHello");

    get.done(function (message) {

      // holds the HTML output for tablejobdetails
      var jobdetails_out = "";
      // holds the HTML output for tableblocklist
      var blocklist_out = "";

      // hide the loading cursor
      $("#go-loading").hide();

      // set the tbody of tablejobtails
      $("#tablejobdetails").find("tbody").html(jobdetails_out);
      // set the tbody of tableblocklist
      $("#tableblocklist").find("tbody").html(blocklist_out);

      // hide the go-alert-wrapper
      $("#go-alert-wrapper").hide();

      // show both tables
      $("#paneljobdetails").show();
      $("#panelblocklist").show();
      $("#other-params").click(function(){
        $("#table-other-params").toggle();
      });
    })
    .fail(function () {
      // hide the loading cursor
      $("#go-loading").hide();
      // display an error with the text from the response
      var errorMessage = jQuery.parseJSON(get.responseText);
      displayGoAlert(errorMessage.msg);
    });
}