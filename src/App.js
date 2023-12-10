import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, useGLTF, useAnimations, Environment, Float, useTexture, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, TiltShift2 } from '@react-three/postprocessing'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 2], fov: 75, near: 0.1, far: 10 }}>
      <color attach="background" args={['#151520']} />
      <spotLight position={[-20, 10, -10]} color="orange" intensity={5} angle={0.1} penumbra={1} shadow-bias={-0.001} castShadow />
      <spotLight position={[-10, 10, 5]} color="skyblue" intensity={1} angle={0.1} penumbra={1} shadow-bias={-0.001} castShadow />
      <Float rotationIntensity={1} floatIntensity={2.5} speed={0.25}>
        <Model position={[0, -2.5, -1.25]} rotation={[0.4, 0, 0]} />
      </Float>
      <CameraControls />
      <EffectComposer disableNormalPass>
        <TiltShift2 blur={0.3} />
        <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0} intensity={1} />
      </EffectComposer>
      <Env />
    </Canvas>
  )
}

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 animated_floating_astronaut_in_space_suit_loop.glb --transform --simplify
Author: LasquetiSpice (https://sketchfab.com/LasquetiSpice)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/animated-floating-astronaut-in-space-suit-loop-e2c4b146e58141e4b87917456a9970b1
Title: Animated Floating Astronaut in Space Suit Loop
*/
function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/animated_floating_astronaut_in_space_suit_loop-transformed.glb')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    actions.Animation.play().timeScale = 0.5
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh castShadow receiveShadow name="Object_99" geometry={nodes.Object_99.geometry} material={materials.material_0} skeleton={nodes.Object_99.skeleton} scale={0.013} />
        <skinnedMesh castShadow receiveShadow name="Object_100" geometry={nodes.Object_100.geometry} material={materials.material_0} skeleton={nodes.Object_100.skeleton} scale={0.013} />
        <skinnedMesh castShadow receiveShadow name="Object_103" geometry={nodes.Object_103.geometry} material={materials.material_1} skeleton={nodes.Object_103.skeleton} scale={0.1} />
        <skinnedMesh castShadow receiveShadow name="Object_106" geometry={nodes.Object_106.geometry} material={materials.material_2} material-envMapIntensity={1} skeleton={nodes.Object_106.skeleton} scale={0.013} />
      </group>
    </group>
  )
}

function Env() {
  const texture = useTexture('space.jpg')
  texture.mapping = THREE.EquirectangularReflectionMapping
  return (
    <Environment resolution={1920} background>
      <ambientLight intensity={2} />
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[5]} />
        <meshStandardMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <Lightformer position={[-3, 1, -3]} form="circle" color="orange" intensity={5} scale={0.1} />
    </Environment>
  )
}
