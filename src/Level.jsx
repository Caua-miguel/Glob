import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'

const cube = new THREE.BoxGeometry()

const floorSpawn = new THREE.MeshStandardMaterial( { color:"limegreen"} )
const floor = new THREE.MeshStandardMaterial( { color:"greenyellow"} )
const obstacleMaterial = new THREE.MeshStandardMaterial( { color:"orangered"} )
const wall = new THREE.MeshStandardMaterial( { color:"slategrey"} )
const blockWall = new THREE.MeshStandardMaterial( { color:"gray"} )

export function Spawn( { position = [ 0, 0, 0 ]} )
{
    return <group position={ position }>
                <mesh geometry={ cube } material={ floorSpawn } position={ [0, - 0.1, 0] } scale={ [8, 0.2, 8] } receiveShadow  />
            </group>

} 

export function SpikeTrap( { position = [ 0, 0, 0 ]} )
{

    const obstacle = useRef();
    const speed = (Math.random() + 0.2 ) * (Math.random() < 0.5 ? -1 : 1 )

    useFrame( (state) => 
    {

        const time = state.clock.getElapsedTime()

        const rotation = new THREE.Quaternion()
        rotation.setFromEuler( new THREE.Euler(0, time * speed, 0))


        obstacle.current.setNextKinematicRotation(rotation)

    }) 
    return <group position={ position }>
                <mesh geometry={ cube } material={ floor } position={ [ 0, - 0.1, 0 ] } scale={ [8, 0.2, 8] } receiveShadow />

            <RigidBody ref={ obstacle } type='kinematicPosition'position={ [0, 0.3, 0] }>
                <mesh geometry={ cube } material={ obstacleMaterial }  scale={ [ 7, 0.3, 0.3 ] } receiveShadow />
            </RigidBody>

            </group>

}

export function TranslationSpike( { position = [ 0, 0, 0 ]} )
{

    const obstacle = useRef();
    const timeTranslation = Math.random() * Math.PI * 2

    useFrame( (state) => 
    {

        const time = state.clock.getElapsedTime()

        const translation = Math.sin( time + timeTranslation) + 1.15


        obstacle.current.setNextKinematicTranslation( { x: position[0], y: position[1] + translation, z: position[2]} )

    }) 
    return <group position={ position }>
                <mesh geometry={ cube } material={ floorSpawn } position={ [ 0, - 0.1, 0 ] } scale={ [8, 0.2, 8] } receiveShadow />

            <RigidBody ref={ obstacle } type='kinematicPosition'position={ [0, 0.3, 0] }>
                <mesh geometry={ cube } material={ obstacleMaterial }  scale={ [ 7, 0.3, 0.3 ] } receiveShadow />
            </RigidBody>

            </group>
}

export function Parkour( { position = [ 0, 0, 0 ]} )
{

    const randomBlockPosition = () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -0.8 : 0.4);
    
    const block1 = useRef()
    const block2 = useRef()

    useEffect( () => 
    {

        block1.current.position.x = 2
        block1.current.position.y = randomBlockPosition()
        block1.current.position.z = -0.4

        block2.current.position.x = -2
        block2.current.position.y = randomBlockPosition()
        block2.current.position.z = -0.4

        if(block1.current.position.y < 0){
                block2.current.position.y = 0.2
            }else{
                block2.current.position.y = -0.2
            }
            
    },[])

    return <group position={ position }>
                <mesh geometry={ cube } material={ floor } position={ [ 0, - 0.1, 0 ] } scale={ [8, 0.2, 8] } receiveShadow />
            
            <RigidBody type='fixed' position={ [0, 1.5, 0] }>
                <mesh geometry={ cube } material={ wall }  scale={ [ 8, 3, 0.3 ] } receiveShadow />
                <mesh ref={block1} geometry={ cube } material={ blockWall }  scale={ [ 2, 0.4, 0.6 ] } receiveShadow />
                <mesh ref={block2} geometry={ cube } material={ blockWall }  scale={ [ 2, 0.4, 0.6 ] } receiveShadow />
                
            </RigidBody>      

            </group>
}

export function TranslationAxe( { position = [ 0, 0, 0 ]} )
{

    const obstacle = useRef();
    const timeTranslation = Math.random() * Math.PI * 2

    useFrame( (state) => 
    {

        const time = state.clock.getElapsedTime()

        const translation = (Math.sin( time + timeTranslation) + 1.15) * 2


        obstacle.current.setNextKinematicTranslation( { x: position[0] - 2.5 + translation, y: position[1] + 0.75, z: position[2]} )

    }) 
    return <group position={ position }>
                <mesh geometry={ cube } material={ floorSpawn } position={ [ 0, - 0.1, 0 ] } scale={ [8, 0.2, 8] } receiveShadow />

            <RigidBody ref={ obstacle } type='kinematicPosition'position={ [0, 0.3, 0] }>
                <mesh geometry={ cube } material={ obstacleMaterial }  scale={ [ 3, 1.5, 0.3 ] } receiveShadow />
            </RigidBody>

            </group>

}

export function End( { position = [ 0, 0, 0 ]} )
{
    return <group position={ position }>
                <mesh geometry={ cube } material={ floor } position={ [0, - 0.1, 0] } scale={ [8, 0.2, 8] } receiveShadow  />
            </group>

} 


export  function Level()
{
    return <>
        
        <Spawn position={ [ 0, 0, 0 ]} />
        <SpikeTrap position={ [ 0, 0, 8] } />
        <TranslationSpike position={ [ 0, 0, 16] } />
        <Parkour position={ [ 0, 0, 24] } />
        <TranslationAxe position={ [ 0, 0, 32] } />
        <End position={ [ 0, 0, 40 ]} />

        
    </>
   
}