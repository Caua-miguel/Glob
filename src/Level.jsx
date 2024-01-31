import React, { useMemo } from 'react';
import { Center, shaderMaterial, useGLTF, useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three'
import globVertexShader from './shaders/faseGlob/vertex.glsl';
import globFragmentShader from './shaders/faseGlob/fragment.glsl'


export function Level() {
    const { nodes } = useMemo(() => useGLTF('./model/portal.glb'), []);

    const bakedTexture = useTexture('./model/baked.jpg');
    bakedTexture.flipY = false;


    return (
        <Center>
            <RigidBody type="fixed" colliders="trimesh">
                <mesh 
                scale={5} 
                geometry={nodes.baked.geometry}
                >
                    <meshBasicMaterial map={bakedTexture} />    
                </mesh>
                <mesh 
                scale={6} 
                geometry={nodes.portalLight.geometry}
                position={[0,4,-9]}
                rotation={nodes.portalLight.rotation}
                > <shaderMaterial
                        vertexShader={ globVertexShader }
                        fragmentShader={ globFragmentShader }
                        uniforms={
                            {
                                uTime: { value: 0 },
                                uColorStart: { value: new THREE.Color('#ffffff')},
                                uColorEnd: { value: new THREE.Color('#000000')}
                            }}
                /></mesh>
                
            </RigidBody>
                
            
            <RigidBody type="fixed" colliders="trimesh">
                <mesh position={[0,0,20]} scale={5} geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} />    
                </mesh>
            </RigidBody>

        </Center>
    );
}
