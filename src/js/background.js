import * as THREE from 'three.js';

import {store} from './state';

function getElementDimensions(element) {
    return [element.offsetWidth, element.offsetHeight];
}

function createBackground(element, cubeSize=50) {
    let [width, height] = getElementDimensions(element);
    let scopeFactor = 1000;
    let scene = new THREE.Scene();
    let renderer = new THREE.WebGLRenderer({alpha: true});
    let camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, -2000, 2000);
    let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    (function init() {
        let state = store.getState().background;

        // Add renderer to element
        renderer.setSize(width, height);
        element.appendChild(renderer.domElement);

        // Add resize listener
        window.addEventListener('resize', resize);

        // Put the camera in the right place
        camera.position.set(scopeFactor/2, scopeFactor/2, scopeFactor/2);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Add cubes
        for (let xPos = -scopeFactor; xPos < scopeFactor; xPos += cubeSize) {
            for (let zPos = -scopeFactor; zPos < scopeFactor; zPos += cubeSize) {
                let cube = new THREE.Mesh(cubeGeometry);
                let edges = new THREE.EdgesHelper(cube, 0x000000);

                // Widen the edge a bit and tweak its color
                edges.material.linewidth = 2;
                edges.material.color = cube.material.color.clone().add(new THREE.Color(-0.1, -0.1, -0.1));

                // Set the position
                cube.position.set(xPos, 0, zPos);

                // Scale it randomly
                cube.scale.setY(Math.max(state.minScale, Math.random(state.maxScale) * state.maxScale));

                // Add scale direction for the animation
                cube.scaleDirection = Math.random() > 0.5 ? 1 : -1;
                cube.scaleSpeed = Math.random() * 0.9 + 0.1;

                // Add it to the scene
                scene.add(cube);
                scene.add(edges);
            }
        }

        render();
    }());

    function resize() {
        let [width, height] = getElementDimensions(element);

        // Renderer
        renderer.setSize(width, height);

        // Camera
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    function render(tFrame) {
        let state = store.getState().background;

        // Get next frame as early as possible
        window.requestAnimationFrame(render);

        // Re-scale the cubes
        scene.children.forEach(function scaleCube(cube) {
            // If they're at the extremity, reverse
            // Don't just *= -1 since they may be way outside the bounds
            if (cube.scale.y < state.minScale) {
                cube.scaleDirection = 1;
            } else if(cube.scale.y > state.maxScale) {
                cube.scaleDirection = -1;
            }

            let speed = (store.getState().background.speed / 10) * cube.scaleSpeed;
            let delta = cube.scaleDirection * speed;

            cube.scale.setY(cube.scale.y + delta);
        });

        // Render all the objects
        renderer.render(scene, camera);
    };
}

export {createBackground};