function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.229571, lng: 76.945753 },
        zoom: 15,
    });

    const marker = new google.maps.Marker({
        position: { lat: 43.229571, lng: 76.945753 },
        map: map,
    });

    let contentString = '<strong>' + "Almaty" + '</strong><p>' + "43.229571" + '° Latitude <br>' + "76.945753" + '° Longitude</p>';

    let infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
    });
};
