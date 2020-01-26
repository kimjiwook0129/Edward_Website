var _fulltimeObject, _parttimeLongObject, _parttimeShortObject;

fetch("json/work.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    _fulltimeObject = data.works.fulltime;
    _parttimeLongObject = data.works.parttime.longterm;
    _parttimeShortObject = data.works.parttime.shortterm;
    console.log(_fulltimeObject, _parttimeLongObject, _parttimeShortObject);
  })
  .catch(function(error) {
    console.log(error);
  });
