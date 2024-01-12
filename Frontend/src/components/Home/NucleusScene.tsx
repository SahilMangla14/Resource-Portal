import React, { useEffect } from 'react';
import * as THREE from 'three';

const NucleusScene = () => {
    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xF4EAE0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        document.getElementById('nucleus-container').appendChild(renderer.domElement);

        const nucleusGeometry = new THREE.SphereGeometry(2.5, 32, 32);
        const nucleusMaterial = new THREE.MeshStandardMaterial({
            map: createGradientTexture('#7E6363', '#A87C7C'),
            metalness: 0.1,
            roughness: 0.5,
        });
        const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
        scene.add(nucleus);

        const createNeutrons = (count, size) => {
            const neutrons = [];
        
            for (let i = 0; i < count; i++) {
              const neutronGeometry = new THREE.SphereGeometry(size, 16, 16);
              const neutronMaterial = new THREE.MeshStandardMaterial({
                map: createGradientTexture('#D24545', '#A94438'),
                metalness: 0.1,
                roughness: 0.5,
              });
              const neutron = new THREE.Mesh(neutronGeometry, neutronMaterial);
              scene.add(neutron);
              neutrons.push(neutron);
            }
        
            return neutrons;
          };

        const neutronsBandA = createNeutrons(9, 0.45);

        const neutrons = [];
        for (let i = 0; i < 9; i++) {
            const neutronGeometry = new THREE.SphereGeometry(0.5, 16, 16);
            const neutronMaterial = new THREE.MeshStandardMaterial({
                map: createGradientTexture('#6DB9EF', '#3081D0'),
                metalness: 0.1,
                roughness: 0.5,
            });
            const neutron = new THREE.Mesh(neutronGeometry, neutronMaterial);
            neutrons.push(neutron);
            scene.add(neutron);
        }

        const verticalNeutrons = [];
        for (let i = 0; i < 9; i++) {
            const neutronGeometry = new THREE.SphereGeometry(0.4, 16, 16);
            const neutronMaterial = new THREE.MeshStandardMaterial({
                map: createGradientTexture('#79AC78', '#618264'),
                metalness: 0.1,
                roughness: 0.5,
            });
            const neutron = new THREE.Mesh(neutronGeometry, neutronMaterial);
            verticalNeutrons.push(neutron);
            scene.add(neutron);
        }

        const animate = (time) => {
            requestAnimationFrame(animate);

            nucleus.rotation.x += 0.01;
            nucleus.rotation.y += 0.01;

            neutrons.forEach((neutron, index) => {
                const angle = (time * 0.001) + (index / 9) * Math.PI * 2;
                const radius = 7;
                neutron.position.x = Math.cos(angle) * radius;
                neutron.position.z = Math.sin(angle) * radius;
                neutron.position.y =  - Math.cos(angle) * radius / 9;
                neutron.rotation.y += 0.03;
                neutron.rotation.x += 0.03;
            });

            verticalNeutrons.forEach((neutron, index) => {
                const angle = (time * 0.001) + (index / 9) * Math.PI * 2;
                const radius = 4;
                neutron.position.z = Math.cos(angle) * radius;
                neutron.position.y = Math.sin(angle) * radius;
                neutron.position.x = Math.sin(angle) * radius / 1.5;
                neutron.rotation.x += 0.04;
                neutron.rotation.y += 0.04;
            });
        
            neutronsBandA.forEach((neutron, index) => {
                const angle = (time * 0.001) + (index / 9) * Math.PI * 2;
                const radius = 5.1;
                neutron.position.z = Math.cos(angle) * radius;
                neutron.position.y = Math.sin(angle) * radius;
                neutron.position.x = - Math.sin(angle) * radius / 2;
                neutron.rotation.x += 0.05;
                neutron.rotation.y += 0.05;
            });

            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        });

        return () => {
            window.removeEventListener('resize', () => { });
            const nucleusContainer = document.getElementById('nucleus-container');
            if (nucleusContainer && nucleusContainer.contains(renderer.domElement)) {
                nucleusContainer.removeChild(renderer.domElement);
            }
        };
        
    }, []);

    const createGradientTexture = (color1, color2) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 0, 100);

        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        return new THREE.CanvasTexture(canvas);
    };


    
    return <div id="nucleus-container" className="overflow-hidden" />;
};

export default NucleusScene;
