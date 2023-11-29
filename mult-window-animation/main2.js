import * as THREE from './three.module.min.js'
//场景
const scene = new THREE.Scene();

//相机
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(0, 0, 10);  
camera.lookAt(scene.position);

//渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//生成20个随机粒子
const particles = [];
for (let i = 0; i < 20; i++) {
  particles.push(new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)); 
}

//渲染循环
function render() {

  //更新粒子位置
  particles.forEach(p => {

    //随机跳跃
    if (Math.random() < 0.02) {
      p.x = Math.random() * 10 - 5;
      p.y = Math.random() * 10 - 5; 
      p.z = Math.random() * 10 - 5;
    }

    //绘制粒子点
  });

  //添加光线动画等其他视觉效果

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

render();