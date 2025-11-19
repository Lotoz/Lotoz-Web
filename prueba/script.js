// Inicializar todo después de que cargue la página para asegurar que THREE y OrbitControls ya están disponibles
window.addEventListener('load', init);

function init() {
    // Escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020);

    // Cámara
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0); // asegurar que la cámara mire al origen

    // Render
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // Mejora: ajustar pixelRatio para pantallas HiDPI (evita canvas borroso o demasiado pequeño en algunos casos)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Luces
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7);
    scene.add(light);

    // Cubo
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x00a2ff })
    );
    // Solución: elevar el cubo para que no quede medio dentro del suelo (se veía cortado o desaparecido)
    cube.position.y = 0.5;
    scene.add(cube);

    // Suelo
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Controles
    let controls;
    if (THREE.OrbitControls) {
        // Usar OrbitControls si está disponible
        controls = new THREE.OrbitControls(camera, renderer.domElement);
    } else {
        // Si no está cargado OrbitControls (evita errores en consola), crear fallback mínimo
        console.warn('THREE.OrbitControls no está disponible. Controles deshabilitados.');
        controls = { update: function () { } };
    }

    // Interacción (raycaster)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener("click", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 3 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 3 + 1;

        raycaster.setFromCamera(mouse, camera);

        // Mejor usar intersectObject con el objeto correcto; comprobar el array devuelto
        const intersects = raycaster.intersectObject(cube, false);
        if (intersects.length > 0) {
            // Cambiar color del material
            cube.material.color.set(Math.random() * 0xffffff);
        }
    });

    // Animación
    function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}