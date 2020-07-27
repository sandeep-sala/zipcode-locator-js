window.addEventListener('DOMContentLoaded', function() {
    fillOption(contry_code)
}, true);


function fillOption(obj) {
    html = ''
    Object.keys(obj).forEach((k, i) => {
        if (k == 'IN') {
            html += '<option selected value="' + k + '">' + obj[k] + '</option>'
        } else {
            html += '<option value="' + k + '">' + obj[k] + '</option>'
        }

    });
    document.getElementById('contry-code').innerHTML = html
}

function getLocation() {
    var k;
    var loader = document.querySelector('.loader')
    loader.style.display = "block";
    var iframe = document.getElementById('map_result');
    var cros = 'https://cors-anywhere.herokuapp.com/'
    var pincode = document.getElementById('pincode_val').value;
    var code = document.getElementById('contry-code').value;
    var city = document.getElementById('found_city')
    var url = 'https://api.worldpostallocations.com/?postalcode=' + pincode + '&countrycode=' + code;
    var re_div = document.getElementById('error_message');

    function showERR(l) {
        clearTimeout(k)
        re_div.innerHTML = l
        k = setTimeout(function() { re_div.innerHTML = "" }, 1500);
    }

    try {
        fetch(url).then(res => res.json())
            .then(response => {
                console.log(response)
                if (response.status == true && response.result.length != 0) {
                    loader.style.display = "none";
                    city.innerHTML = response.result[0].district
                    var lat = response.result[0].latitude
                    var log = response.result[0].longitude
                    iframe.src = 'https://maps.google.com/maps?q=' + lat + ', ' + log + '&z=15&output=embed'

                } else {
                    loader.style.display = "none";
                    console.log(response)
                    if (response.message) {
                        showERR(response.message);
                    } else {
                        showERR("Please Enter Valid Pin");
                    }

                }
            })
            .catch(error => {
                loader.style.display = "none";
                showERR(error);
            });

    } catch (error) {
        loader.style.display = "none";
        showERR(error);
    }
}