var previousValueMap = {};

function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var editedRange = e.range;
  var cellAddress = editedRange.getA1Notation();

  if (editedRange.getColumn() == 2 && editedRange.getRow() > 1) {
    if (!previousValueMap[cellAddress]) {
      previousValueMap[cellAddress] = e.oldValue;
    }

    var selectedTopic = editedRange.getValue();
    var topicColumn = sheet.getRange("B2:B");
    var topics = topicColumn.getValues();


    SpreadsheetApp.getUi().alert(e.oldValue);
    if (e.oldValue !== "") {
      for (var i = 0; i < topics.length; i++) {
        if (topics[i][0] === selectedTopic && selectedTopic !== "") {
          var previousValue = previousValueMap[cellAddress] || "";
          editedRange.setValue(previousValue);
          SpreadsheetApp.getUi().alert("This topic has already been chosen by someone else.");
          return;
        }
      }
    }
  }
}
