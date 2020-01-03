/*
 * Green Flag : Lived
 * Blue Flag : Traveled
 * Yello Flag : Visited
 * Red(Default) Flag : Current Location
 */

const icons = [
  "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
];

var _types = ["placesLived", "placesTraveled", "placesVisited"];

var locationData;

function cityCountryCountPerContinent(continentArr, countryArr) {
  var finalJson = { city: [], country: [] };
  var _countryArr = countryArr;
  continentArr.forEach(function(c) {
    finalJson.city.push({ continent: c, count: 0 });
    finalJson.country.push({ continent: c, count: 0 });
  });

  ["city", "country"].forEach(function(a) {
    finalJson[a].forEach(function(s) {
      _types.forEach(function(t) {
        locationData[t].forEach(function(l) {
          if (s.continent == l.continent) {
            if (a == "city") {
              ++s.count;
            } else {
              if (_countryArr.includes(l.country)) {
                _countryArr = _countryArr.filter(function(val, index, arr) {
                  return val != l.country;
                });
                ++s.count;
              }
            }
          }
        });
      });
    });
  });
  return finalJson;
}

function pieChart_CityCountryCountPerContinent(_len, country_len, pieData) {
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;
  const color = d3.scaleOrdinal([
    "#00ffae",
    "#ff5e1e",
    "#0c55ff",
    "#ff0ca2",
    "#9dff00",
    "#ffd000"
  ]);

  const svg = d3
    .select("#countPerContinentPieChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  var pie = d3
    .pie()
    .value(d => d.count)
    .sort(null);

  var arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius);

  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(1);
    return t => arc(i(t));
  }

  d3.selectAll("input").on("change", update_wrapper);

  function update_wrapper(val = this.value) {
    svg.selectAll("g").remove();
    update(val);
  }

  function update(val = this.value) {
    var g = svg
      .selectAll("g")
      .data(pie(pieData[val]))
      .enter()
      .append("g");

    g.append("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .attr("stroke", "white")
      .attr("stroke-width", "6px")
      .each(function(d) {
        this._current = d;
      })
      .transition()
      .duration(200)
      .attrTween("d", arcTween);

    g.append("text")
      .attr("transform", function(d) {
        var _d = arc.centroid(d);
        _d[0] *= 1.2; //multiply by a constant factor
        _d[1] *= 1.2; //multiply by a constant factor
        return "translate(" + _d + ")";
      })
      .attr("dy", ".50em")
      .style("text-anchor", "middle")
      .text(function(d) {
        var percent =
          val == "city"
            ? (100 * d.data.count) / _len
            : (100 * d.data.count) / country_len;
        var n = percent.toFixed(2);
        const continent_map = {
          AS: "Asia",
          EU: "Europe",
          AF: "Africa",
          NA: "North America",
          SA: "South America",
          A: "Antartica",
          O: "Oceania"
        };
        return n > 10 ? d.data.continent + " " + n + "%" : "";
      })
      .attr("class", "textBold");
  }
  update("city");
}

function cityCountPerCountry(countryArr) {
  var cityCountArr = [];
  countryArr.forEach(function(e) {
    cityCountArr.push({ country: e, count: 0 });
  });
  cityCountArr.forEach(function(s) {
    _types.forEach(function(t) {
      locationData[t].forEach(function(l) {
        if (s.country == l.country) {
          ++s.count;
        }
      });
    });
  });

  function byCount(a, b) {
    if (a.count > b.count) return -1;
    if (b.count > a.count) return 1;
    return 0;
  }

  cityCountArr.sort(byCount);

  return cityCountArr;
}

function dropdown_CityCountPerCountry(_len, dropdown_Data) {
  var _index = 0;
  dropdown_Data.forEach(function(elem) {
    $_parent = $("<tr></tr>");
    $_parent.append(
      $("<td></td>")
        .text(++_index)
        .addClass("centerText_15")
    );
    $_parent.append(
      $("<td></td>")
        .text(elem.country)
        .addClass("centerText_30")
    );

    $_child = $("<td></td>")
      .text(elem.count)
      .addClass("centerText_25");
    $_parent.append($_child);

    $_parent.append(
      $("<td></td>")
        .text(((100 * elem.count) / _len).toFixed(2) + "%")
        .addClass("centerText_30")
    );

    $("#cityPerCountryDropdown > .cityTable").append($_parent);
  });
}

function initMap() {
  fetch("json/locations.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      locationData = data;
      var options = {
        zoom: 3, // Bigger -> Zoomed In
        center: {
          lat: data.current.coords.lat,
          lng: data.current.coords.lng
        } // Current Location
      };
      var map = new google.maps.Map(document.getElementById("map"), options);

      var markers = [],
        continent_arr = [],
        country_arr = [];

      markers.push(data.current);

      _types.forEach(function(type) {
        var dataTemp = data[type];
        dataTemp.forEach(function(l) {
          l.iconImage = icons[_types.indexOf(type)];
          markers.push(l);
          if (!continent_arr.includes(l.continent))
            continent_arr.push(l.continent);
          if (!country_arr.includes(l.country)) country_arr.push(l.country);
        });
      });

      markers.forEach(function(props) {
        var marker = new google.maps.Marker({
          position: props.coords,
          map: map
        });

        if (props.iconImage) marker.setIcon(props.iconImage);

        if (props.content) {
          var infoWindow = new google.maps.InfoWindow({
            content: props.content
          });

          marker.addListener("click", function() {
            infoWindow.open(map, marker);
            setTimeout(function() {
              infoWindow.close();
            }, 1000);
          });
        }
      });

      $("#continent-count")
        .find(".num")
        .text(continent_arr.length);
      $("#country-count")
        .find(".num")
        .text(country_arr.length);
      const city_num = 10 * Math.round(markers.length / 10 + 0.5);
      $("#city-count")
        .find(".num")
        .text(city_num + "+");

      var pieChartData = cityCountryCountPerContinent(
        continent_arr,
        country_arr
      );
      pieChart_CityCountryCountPerContinent(
        markers.length - 1,
        country_arr.length,
        pieChartData
      );
      var dropdownData = cityCountPerCountry(country_arr);
      dropdown_CityCountPerCountry(markers.length - 1, dropdownData);
    })
    .catch(function(error) {
      console.log(error);
    });
}
