import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {

     map: any;
     @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

     infoWindows: any = [];
     markers: any = [
       {
          // title: "Vicenza Baixa",
          // latitude: "-25.96882",
           //longitude: "32.57126"
           //usar logo as primeiras cordenadas
           title: "Vicenza Ronil",
           latitude: "-25.96074",
           longitude: "32.57750"
       },
       {
            title: "Vicenza alto mae",
            latitude: "-25.95645",
            longitude: "32.56647"
       },
       {
          title: "Vicenza Ronil",
          latitude: "-25.96074",
          longitude: "32.57750"
       }
       ];
      
     constructor() {}

     ionViewDidEnter() {
       this.showMap();
     }

     addMarkersToMap(markers){
       for(let marker of markers){
         let position = new google.maps.LatLng(marker.latitude, marker.longitude);
         let mapMarker = new google.maps.Marker({
           position: position,
           title: marker.title,
           latitude: marker.latitude,
           longitude: marker.longitude
        });

         mapMarker.setMap(this.map);
         this.addInfoWindowToMarker(mapMarker);
       }
     }

     addInfoWindowToMarker(marker){
       let infoWindowContent = '<div id="content">' + 
       '<h2 id="firstHeading" class"firstHeading">'+ marker.title + '</h2>' + 
       '<p>Latitude:  ' + marker.latitude + '</p>' +
       '<p>Longitude: ' + marker.longitude + '</p>' +
       '</div>';
       

       let infoWindow = new google.maps.infoWindow({
         content: infoWindowContent
       });

       marker.addListener('click', () => {
         this.closeAllInfoWindows();
         infoWindow.open(this.map, marker);
       });
       this.infoWindows.push(infoWindow);
      }

     closeAllInfoWindows(){
       for(let window of this.infoWindows) {
         window.close();
       }
     }

     showMap() {
       const location = new google.maps.LatLng(-25.96553, 32.58322);
       const options = {
         center: location,
         zoom: 12,
         disableDefaultUI: true
       }
       this.map = new google.maps.Map(this.mapRef.nativeElement, options);
       this.addMarkersToMap(this.markers);
     }
     
}
 