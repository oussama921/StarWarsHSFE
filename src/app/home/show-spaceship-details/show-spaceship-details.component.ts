import { AfterViewInit, Component, Inject, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { HomeService } from 'src/app/services/home.service';
import { ShowPilotDetailsComponent } from '../show-pilot-details/show-pilot-details.component';

@Component({
	selector: 'show-spaceship-details',
	templateUrl: 'show-spaceship-details.component.html',
  styleUrls:['show-spaceship-details.component.scss']
})

export class ShowSpaceshipDetailsComponent implements AfterViewInit,OnInit {

  @ViewChild('scene') sceneTag?:HTMLElement;

  date:Date=new Date();
  hasObj:boolean = false;
  pilots:any=[];
  starshipsExistingObjectNamesTable : string[] = this.homeService.starshipsExistingObjectNamesTable;

  constructor(
    private dialogRef: MatDialogRef<ShowSpaceshipDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public spaceshipInfos: any,
    private dialog : MatDialog,
    private homeService : HomeService
  ){}

  ngOnInit(){
    this.spaceshipInfos.pilots.forEach((pilotUrl:string) => {
      this.pilots.push(this.homeService.data.people.find((person:any) => person.url == pilotUrl));
    });
    // console.log(this.spaceshipInfos);
    // console.log(this.homeService.data.people.find((person:any)=> person.url == this.spaceshipInfos.pilots[0]))
    this.starshipsExistingObjectNamesTable.includes(this.spaceshipInfos.name)?this.hasObj=true:this.hasObj=false;
  }
	ngAfterViewInit() {
    console.log(this.starshipsExistingObjectNamesTable.includes(this.spaceshipInfos.name));
    if(this.hasObj){

      const scene = new THREE.Scene()


      let light = new THREE.PointLight()
      light.position.set(0, 600, 500)
      scene.add(light)

      let light2 = new THREE.PointLight()
      light2.position.set(0, -600, -500)
      scene.add(light2)

      const camera = new THREE.PerspectiveCamera()
      camera.position.z = 100

      const renderer = new THREE.WebGLRenderer()
      renderer.setClearColor( 0xF6F6F6,1 );

      renderer.domElement.style.width="100%";
      renderer.domElement.style.height="100%";

      document.getElementById("scene")?.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true

      // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

      const objLoader = new OBJLoader()
      objLoader.load(
          'assets/OBJModels/'+this.spaceshipInfos.name+'.obj',
          (object) => {
              scene.add(object)
          },
          (xhr) => {
              // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
          },
          (error) => {
              // console.log(error)
          }
      )

      window.addEventListener('resize', onWindowResize, false)
      onWindowResize();
      const stats = Stats()
      function onWindowResize() {

        let height = numTypeTransformHeight(document.getElementById("scene"));
        let width = numTypeTransformWidth(document.getElementById("scene"));

        camera.aspect = width/height;
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
        render()
      }
      function animate() {
          requestAnimationFrame(animate)

          controls.update()

          render()

          stats.update()
      }
      function render() {
          renderer.render(scene, camera)
      }
      animate()
      this.hasObj= true;
    }






  }

  showPilotDetails(pilot:string){
    const dialogRef = this.dialog.open(ShowPilotDetailsComponent,
      {
        width: '80%',
        maxHeight: '90vh',
        position: {
          top: '5%',
          left: '10%'
        },
        data:pilot
      },

    );
  }


}
function numTypeTransformHeight(obj: HTMLElement | null) :number{
  return obj?obj.clientHeight:0;
}

function numTypeTransformWidth(obj: HTMLElement | null) :number{
  return obj?obj.clientWidth:0;
}
